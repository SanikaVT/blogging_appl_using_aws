export const setUserId = (user) => {
    localStorage.setItem('user_id', user);
}

export const getUserId = () => {
    return localStorage.getItem('user_id');
}

export const setJwtToken = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
}

export const getJwtToken = (jwtToken) => {
    return localStorage.getItem('jwtToken');
}