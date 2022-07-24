var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
    console.log('Request from event is: ', event.request);
    let date = new Date()

    if (event.request.userAttributes.sub) {
        let params = {
            Item: {
                'user_id': {
                    S: event.request.userAttributes.sub
                },
                'followers_count': {
                    N: '0'
                },
                'following_count': {
                    N: '0'
                },
                'user': {
                    M: {
                        'firstName': {
                            S: event.request.userAttributes.given_name
                        },
                        'lastName': {
                            S: event.request.userAttributes.family_name
                        },
                        'phoneNumber': {
                            S: event.request.userAttributes.phone_number
                        },
                        'email': {
                            S: event.request.userAttributes.email
                        }
                    }
                },
                'timestamps': {
                    M: {
                        'createdAt': {
                            S: date.toISOString()
                        },
                        'updatedAt': {
                            S: date.toISOString()
                        },
                    }
                }
            },
            TableName: 'user'
        }

        try {
            await ddb.putItem(params).promise()
            console.log("Success")
        } catch (err) {
            console.log("Error", err)
        }
        console.log("Success: Everything executed correctly")
        context.done(null, event)
    } else {
        console.log("Error: Nothing was written to DynamoDB")
        context.done(null, event)
    }
};