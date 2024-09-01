import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-ecommerce-mesv.onrender.com"
})