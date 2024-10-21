import { useEffect, useState } from "react";
import Input from "../../Input/Input";
import { getAllGrupos, getAllSubGrupos } from "../../../services/listaTestes";
import { useForm } from "react-hook-form";

const FormAddTeste = () => {
    const [checklists, setChecklists] = useState([]);
    const [subchecklists, setSubchecklists] = useState([]);
    const [novoChecklist, setNovoChecklist] = useState('');
    const [novoSubchecklist, setNovoSubchecklist] = useState('');
    const [subchecklistAtual, setSubchecklistAtual] = useState('');
    const [nomeTecnico, setNomeTecnico] = useState('');
    const [checklistAtual, setChecklistAtual] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        // resolver: zodResolver(gameSchema)
    });

    async function adicionarTeste(data) {
        console.log(data)
    };

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

    useEffect(() => {
        findAllGrupos()
    }, []);

    return (
        <form onSubmit={handleSubmit(adicionarTeste)}>
            <div className="mb-3">
                <strong>Nome do Técnico:</strong>
                <Input
                    type="text"
                    className="form-control"
                    name="tecnico"
                    placeholder="Digite o nome do técnico"
                    register={register}
                />
            </div>

            {/* Dropdown para selecionar Checklist */}
            <div className="form-group">
                <strong>Selecionar Checklist:</strong>
                <select className="form-control" value={checklistAtual} onChange={handleSelectChange} register>
                    {checklists.map((checklist) => (
                        <option key={checklist._id} value={checklist.grupo}>{checklist.grupo}</option>
                    ))}
                </select>
            </div>

            {/* Dropdown para selecionar SubChecklist */}
            <div className="form-group">
                <strong>Selecionar SubChecklist:</strong>
                <select className="form-control" value={subchecklistAtual} onChange={handleSubChecklistChange} register>
                    {subchecklists.map((subchecklist) => (
                        <option key={subchecklist._id} value={subchecklist.subGrupo}>{subchecklist.subGrupo}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Novo Teste"
                    name="teste"
                    register={register}
                />
                <button className="btn btn-primary mt-2" onClick={adicionarTeste}>Adicionar Teste</button>
            </div>
        </form>
    )
};

export default FormAddTeste;
