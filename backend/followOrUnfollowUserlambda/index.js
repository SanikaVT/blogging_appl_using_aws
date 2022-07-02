import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "us-east-1";
const ddbClient = new DynamoDBClient({ region: REGION });
const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false,
};

const unmarshallOptions = {
    wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

const getUserById = async (userId) => {
    const getParams = {
        TableName: "users",
        Key: {
            "user_id": userId
        }
    };
    return ddbDocClient.send(new GetCommand(getParams));
}

const alreadyAFollower = (currentUserId, followingUser) => {
    if (!followingUser?.followers) {
        return false;
    }
    return (!!followingUser?.followers.find(follower => follower.user_id === currentUserId));
}

const follow = async (currentUser, referencedUser) => {
    if (!currentUser.following) {
        currentUser.following = [{
            "user_id": referencedUser.user_id
        }];
    } else {
        currentUser.following.push({
            "user_id": referencedUser.user_id
        });
    }
    if (!referencedUser.followers) {
        referencedUser.followers = [{
            "user_id": currentUser.user_id
        }];
    } else {
        referencedUser.followers.push({
            "user_id": currentUser.user_id
        });
    }
    currentUser.following_count++;
    referencedUser.followers_count++;
    const currentUserParams = {
        TableName: 'users',
        Item: currentUser
    }
    const updatedCurrentUser = await ddbDocClient.send(new PutCommand(currentUserParams));
    const updatedRefUser = await ddbDocClient.send(new PutCommand({
        TableName: 'users',
        Item: referencedUser
    }));
}

const unfollow = async (currentUser, referenceUser) => {
    currentUser.following_count = (currentUser.following_count > 0) ? currentUser.following_count - 1 : 0;
    referenceUser.followers_count = (referenceUser.followers_count > 0) ? referenceUser.followers_count - 1 : 0;
    if (currentUser.following && currentUser.following.length > 0) {
        const index = currentUser.following.findIndex((user) => user.user_id === referenceUser.user_id);
        currentUser.following.splice(index, 1);
    }
    if (referenceUser.followers && referenceUser.followers.length > 0) {
        const index = referenceUser.followers.findIndex(user => user.user_id === currentUser.user_id);
        referenceUser.followers.splice(index, 1);
    }
    await ddbDocClient.send(new PutCommand({
        TableName: 'users',
        Item: currentUser
    }));
    await ddbDocClient.send(new PutCommand({
        TableName: 'users',
        Item: referenceUser
    }));
}

const handler = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const action = requestBody.action;
    if (!action || (action != "follow" && action != "unfollow")) {
        return {
            statusCode: 400,
            body: {
                message: "Only follow and unfollow actions are avaiable!"
            }
        }
    }
    const currentUserId = requestBody.currentUserId;
    if (!currentUserId) {
        return {
            statusCode: 401,
            body: {
                message: "Not authorized!"
            }
        };
    }

    const referenceUserId = requestBody.referenceUserId;
    if (!referenceUserId) {
        return {
            statusCode: 400,
            body: {
                message: "User your trying to follow doesn't exist!"
            }
        };
    }

    try {
        const getUserRes = await getUserById(currentUserId);
        if (!getUserRes.Item) {
            return {
                statusCode: 401,
                body: {
                    message: "Not authorized!"
                }
            };
        }
        let currentUser = getUserRes.Item;
        const referenceUserRes = await getUserById(referenceUserId);
        if (!referenceUserRes.Item) {
            return {
                statusCode: 400,
                body: {
                    message: "User your trying to follow doesn't exist!"
                }
            };
        }
        let referenceUser = referenceUserRes.Item;

        const isUserAlreadyFollowing = alreadyAFollower(currentUser.user_id, referenceUser);

        if (isUserAlreadyFollowing && action === "follow") {
            return {
                statusCode: 400,
                body: {
                    message: "You are already following this user!"
                }
            };
        }

        if (!isUserAlreadyFollowing && action === "unfollow") {
            return {
                statusCode: 400,
                body: {
                    message: "You are already not following this user!"
                }
            };
        }

        if (action === "follow") {
            await follow(currentUser, referenceUser);
        }
        else {
            await unfollow(currentUser, referenceUser);
        }

    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: {
                message: "Internal Server Error!"
            }
        }
    }


}

export { handler };