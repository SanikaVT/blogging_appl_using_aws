export const setUserId = (user) => {
    localStorage.setItem('user_id', user);
}

export const getUserId = () => {
    return localStorage.getItem('user_id');
}

export const setJwtToken = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
}

export const getJwtToken = () => {
    return localStorage.getItem('jwtToken');
}

export const setFullName = (fullName) => {
    return localStorage.setItem('fullName', fullName);
}

export const getFullName = () => {
    return localStorage.getItem('fullName');
}