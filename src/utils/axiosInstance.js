import axios from "axios"
import callAxios from "./callAxios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api"
})

instance.defaults.headers.common["Content-Type"] = "application/json";


instance.interceptors.response.use(async (response) => {
    console.log(response);
    return response;
    
}, async (error) => {
    const errorObject =  error.response;
    console.log(error.response)
    if (errorObject.status ==401){
        console.log("interceptor worked!");
        const response = await axios.post("http://localhost:8080/api/token/refresh", {
            "refresh_token": localStorage.getItem("musoAdminAuthRefreshToken"),
            
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        localStorage.setItem("musoAdminAuthToken", response.data["access_token"])
        localStorage.setItem("musoAdminAuthRefreshToken", response.data["refresh_token"])
        
        const finalResponse = await axios.request({
            ...errorObject.config,
            headers: {
                ...errorObject.config.headers,
                "Authorization": "bearer "+ response.data["access_token"]
            }
        });
        console.log(finalResponse)
        return finalResponse;
    }
});

export default instance