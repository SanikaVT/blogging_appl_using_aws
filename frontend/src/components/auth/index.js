//Code Reference: https://www.youtube.com/watch?v=R-3uXlTudSQ
import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './UserPool'
import { setUserId } from '../../localStorage';
import { getUserId } from '../../localStorage';

const AuthContext = createContext();

const Auth = props => {
    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            //Check if the user is valid
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.log('Error is: ', err)
                        reject(err);
                    } else {
                        console.log('Session from Auth Context: ', session)
                        setUserId(session.idToken.payload.sub)
                        console.log(getUserId())
                        resolve(session);
                    }
                })
            } else {
                reject('Session does not exist');
            }
        });
    };

    const authenticate = async (Username, Password) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });

            console.log("User", user)

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data)
                },
            });
        });
    };

    const logout = () => {
        const user = Pool.getCurrentUser();
        console.log('Logout in Auth called')
        if (user) {
            console.log('Logout in Auth called')
            user.signOut();
        }
    }

    return (
        <AuthContext.Provider value={{
            authenticate,
            getSession,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { Auth, AuthContext };