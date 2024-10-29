import axios from "axios"
import { baseURL } from "./baseURL"

export const iniciarSessao = (dadosSessao) => {
    const response = axios.post(`${baseURL}/session/start`, dadosSessao,
        {
            headers:
                { Authorization: `Bearer ${Cookies.get("token")}` }
        }
    );
    return response;
};

export const finalizarSessao = (sessionId) => {
    const response = axios.post(`${baseURL}/session/complete/${sessionId}`,
        {
            headers:
                { Authorization: `Bearer ${Cookies.get("token")}` }
        });
    return response;
};
