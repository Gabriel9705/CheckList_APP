import axios from "axios";
import { baseURL } from "./baseURL.js";

export const loginUser = (data) => {
    const response = axios.post(`${baseURL}/auth/login`, data);
    return response;
};
