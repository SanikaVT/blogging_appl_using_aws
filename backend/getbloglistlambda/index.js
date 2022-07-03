const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const blogParams = {
  TableName: "blog",
};

const userParams = {
  TableName: "user"
}

async function listItems() {
  try {
    const blog = await dynamoClient.scan(blogParams).promise();
    console.log('Blog: ', blog)
    
    for (const item of blog.Items) {
      const userId = item.author_id;
      console.log('Fetched Author Id is: ', userId)

      userParams.Key = {
        user_id: userId
      }
      
      const fetchedUser = await dynamoClient.get(userParams).promise()
      console.log('fetchedUser: ', fetchedUser)
      
      item.userInformation = fetchedUser.Item
    }
    return blog;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await listItems();
    return { body: data };
  } catch (err) {
    return { error: err };
  }
};