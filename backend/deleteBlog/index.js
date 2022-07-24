const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const blogId = event.pathParameters.blogId;
    console.log(blogId);

    const blogParams = {
        TableName: "blog",
        Key: {
            blog_id: blogId
        }
    };

    try {
        await dynamoClient.delete(blogParams).promise();
        const response = {
            statusCode: 200,
        };
        response.body = JSON.stringify({ message: 'Blog deleted successfully' });
        return response;
    } catch (err) {
        console.log(err)
    }
};
