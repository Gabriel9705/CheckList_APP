import { useEffect, useState } from "react";
import { getAllGrupos, getAllSubGrupos } from "../../../services/listaTestes";

const HeaderCheckList = () => {
    const [checklists, setChecklists] = useState([]);
    const [subchecklists, setSubchecklists] = useState([]);
    const [novoChecklist, setNovoChecklist] = useState('');
    const [novoSubchecklist, setNovoSubchecklist] = useState('');
    const [subchecklistAtual, setSubchecklistAtual] = useState('');
    const [nomeTecnico, setNomeTecnico] = useState('');
    const [checklistAtual, setChecklistAtual] = useState('');

    const handleSelectChange = (e) => {
        const checklistSelecionado = e.target.value;
        setChecklistAtual(checklistSelecionado);
    };

    const handleSubChecklistChange = (e) => {
        const subchecklistSelecionada = e.target.value;
        setSubchecklistAtual(subchecklistSelecionada);
    };

    async function findAllGrupos() {
        const responseG = await getAllGrupos();
        const responseSub = await getAllSubGrupos();
        const resG = responseG.data;
        const resSub = responseSub.data;

        setChecklists(resG);
        setSubchecklists(resSub);
    };

    // Método para adicionar um novo checklist
    const adicionarChecklist = () => {
        if (novoChecklist.trim() === '') return;
        setChecklists((prevChecklists) => ({
            ...prevChecklists,
            [novoChecklist]: { subchecklists: {} },
        }));
        setChecklistAtual(novoChecklist);
        setNovoChecklist('');
    };

    // Método para adicionar um novo subchecklist
    const adicionarSubChecklist = () => {
        if (novoSubchecklist.trim() === '') return;
        setChecklists((prevChecklists) => ({
            ...prevChecklists,
            [checklistAtual]: {
                ...prevChecklists[checklistAtual],
                subchecklists: {
                    ...prevChecklists[checklistAtual].subchecklists,
                    [novoSubchecklist]: [],
                },
            },
        }));
        setSubchecklistAtual(novoSubchecklist);
        setNovoSubchecklist('');
    };

    useEffect(() => {
        findAllGrupos(),
            console.log(checklistAtual, subchecklistAtual, nomeTecnico);
    }, [checklistAtual, subchecklistAtual, nomeTecnico]);

    return (
        <>
            <div className="mb-3">
                <strong>Nome do Técnico:</strong>
                <input
                    type="text"
                    className="form-control"
                    value={nomeTecnico}
                    onChange={(e) => setNomeTecnico(e.target.value)}
                    placeholder="Digite o nome do técnico"
                />
            </div>

            {/* Dropdown para selecionar Checklist */}
            <div className="form-group">
                <strong>Selecionar Checklist:</strong>
                <select className="form-control" value={checklistAtual} onChange={handleSelectChange}>
                    {checklists.map((checklist) => (
                        <option key={checklist._id} value={checklist.grupo}>{checklist.grupo}</option>
                    ))}
                </select>
            </div>

            {/* Dropdown para selecionar SubChecklist */}
            <div className="form-group">
                <strong>Selecionar SubChecklist:</strong>
                <select className="form-control" value={subchecklistAtual} onChange={handleSubChecklistChange}>
                    {subchecklists.map((subchecklist) => (
                        <option key={subchecklist._id} value={subchecklist.subGrupo}>{subchecklist.subGrupo}</option>
                    ))}
                </select>
            </div>

            {/* Botões para adicionar novo checklist e subchecklist */}
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Novo Checklist"
                    value={novoChecklist}
                    onChange={(e) => setNovoChecklist(e.target.value)}
                />
                <button onClick={adicionarChecklist} className="btn btn-success mt-2">Criar Novo Checklist</button>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Novo SubChecklist"
                    value={novoSubchecklist}
                    onChange={(e) => setNovoSubchecklist(e.target.value)}
                />
                <button onClick={adicionarSubChecklist} className="btn btn-primary mt-2">Criar Novo SubChecklist</button>
            </div>
        </>
    )
};

export default HeaderCheckList;
