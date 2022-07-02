var blog_id = require("uuid");
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  AWS.config.update({
    region: "us-east-1",
  });

  const requestBody = JSON.parse(event.body);

  var putRequest = {
    TableName: "blog",
    Item: {
      blog_id: blog_id.v1(),
      title: requestBody.title,
      content: requestBody.content,
      author_id: requestBody.author_id,
      creation_date: new Date(Date.now()).toString(),
      likes_count: 0
    },
  };

  let response = await dynamodbClient
    .put(putRequest)
    .promise()
    .then((data) => {
      console.info("successfully update to dynamodb", data);
      const response = {
        statusCode: 200,
        body: JSON.stringify('Post Successfull'),
      };
      return response;
    })
    .catch((err) => {
      console.info("failed adding data dynamodb", err);
    });

  return response;
};
