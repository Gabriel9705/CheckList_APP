import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./baseURL";

export const iniciarSessao = (dadosSessao) => {
    const response = axios.post(`${baseURL}/session/start`, dadosSessao,
        {
            headers:
                { Authorization: `Bearer ${Cookies.get("token")}` }
        }
    );
    return response;
};

export const finalizarSessao = (sessionId, testesAtualizados) => {
    const body = { testesAtualizados };
    const response = axios.patch(`${baseURL}/session/${sessionId}/finalize`, body,
        {
            headers:
                { Authorization: `Bearer ${Cookies.get("token")}` }
        });
    return response;
};

export const getAllSessions = () => {
    const response = axios.get(`${baseURL}/session`, {
        headers:
            { Authorization: `Bearer ${Cookies.get("token")}` }
    })
    return response;
};