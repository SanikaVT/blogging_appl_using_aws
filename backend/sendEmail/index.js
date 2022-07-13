const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
var sns = new AWS.SNS();
//Code Reference: https://gist.github.com/agabardo/678c43d73af7b374851d25d493431f03
exports.handler = (event, context) => {
  const params = {
    Message: event.Message,
    Subject: event.Subject,
    TopicArn: event.TopicArn,
  };
  sns.publish(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
    }
    console.log(data);
  });
};
