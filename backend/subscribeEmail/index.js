const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});
var sns = new AWS.SNS();
//Code Reference: https://gist.github.com/agabardo/678c43d73af7b374851d25d493431f03
let data = null;
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const topic_params = {
    Name: body.userID,
  };
  // returns topic ARn
  data = await sns.createTopic(topic_params).promise();
  const params = {
    Protocol: 'Email' /* required */, //http , https ,application
    TopicArn: data.TopicArn /* required */, // topic you want to subscribe
    Endpoint: body.Endpoint, // the endpoint that you want to receive notifications.
  };
  await sns.subscribe(params).promise();
  return {
    statusCode: 200,

    body: JSON.stringify({
      data: data,

      message: 'Success',
    }),

    headers: {
      'Content-Type': 'application/json',
    },
  };
};
