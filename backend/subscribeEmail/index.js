const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
var sns = new AWS.SNS();
const docClient = new AWS.DynamoDB.DocumentClient();
//Code Reference: https://gist.github.com/agabardo/678c43d73af7b374851d25d493431f03

exports.handler = (event, context) => {
  topic_params = {
    Name: event.userID,
  };
  sns.createTopic(topic_params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data); // returns topic ARn
      params = {
        Protocol: "Email" /* required */, //http , https ,application
        TopicArn: data.TopicArn /* required */, // topic you want to subscribe
        Endpoint: event.Endpoint, // the endpoint that you want to receive notifications.
      };
      dynamoParams = {
        TableName: "user",
        Key: {
          user_id: event.userID,
        },
        UpdateExpression: "set #TopicArn = :x",
        ExpressionAttributeNames: {
          "#TopicArn": "TopicArn",
        },
        ExpressionAttributeValues: {
          ":x": data.TopicArn,
        },
      };
      sns.subscribe(params, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
      docClient.update(dynamoParams, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
      });
    }
  });
};
