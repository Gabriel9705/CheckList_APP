import { useState } from "react";
import FiltroGrupoSubGrupo from "../../TesteFiltro/FiltroGrupoSubGrupo";
import ListaDeTestes from "../../ListaDeTestes/ListaDeTeste";

const FormAddTeste = () => {
    const [filtros, setFiltros] = useState({ grupo: "", subGrupo: "" });
    return (
        <>
            <FiltroGrupoSubGrupo setFiltros={setFiltros} />
            <ListaDeTestes filtros={filtros} />
        </>
    )
};

export default FormAddTeste;
