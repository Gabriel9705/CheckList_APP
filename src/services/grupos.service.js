import axios from "axios";
import { baseURL } from "./baseURL.js";

export function getAllGrupos() {
    const response = axios.get(`${baseURL}/grupos`);
    return response;
};

export function getAllSubGrupos() {
    const response = axios.get(`${baseURL}/grupos/subGrupo`);
    return response;
};

export function getSubGrupoPorGrupo(grupoId) {
    const response = axios.get(`${baseURL}/grupos/subgrupos/por-grupo/${grupoId}`);
    return response;
};

export function postGrupo(body) {
    const response = axios.post(`${baseURL}/grupos/created/grupo`, body)
    return response;
};

export function postSubGrupo(body) {
    const response = axios.post(`${baseURL}/grupos/subGrupo/created`, body)
    return response;
};
