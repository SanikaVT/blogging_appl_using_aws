import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from ".";

export const RequireAuth = ({ children }) => {
    const [valid, setValid] = useState(false);
    const [session, setSession] = useState(null);

    const { getSession } = useContext(AuthContext);

    useEffect(() => {
        getSession().then(session => {
            console.log('Session from RequireAuth is ', session);
            setSession(session);
            setValid(true);
        }).catch(err => {
            console.log(err)
            setValid(true);
        })
    }, []);

    return (
        <>
            {valid ? session ? children : <Navigate to="/" replace={true} /> : <> </>}
        </>
    )
};