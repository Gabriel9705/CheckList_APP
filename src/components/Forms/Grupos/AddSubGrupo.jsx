import { useForm } from "react-hook-form";
import Input from "../../Input/Input";
import { postSubGrupo } from "../../../services/listaTestes";
import { ErrorSpan } from "../../../schema/ErrosStyled";
import { SubGrupoShema } from "../../../schema/testesSchema";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";


const AddSubGrupo = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(SubGrupoShema)
    });

    // Método para adicionar um novo subchecklist
    const adicionarSubChecklist = async (data) => {
        try {
            await postSubGrupo(data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit(adicionarSubChecklist)}>
            <div className="form-group">
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Novo SubGrupo..."
                    name={"subGrupo"}
                    register={register}
                />
                {errors.subGrupo && <ErrorSpan>{errors.subGrupo.message}</ErrorSpan>}
                <button type="submit" className="btn btn-primary mt-2">Criar Tipo de modulo!</button>
            </div>
        </form>
    )
};

export default AddSubGrupo;
