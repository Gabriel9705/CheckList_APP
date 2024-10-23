import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { deleteTeste, getAllGrupos, getAllListaTestes, getAllSubGrupos, updateTeste } from "../../services/listaTestes";
import { BarraDeProgresso } from "./ListaDeTestesStyled";

const ListaDeTestes = () => {
    const [testes, setTestes] = useState([]);
    const [nomeTecnico, setNomeTecnico] = useState('');
    const [atualizar, setAtualizar] = useState(false); // Controlador para atualizações manuais
    const [visible, setVisible] = useState(false);
    const closeAlert = () => { setVisible(false); };
    const [selectedCategory, setSelectedCategory] = useState('');
    const [grupo, setGrupo] = useState([]);
    const [subGrupo, setSubGrupo] = useState([]);

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

    //Função para filtrar os testes
    const filteredItems = selectedCategory
        ? testes.filter((item) => item.subGrupo === selectedCategory)
        : testes;

    // Função para buscar todos os testes
    const findAllTestes = async () => {
        try {
            const response = await getAllListaTestes();
            setTestes(response.data);
        } catch (error) {
            console.error("Erro ao buscar testes:", error);
        }
    };

    // Função para atualizar o valor de resultado de um teste
    const handleChange = async (id, e) => {
        try {
            //await updateTeste(id, e),
            setTestes((prevTestes) =>
                prevTestes.map((teste) =>
                    teste._id === id ? { ...teste, resultado: e.target.value } : teste
                ));
        } catch (error) {
            console.log(error);
        }
        ;
    };

    // Função para atualizar o valor de observação de um teste
    const handleObservationChange = (id, e) => {
        try {
            setTestes((prevTestes) =>
                prevTestes.map((teste) =>
                    teste._id === id ? { ...teste, observacao: e.target.value } : teste
                )
            );
        } catch (error) {
            console.log(error)
        }
    };

    // Cálculo de progresso dos testes
    const calcularProgresso = () => {
        const totalTestes = filteredItems.length;
        const totalPassou = filteredItems.filter(teste => teste.resultado === 'Passou').length;
        const totalNaoPassou = filteredItems.filter(teste => teste.resultado === 'Não Passou').length;

        const progressoTotal = totalTestes ? (totalPassou / totalTestes) * 100 : 0;
        const passouPercent = totalTestes ? (totalPassou / totalTestes) * 100 : 0;
        const naoPassouPercent = totalTestes ? (totalNaoPassou / totalTestes) * 100 : 0;

        return {
            progressoTotal: progressoTotal.toFixed(2),
            passouPercent: passouPercent.toFixed(2),
            naoPassouPercent: naoPassouPercent.toFixed(2),
            totalPassou,
            totalNaoPassou,
        };
    };

    //Função para Grava o teste no BD
    const gravarTeste = async (id, resultado, observacao) => {
        try {
            if (resultado === "Não Testado" || resultado === undefined) {
                setVisible(true);
                return;
            }
            alert("Teste salvo!")
            const data = { resultado, observacao };
            await updateTeste(id, data)
            setAtualizar(true);// Alerta quando o teste estiver finaliza

        } catch (error) {
            console.log(error)
        }
    };

    // Função para excluir um teste
    const excluirTeste = async (id) => {
        try {
            await deleteTeste(id);
            setAtualizar(true); // Sinaliza para recarregar os testes após exclusão
        } catch (error) {
            console.error("Erro ao excluir teste:", error);
        }
    };

    // Função para resetar os testes
    const resetarTestes = () => {
        setTestes((prevTestes) =>
            prevTestes.map((teste) => ({ ...teste, resultado: 'Não Testado', observacao: '' }))
        );
    };

    // Função para gerar e salvar PDF com os testes
    const enviarEmailComPDF = () => {
        const doc = new jsPDF();
        doc.text('Checklist de Testes', 10, 10);
        doc.text(`Técnico: ${nomeTecnico}`, 10, 20);

        testes.forEach((teste, index) => {
            doc.text(`${index + 1}. ${teste.tecnico}- ${teste.description} - Resultado: ${teste.resultado} - Observação: ${teste.observacao}`, 10, 30 + index * 10);
        });

        doc.save('checklist.pdf');
        // Implementar envio de email com biblioteca de email aqui
    };

    const { progressoTotal, passouPercent, naoPassouPercent, totalPassou, totalNaoPassou } = calcularProgresso();

    // useEffect para carregar os testes ao montar o componente
    useEffect(() => {
        findAllTestes();
        findAllGrupos();
    }, []);

    // useEffect para atualizar os testes apenas quando necessário (evitando loop infinito)
    useEffect(() => {
        if (atualizar) {
            findAllTestes();
            setAtualizar(false); // Resetar flag de atualização
        }
    }, [atualizar]);

    return (
        <>
            <div className="mt-4">
                <h3>Progresso dos Testes</h3>

                <BarraDeProgresso width={`${passouPercent}`} tipo="passou" />
                <BarraDeProgresso width={`${naoPassouPercent}`} tipo="naoPassou" />

                <p>Total de Testes: {filteredItems.length}</p>
                <p>Testes que Passaram: {totalPassou} ({passouPercent}%)</p>
                <p>Testes que Não Passaram: {totalNaoPassou} ({naoPassouPercent}%)</p>
            </div>

            <div className="container mt-4">
                {visible && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>ATENÇÃO!</strong> TESTE NÃO FOI FINALIZADO !!!
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeAlert}></button>
                    </div>
                )}

            </div>

            <h3>Filtrar Testes</h3>
            <div className="mb-3">
                <label htmlFor="categorySelect" className="form-label">Filtrar por SubGrupo</label>
                <select
                    id="categorySelect"
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todos</option>
                    {subGrupo.map((checklist) => (
                        <option key={checklist._id} value={checklist.subGrupo}>
                            {checklist.subGrupo}
                        </option>
                    ))}
                </select>
            </div>
            {filteredItems.length > 0 ? (
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Grupo</th>
                            <th>Casos de Uso!</th>
                            <th>Resultado</th>
                            <th>Observação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((teste) => (
                            <tr key={teste._id} >
                                <td>{teste.grupo.nome}</td>
                                <td>{teste.description}</td>
                                <td>
                                    <select className="form-control" value={teste.resultado}
                                        onChange={(e) => handleChange(teste._id, e)}
                                    >
                                        <option value="Não Testado">Não Testado</option>
                                        <option value="Passou">Passou</option>
                                        <option value="Não Passou">Não Passou</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={teste.observacao}
                                        placeholder="Observação"
                                        onChange={(e) => handleObservationChange(teste._id, e)}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-danger space" onClick={() => excluirTeste(teste._id)}>Excluir</button>
                                    <button className="btn btn-success"
                                        onClick={() => gravarTeste(teste._id, teste.resultado, teste.observacao)} >Gravar</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<li className="list-group-item">Nenhum item encontrado "{selectedCategory}"</li>)}

            <button className="btn btn-warning mt-2 space" onClick={resetarTestes}>Resetar Testes</button>
            <button className="btn btn-success mt-2 PDF" onClick={enviarEmailComPDF}>Gerar PDF</button>
        </>
    );
};

export default ListaDeTestes;
