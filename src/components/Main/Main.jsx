import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { loggedUser } from "../../services/user.service";
import { UserContext } from "../../Context/UserContext";
import { SectionAdmin, MenuDropdrown, MenuHambuguer, Nav, NavbarUser } from "./MainStyled";

const Main = () => {
    const { user, setUser } = useContext(UserContext);
    const [modoDark, setModoDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

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
        if (!Cookies.get("token")) userLogout();
    }, []);


    function userLogout() {
        Cookies.remove("token");
        setUser({});
        navigate("/auth/login");
    };

    return (
        <>
            <Nav>
                <Link to="/">
                    <h1>
                        <i className="bi bi-ui-checks"></i>
                        Checklist de Testes
                    </h1>
                </Link>

                <NavbarUser>
                    {user.admin && <SectionAdmin><p>Admin</p></SectionAdmin>}
                    <span>Olá, {user?.name}</span> {/* Nome do usuário logado */}
                    <MenuHambuguer onClick={() => setMenuOpen(!menuOpen)}>
                        <i className={`bi ${!menuOpen ? "bi-list" : "bi-x"}`}></i>
                    </MenuHambuguer>
                    {menuOpen && (
                        <MenuDropdrown>
                            {user.admin &&
                                <button onClick={() => navigate('auth/register')}>
                                    <i className="bi bi-person-add"></i>Cadastrar Técnicos</button>
                            }
                            <button onClick={() => navigate('/profile')}>
                                <i className="bi bi-person-lines-fill"></i>Meus Testes</button>
                            <button onClick={toggleModoDark}>
                                <i className={`bi ${!modoDark ? "bi-moon-stars-fill" : "bi-sun-fill"}`}></i>
                                {modoDark ? 'Modo Claro' : 'Modo Escuro'}
                            </button>
                            <button onClick={userLogout}>
                                <i className="bi bi-box-arrow-right"></i>Sair</button>
                        </MenuDropdrown>
                    )}
                </NavbarUser>
            </Nav >
            <div className={`container ${modoDark ? 'dark-mode' : ''}`}>

                <Outlet />
            </div>
        </>
    )
}

export default Main;