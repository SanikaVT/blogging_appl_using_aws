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


const getBlog = async (blogId) => {
    const getParams = {
        TableName: "blog",
        Key: {
            "blog_id": blogId
        }
    }
    return ddbDocClient.send(new GetCommand(getParams));
};

const userAlreadyLiked = (blog, userId) => {
    if (!blog || !userId) {
        return false;
    }
    const likedUsers = blog.likes;
    if (!likedUsers) {
        return false;
    }
    return (!!likedUsers.find(likedUser => likedUser.user_id === userId));
}

const handler = async (event, context, callback) => {
    const requestBody = JSON.parse(event.body);
    const blogId = requestBody.blogId;
    if (!blogId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Require blogId"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    const userId = requestBody.userId;
    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Require userId"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    try {
        const getBlogResponse = await getBlog(blogId);
        if (!getBlogResponse.Item) {
            console.log(`Blog doesn't exists with blogId: ${blogId}`);
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Blog not found" }),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }
        let persistedBlog = getBlogResponse.Item;
        if (userAlreadyLiked(persistedBlog, userId)) {
            console.log(`User already liked the blog: ${blogId}`);
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Already liked" }),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }
        persistedBlog.likes_count++;
        if (!persistedBlog.likes) {
            persistedBlog.likes = [{
                user_id: userId
            }];
        }
        else {
            persistedBlog.likes.push({
                user_id: userId
            });
        }
        const putParams = {
            TableName: "blog",
            Item: persistedBlog
        }
        const updatedItem = await ddbDocClient.send(new PutCommand(putParams));
        const getParams = {
            TableName: "blog",
            Key: {
                "blog_id": persistedBlog.blog_id
            }
        }
        const updatedBlog = await ddbDocClient.send(new GetCommand(getParams));
        const response = {
            data: updatedBlog.Item
        }
        return {
            statusCode: 200,
            body: JSON.stringify(response),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error!" }),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
}

export { handler };