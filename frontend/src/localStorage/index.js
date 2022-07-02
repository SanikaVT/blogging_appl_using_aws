export const setUserId = (user) => {
    localStorage.setItem('user_id', user);
}

export const getUserId = () => {
    return localStorage.getItem('user_id');
}