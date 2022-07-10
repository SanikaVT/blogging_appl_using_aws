import { S3Client } from "@aws-sdk/client-s3";

const CREDENTIAL = {
    accessKeyId: 'ASIASUE6J5JS5N5HVB64',
    secretAccessKey: 'IJorxuPOhBhhC1ARRZyoTkKPtAvtWCplcuRSfEBv',
    sessionToken: 'FwoGZXIvYXdzEPn//////////wEaDIZaJo/ToZM4pqWFgyLAAUfPgCAmZeNn3RgfY3IY0I1CQ7QTsYRJl4uu/bYymXxqbIpDMeFwiBMaB+wDNDzn9xKwaqO1srrhV70s+yy7O55s01hOkwrjfe341FOT+154S0N9woR0MPO1Yh1jdeXs/cv1usg5H1ST1vmOVrtcr1o2xY614ITzkGPGivvuoHylnQJp6A/crMGSxhDUGVoK4rQOQ77SQJRVTeEVoDbUC0uMuhnGQ43H/yE0nfHhTnua1Okf8srpdiALpsWmZy+QHiiSmqiWBjItr6fuwItQ/KR5NjLcpsBVbJibhfP2p4KP75mgAcA+mctSNGl3XLXqI+jc+nxF'
};

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: CREDENTIAL
});

export { s3Client };


// import { S3Client } from "@aws-sdk/client-s3";
// import {AWS} from "aws"

// const credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:74e995cd-a670-4e64-b08b-9e28402c20b6',
// });

// const s3Client = new S3Client({
//     region: 'us-east-1',
//     credentials
// });

// export { s3Client };
