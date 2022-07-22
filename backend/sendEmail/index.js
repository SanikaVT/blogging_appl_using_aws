const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
var sns = new AWS.SNS();
//Code Reference: https://gist.github.com/agabardo/678c43d73af7b374851d25d493431f03
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const params = {
    Message: body.Message,
    Subject: body.Subject,
    TopicArn: body.TopicArn,
  };

  await sns.publish(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
