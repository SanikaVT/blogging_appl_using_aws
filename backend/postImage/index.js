const S3_BUCKET = 'my-blogging-images';
const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = async (event) => {

    console.log(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Image uploaded successfully' }),
        headers: { "content-type": "application/json" }
    }
    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const type = base64File.split(';')[0].split('/')[1];
        const decodeFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        const bucketParams = {
            Bucket: S3_BUCKET,
            Key: parsedBody.key + '.' + type,
            Body: decodeFile,
            ContentEncoding: 'base64',
            ContentType: 'image/*',
            ACL: 'public-read'
        };

        const uploadResult = await s3.upload(bucketParams).promise();
        response.body = JSON.stringify({ message: 'Image uploaded successfully', uploadResult: uploadResult })
        console.log(uploadResult);
    } catch (err) {
        console.log(err);
    }
    return response;
};