import { useEffect, useState } from "react";
import { getAllGrupos, getAllSubGrupos, postTeste } from "../../../services/listaTestes";
import { useForm } from "react-hook-form";
import { TestesSchema } from "../../../schema/testesSchema";
import { ErrorSpan } from "../../../schema/ErrosStyled";
import Input from "../../Input/Input";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";

const FormAddTeste = () => {
    const [checklists, setChecklists] = useState([]);
    const [subchecklists, setSubchecklists] = useState([]);
    const [checklistAtual, setChecklistAtual] = useState('');
    const [subchecklistAtual, setSubchecklistAtual] = useState('');
    const [atualizarChecklists, setAtualizarChecklists] = useState(false); // Controlador de atualização
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(TestesSchema)
    });

    // Função para adicionar um novo teste
    const adicionarTeste = async (data) => {
        try {
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
            {errors.tecnico && <ErrorSpan>{errors.tecnico.message}</ErrorSpan>}

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
            {errors.grupo && <ErrorSpan>{errors.grupo.message}</ErrorSpan>}

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
            {errors.subGrupo && <ErrorSpan>{errors.subGrupo.message}</ErrorSpan>}

            <div className="form-group">
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Novo Teste"
                    name="description"
                    register={register}
                />
                {errors.description && <ErrorSpan>{errors.description.message}</ErrorSpan>}
                <button className="btn btn-primary mt-2" type="submit">Adicionar Teste</button>
            </div>
        </form>
    );
};

export default FormAddTeste;
