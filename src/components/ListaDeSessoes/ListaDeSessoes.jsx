import { useEffect, useState } from "react";
import { getAllSessions } from "../../services/session.service";
import { getAllGrupos, getAllSubGrupos } from "../../services/grupos.service";

const ListaDeSessoes = () => {
    const [sessions, setSessions] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [subGrupo, setSubGrupo] = useState([]);
    const [grupoSelecionado, setGrupoSelecionado] = useState(""); // Novo estado para grupo selecionado
    const [subGrupoSelecionado, setSubGrupoSelecionado] = useState(""); // Novo estado para subgrupo selecionado

    const findAllSessions = async () => {
        try {
            const response = await getAllSessions();
            setSessions(response.data);
        } catch (error) {
            console.error("Erro ao buscar as sessões:", error);
        }
    };

    // Função para buscar todos os Grupos e SubGrupos
    const findAllGrupos = async () => {
        try {
            const responseG = await getAllGrupos();
            const responseSub = await getAllSubGrupos();
            setGrupo(responseG.data);
            setSubGrupo(responseSub.data);
        } catch (error) {
            console.error("Erro ao carregar grupos e subgrupos:", error);
        }
    };

    // Filtrar os subgrupos com base no grupo selecionado
    const subGruposFiltrados = subGrupo.filter(sg =>
        sg.grupoId === grupoSelecionado || (sg.grupo && sg.grupo._id === grupoSelecionado)
    );

    useEffect(() => {
        findAllSessions()
        findAllGrupos();
    }, []);

    return (
        <>
            <div className="container mt-4">

                <label className="form-label"> <strong>Grupo:</strong></label>
                <select className="form-select" value={grupoSelecionado}
                    onChange={(e) => setGrupoSelecionado(e.target.value)}>
                    <option value="">Todos os Grupos</option>
                    {grupo.map((g) => (
                        <option key={g._id} value={g._id}>{g.nome}</option>
                    ))}
                </select>

                <label className="form-label"><strong>SubGrupo:</strong></label>
                <select
                    className="form-select"
                    value={subGrupoSelecionado}
                    onChange={(e) => setSubGrupoSelecionado(e.target.value)}
                    disabled={!grupoSelecionado} // Desabilita se nenhum grupo estiver selecionado
                >
                    <option value="">Todos os SubGrupos</option>
                    {subGruposFiltrados.map((sg) => (
                        <option key={sg._id} value={sg._id}>{sg.nome}</option>
                    ))}
                </select>
            </div>

            <h2>Sessões realizadas</h2>
            {sessions.map((session) => (
                <div>
                    <h3 key={session._id}>{session._id} Técnico: {session.tecnico.name}</h3>

                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Grupo</th>
                                <th>Casos de Uso!</th>
                                <th>Resultado</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>

                            {session.testes.map((teste) => (
                                <tr key={teste._id}>
                                    <td>{teste.grupo}</td>
                                    <td>{teste.description}</td>
                                    <td>{teste.resultado}</td>
                                    <td>{teste.observacao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div>

            ))}
        </>
    )
};

export default ListaDeSessoes;
