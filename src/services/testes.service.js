import axios from "axios";

//const baseURL = "http://localhost:3000";
const baseURL = "https://checklist-api-dbyw.onrender.com";

export function getAllListaTestes() {
    const response = axios.get(`${baseURL}/test`);
    return response;
};

export function postTeste(data) {
    const response = axios.post(`${baseURL}/test/created`, data)
    return response;
};

export function deleteTeste(id) {
    const response = axios.delete(`${baseURL}/test/deleted/${id}`);
    return response;
};

export function updateTeste(id, body) {
    const response = axios.patch(`${baseURL}/test/update/${id}`, body)
    return response;
};
