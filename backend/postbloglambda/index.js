var blog_id = require("uuid");
const AWS = require("aws-sdk");
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  AWS.config.update({
    region: "us-east-1",
  });

  var putRequest = {
    TableName: "blog",
    Item: {
      blog_id: blog_id.v1(),
      title: event.title,
      content: event.content,
      author_id: event.author_id,
      creation_date: new Date(Date.now()).toString(),
    },
  };

  await dynamodbClient
    .put(putRequest)
    .promise()
    .then((data) => {
      console.info("successfully update to dynamodb", data);
    })
    .catch((err) => {
      console.info("failed adding data dynamodb", err);
    });
};
