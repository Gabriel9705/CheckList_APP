import { useEffect, useState } from "react";
import { getAllGrupos, getAllSubGrupos, postTeste } from "../../../services/listaTestes";
import { useForm } from "react-hook-form";
import Input from "../../Input/Input";

const FormAddTeste = () => {
    const [checklists, setChecklists] = useState([]);
    const [subchecklists, setSubchecklists] = useState([]);
    const [checklistAtual, setChecklistAtual] = useState('');
    const [subchecklistAtual, setSubchecklistAtual] = useState('');
    const [atualizarChecklists, setAtualizarChecklists] = useState(false); // Controlador de atualização
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    // Função para adicionar um novo teste
    const adicionarTeste = async (data) => {
        try {
            console.log(data);
            await postTeste(data);
            reset();
            setAtualizarChecklists(true); // Sinaliza para atualizar os dados
        } catch (error) {
            console.log(error);
        }
    };

    // Função para lidar com a mudança de seleção do checklist
    const handleSelectChange = (e) => {
        setChecklistAtual(e.target.value);
    };

    // Função para lidar com a mudança de seleção do subchecklist
    const handleSubChecklistChange = (e) => {
        setSubchecklistAtual(e.target.value);
    };

    // Função para buscar todos os grupos e subgrupos
    const findAllGrupos = async () => {
        try {
            const responseG = await getAllGrupos();
            const responseSub = await getAllSubGrupos();
            setChecklists(responseG.data);
            setSubchecklists(responseSub.data);
        } catch (error) {
            console.error("Erro ao carregar grupos e subgrupos:", error);
        }
    };

    // useEffect para carregar os grupos e subgrupos ao montar o componente
    useEffect(() => {
        findAllGrupos();
    }, []);

    // useEffect para recarregar os grupos/subgrupos somente quando necessário
    useEffect(() => {
        if (atualizarChecklists) {
            findAllGrupos();
            setAtualizarChecklists(false); // Resetar flag de atualização
        }
    }, [atualizarChecklists]);

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
                        <option key={checklist._id} value={checklist.grupo}>
                            {checklist.grupo}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dropdown para selecionar SubChecklist */}
            <div className="form-group">
                <strong>Selecionar SubChecklist:</strong>
                <select className="form-control" onChange={handleSubChecklistChange} {...register("subGrupo")}>
                    {subchecklists.map((subchecklist) => (
                        <option key={subchecklist._id} value={subchecklist.subGrupo}>
                            {subchecklist.subGrupo}
                        </option>
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
    );
};

export default FormAddTeste;
