import { useForm } from "react-hook-form";
import Input from "../../Input/Input";
import { postSubGrupo } from "../../../services/listaTestes";

const AddSubGrupo = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        // resolver: zodResolver(gameSchema)
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
                    placeholder="Novo SubChecklist"
                    name={"subGrupo"}
                    register={register}
                />
                <button type="submit" className="btn btn-primary mt-2">Criar Tipo de modulo!</button>
            </div>
        </form>
    )
};

export default AddSubGrupo;
