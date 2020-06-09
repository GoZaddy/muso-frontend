import instance from "./axiosInstance";

const setAuthToken = (token) => {
    if (token){
        instance.defaults.headers.common["authorization"] = token
    } else{
        delete instance.defaults.headers.common["authorization"]
    }
}

export default setAuthToken