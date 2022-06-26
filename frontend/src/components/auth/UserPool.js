import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_uYjjKtUgM",
    ClientId: "7gstqtcfpdq4p7e25734lgbclt"
}

export default new CognitoUserPool(poolData);