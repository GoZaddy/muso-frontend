export const baseURL = "http://localhost:8080/api"
export const token = localStorage.getItem("musoAdminAuthToken");

export const axiosTokenConfig = {
    headers: {
      'authorization': token,
    }
}