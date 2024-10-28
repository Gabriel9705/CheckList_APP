import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/ui-checks.svg";
import { loggedUser } from "../../services/user.service";
import { UserContext } from "../../Context/UserContext";

const Main = () => {
    const { user, setUser } = useContext(UserContext);
    const [modoDark, setModoDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', modoDark);
    }, [modoDark]);

    const toggleModoDark = () => {
        setModoDark((prevModoDark) => !prevModoDark);
    };

    async function findUserLogged() {
        try {
            const response = await loggedUser();
            //Meu código para nào aparecer a senha
            delete response.data.password;
            setUser(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Cookies.get("token")) findUserLogged();
    }, []);

    function userLogout() {
        Cookies.remove("token");
        setUser({});
        navigate("/auth/login");
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/">
                        <h1 className="navbar-brand">
                            <img src={logo} alt="Logo CheckList" width="30" height="30" className="d-inline-block align-text-top" />
                            Checklist de Testes
                        </h1>
                    </Link>
                    {/* Botão para alternar o modo escuro */}
                    <button onClick={toggleModoDark} className="btn btn-secondary mb-3">
                        {modoDark ? 'Modo Claro' : 'Modo Escuro'}
                    </button>
                </div>
            </nav >
            <div className={`container ${modoDark ? 'dark-mode' : ''}`}>

                <Outlet />
            </div>
        </>
    )
}

export default Main;