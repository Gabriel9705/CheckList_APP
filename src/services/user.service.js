import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL.js";

export const registerUser = (data) => {
    delete data.confirmPassword;
    const response = axios.post(`${baseURL}/user/created`, data);

    return response;
};

export const loggedUser = () => {
    const response = axios.get(`${baseURL}/user/findById`, {
        headers:
            { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    return response;
};

export const findUserById = (id) => {
    const response = axios.get(`${baseURL}/user/findById/${id}`, {
        headers:
            { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    return response;
};

export function updateUser(body, id) {
    const response = axios.patch(`${baseURL}/user/update/${id}`, body,
        {
            headers:
                { Authorization: `Bearer ${Cookies.get("token")}` }
        }
    );

    return response;
};
