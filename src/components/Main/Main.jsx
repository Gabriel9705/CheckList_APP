import { useEffect, useState } from "react";
import logo from "../../assets/ui-checks.svg";
import CollapseExample from "../Collapse/CollapseLista";
import ListaDeTestes from "../ListaDeTestes/ListaDeTeste";
import AlertExample from "../Alerts/Alerts";

const Main = () => {
    const [modoDark, setModoDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', modoDark);
    }, [modoDark]);

    const toggleModoDark = () => {
        setModoDark((prevModoDark) => !prevModoDark);
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="Logo CheckList" width="30" height="30" className="d-inline-block align-text-top" />
                        Checklist de Testes
                    </a>
                    {/* Botão para alternar o modo escuro */}
                    <button onClick={toggleModoDark} className="btn btn-secondary mb-3">
                        {modoDark ? 'Modo Claro' : 'Modo Escuro'}
                    </button>
                </div>
            </nav>
            <div className={`container ${modoDark ? 'dark-mode' : ''}`}>
                {/* <h1 className='checklist'>Checklist de Testes</h1> */}
                <CollapseExample />
                <ListaDeTestes />
            </div>
        </>
    )
}

export default Main;