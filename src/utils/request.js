import axios from "axios";
import config from "../constants/config";

const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Accept':  'application/json',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',

}
if(token){
    headers['Authorization'] = `Bearer ${token}`;
}
const request =  axios.create({
    baseURL : config.BASE_URL,
    headers: headers
})

axios.interceptors.response.use(function (response) {
    // Xử lý data trả về
    return response;
  }, function (error) {
    //  handle lỗi
    if (error.response.status === 401) {
        console.log("Token expried")    
    }
    console.log(error.response.message);
    return Promise.reject(error);
});

export default request;
