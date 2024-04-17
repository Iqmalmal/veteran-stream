import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "http://localhost:8081/";
const TIME_OUT = 30000


const axiosInstance = axios.create({

    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export default axiosInstance