import request from "utils/request";

export const doLogin = ({ username, password }) => {
    return request(`/api/auth/login`,{
        method: "POST",
        params: {
            username,
            password,
        }
    })
};

export const getMyUser = () => {
    return request(`/api/auth/user-info`,{
        
    })
}