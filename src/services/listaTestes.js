import axios from "axios";

const baseURL = "http://localhost:3000";

export function getAllGrupos() {
    const response = axios.get(`${baseURL}/test/grupo`);
    return response;
};

export function getAllSubGrupos() {
    const response = axios.get(`${baseURL}/test/subGrupo`);
    return response;
};

export function getAllListaTestes() {
    const response = axios.get(`${baseURL}/test`);
    return response;
};

export function postGrupo(body) {
    const response = axios.post(`${baseURL}/test/created/grupo`, body)
    return response;
};

export function postSubGrupo(body) {
    const response = axios.post(`${baseURL}/test/created/subGrupo`, body)
    return response;
};

export function postTeste(body) {
    const response = axios.post(`${baseURL}/test/created`, body)
    return response;
};

export function deleteTeste(id) {
    const response = axios.delete(`${baseURL}/test/deleted/${id}`);
    return response;
};

export function updateTeste(body, id) {
    const response = axios.patch(`${baseURL}/test/updated/${id}`, body)
    return response;
};
