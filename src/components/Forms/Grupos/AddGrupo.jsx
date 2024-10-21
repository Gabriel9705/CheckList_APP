import { useForm } from "react-hook-form";
import Input from "../../Input/Input";
import { postGrupo } from "../../../services/listaTestes";

const AddGrupo = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        // resolver: zodResolver(gameSchema)
    });

    // Método para adicionar um novo checklist
    const adicionarChecklist = async (data) => {
        try {
            await postGrupo(data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit(adicionarChecklist)}>
            {/* Botões para adicionar novo checklist e subchecklist */}
            <div className="form-group">
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Novo Checklist"
                    name="grupo"
                    register={register}
                />
                <button type="submit" className="btn btn-success mt-2">Criar Novo Checklist</button>
            </div>
        </form>
    )
};

export default AddGrupo;
