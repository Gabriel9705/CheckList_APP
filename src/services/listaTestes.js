import axios from "axios";

const baseURL = "http://localhost:3000";

export function getAllGrupos(){
    const response = axios.get(`${baseURL}/test/grupo`);
    return response;
};

export function getAllSubGrupos(){
    const response = axios.get(`${baseURL}/test/subGrupo`);
    return response;
};

export function getAllListaTestes(){
    const response = axios.get(`${baseURL}/test`);
    return response;
};
