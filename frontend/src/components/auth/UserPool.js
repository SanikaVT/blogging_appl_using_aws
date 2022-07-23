import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_8BCNELz6Q",
    ClientId: "1p59t74tm074ae4qc749u9ef3q"
    // UserPoolId: "us-east-1_uYjjKtUgM",
    // ClientId: "7gstqtcfpdq4p7e25734lgbclt"
}

export default new CognitoUserPool(poolData);