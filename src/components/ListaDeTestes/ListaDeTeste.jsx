import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { getAllListaTestes } from "../../services/listaTestes";

const ListaDeTestes = () => {
    const [testes, setTestes] = useState([]);
    const [novoTeste, setNovoTeste] = useState('');
    const [nomeTecnico, setNomeTecnico] = useState('');

    async function findAllTestes() {
        const response = await getAllListaTestes();
        const res = response.data;
        setTestes(res);
    };

    const handleChange = (id, e) => {
        const novosTestes = testes.map((teste) =>
            teste._id === id ? { ...teste, resultado: e.target.value } : teste
        );
        setTestes(novosTestes);
    };

    const handleObservationChange = (id, e) => {
        const novosTestes = testes.map((teste) =>
            teste._id === id ? { ...teste, observacao: e.target.value } : teste
        );
        setTestes(novosTestes);
    };

    const calcularProgresso = () => {
        const totalTestes = testes.length;
        const totalPassou = testes.filter(teste => teste.resultado === 'Passou').length;
        const totalNaoPassou = testes.filter(teste => teste.resultado === 'Não Passou').length;

        const progressoTotal = totalTestes > 0 ? (totalPassou / totalTestes) : 0;
        const passouPercent = totalTestes > 0 ? (totalPassou / totalTestes) : 0;
        const naoPassouPercent = totalTestes > 0 ? (totalNaoPassou / totalTestes) : 0;

        return {
            progressoTotal: (progressoTotal * 100).toFixed(2),
            passouPercent: (passouPercent * 100).toFixed(2),
            naoPassouPercent: (naoPassouPercent * 100).toFixed(2),
            totalPassou,
            totalNaoPassou,
        };
    };

    const excluirTeste = (id) => {
        const novosTestes = testes.filter(teste => teste.id !== id);
        setTestes(novosTestes);
    };

    const resetarTestes = () => {
        const novosTestes = testes.map(teste => ({ ...teste, resultado: 'Não Testado', observacao: '' }));
        setTestes(novosTestes);
    };

    const enviarEmailComPDF = () => {
        const doc = new jsPDF();
        doc.text('Checklist de Testes', 10, 10);
        doc.text(`Técnico: ${nomeTecnico}`, 10, 20);

        testes.forEach((teste, index) => {
            doc.text(`${index + 1}. ${teste.nome} - Resultado: ${teste.resultado} - Observação: ${teste.observacao}`, 10, 30 + index * 10);
        });

        doc.save('checklist.pdf');
        // Implementar envio de email aqui com emailjs
    };

    const { progressoTotal, passouPercent, naoPassouPercent, totalPassou, totalNaoPassou } = calcularProgresso();

    useEffect(() => {
        findAllTestes();
    }, []);

    return (
        <>
            {/* Exibir Progresso dos Testes */}
            <div className="mt-4">
                <h3>Progresso dos Testes</h3>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${passouPercent}%` }} aria-valuenow={passouPercent} aria-valuemin="0" aria-valuemax="100">
                        {passouPercent}%
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${naoPassouPercent}%` }} aria-valuenow={naoPassouPercent} aria-valuemin="0" aria-valuemax="100">
                        {naoPassouPercent}%
                    </div>
                </div>
                <p>Total de Testes: {testes.length}</p>
                <p>Testes que Passaram: {totalPassou} ({passouPercent}%)</p>
                <p>Testes que Não Passaram: {totalNaoPassou} ({naoPassouPercent}%)</p>
            </div>
            {/* Lista de Testes */}
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Casos de Uso!</th>
                        <th>Resultado</th>
                        <th>Observação</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {testes.map((teste) => (
                        <tr key={teste._id}>
                            <td>{teste.description}</td>
                            <td>
                                <select className="form-control" value={teste.itHappened} onChange={(e) => handleChange(teste._id, e)}>
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
                                    onChange={(e) => handleObservationChange(teste._id, e)}
                                    placeholder="Observação"
                                />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => excluirTeste(teste.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-warning mt-2" onClick={resetarTestes}>Resetar Testes</button>
            <button className="btn btn-success mt-2 PDF space" onClick={enviarEmailComPDF}>Gerar PDF</button>
        </>
    )
};

export default ListaDeTestes;
