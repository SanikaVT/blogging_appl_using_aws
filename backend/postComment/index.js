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

const getBlogById = async (blogId) => {
    const getBlogParams = {
        TableName: "blog",
        Key: {
            'blog_id': blogId,
        }
    };
    return ddbDocClient.send(new GetCommand(getBlogParams));
}

const handler = async (event, context, callback) => {
    const reqBody = JSON.parse(event.body);
    const { blogId } = event.pathParameters;
    try {
        const blogDetails = await getBlogById(blogId);
        if (!blogDetails || !blogDetails.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Blog not found!"
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        }
        const blog = blogDetails.Item;
        if (!blog.comments_count) {
            blog.comments_count = 1;
        }
        else {
            blog.comments_count++;
        }
        if (!blog.comments) {
            blog.comments = [];
        }
        blog.comments.push({
            user_id: reqBody.userId,
            comment: reqBody.comment,
            comment_time: new Date().toLocaleString()
        })
        const putParams = {
            TableName: 'blog',
            Item: blog
        }
        await ddbDocClient.send(new PutCommand(putParams));
        const updatedBlog = ddbDocClient.send(new GetCommand({
            TableName: 'blog',
            Key: {
                blog_id: blogId
            }
        }));
        const res = {
            data: updatedBlog.Item
        };
        return {
            statusCode: 200,
            body:JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
    catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error!"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
}

export { handler };