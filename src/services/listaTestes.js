import axios from "axios";

//const baseURL = "http://localhost:3000";
const baseURL = "https://checklist-api-dbyw.onrender.com";

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

export function postTeste(data) {
    const body = {
        ...data,
        resultado: "Não Testado"
    }
    const response = axios.post(`${baseURL}/test/created`, body)
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
