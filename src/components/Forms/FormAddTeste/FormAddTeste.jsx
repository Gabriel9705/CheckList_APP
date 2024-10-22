import { useEffect, useState } from "react";
import { getAllGrupos, getAllSubGrupos, postTeste } from "../../../services/listaTestes";
import { useForm } from "react-hook-form";
import Input from "../../Input/Input";

const FormAddTeste = () => {
    const [checklists, setChecklists] = useState([]);
    const [subchecklists, setSubchecklists] = useState([]);
    const [checklistAtual, setChecklistAtual] = useState('');
    const [subchecklistAtual, setSubchecklistAtual] = useState('');
    const [novoChecklist, setNovoChecklist] = useState('');
    const [novoSubchecklist, setNovoSubchecklist] = useState('');
    const [nomeTecnico, setNomeTecnico] = useState('');

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        // resolver: zodResolver(gameSchema)
    });

    async function adicionarTeste(data) {
        try {
            console.log(data);
            await postTeste(data);
            reset();
        } catch (error) {
            console.log(error)
        }
    };

    // const adicionarTeste = () => {
    //     if (novoTeste.trim() === '') return;
    //     const novoTesteObj = { id: Date.now(), nome: novoTeste, resultado: 'Não Testado', observacao: '' };
    //     setTestes((prevTestes) => [...prevTestes, novoTesteObj]);
    //     setNovoTeste('');
    // };

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
                <select className="form-control" onChange={handleSelectChange} {...register("grupo")}>
                    {checklists.map((checklist) => (
                        <option key={checklist._id} value={checklist.grupo}>{checklist.grupo}</option>
                    ))}
                </select>
            </div>

            {/* Dropdown para selecionar SubChecklist */}
            <div className="form-group">
                <strong>Selecionar SubChecklist:</strong>
                <select className="form-control" onChange={handleSubChecklistChange} {...register("subGrupo")}>
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
                    name="description"
                    register={register}
                />
                <button className="btn btn-primary mt-2" type="submit">Adicionar Teste</button>
            </div>
        </form>
    )
};

export default FormAddTeste;
