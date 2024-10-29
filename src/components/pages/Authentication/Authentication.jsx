import { useParams } from "react-router-dom";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import { AuthContainer, ImgDelogin, SectionForm } from "./AuthenticationStyled";
import telaDeLogin  from "../../../imgs/telaLogin.png";
import RegisterForm from "../../Forms/RegisterForm/RegisterForm";


const Authentication = () => {
    const { action } = useParams();

    return (
        <AuthContainer>
            {action === "login" ? (
                <>
                    <SectionForm type="login">
                        <h2>Entrar</h2>
                        <LoginForm />
                    </SectionForm>
                    <ImgDelogin src={telaDeLogin} alt="Login" />
                </>
            ) : (
                <>
                    <SectionForm type="register">
                        <h2>Cadastrar-se</h2>
                        <RegisterForm />
                    </SectionForm>
                    <ImgDelogin src={telaDeLogin} alt="Register" />
                </>

            )}
        </AuthContainer>
    )
};

export default Authentication;
