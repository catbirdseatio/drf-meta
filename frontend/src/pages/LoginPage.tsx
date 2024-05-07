import { SubmitHandler } from "react-hook-form";
import { ILogin } from "../@types/auth.d";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";
import UserForm from "../components/UserForm";
import FlexContainer from "../components/FlexContainer";

const LoginPage = () => {
  const { login } = useAuth();
  const { flash } = useFlash();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const { email, password } = data;

    try {
      await login(email, password);
      flash(`${email} has been logged in.`, "success");
      navigate("/");
    } catch (error) {
      flash("User could not be authenticated.", "danger");
    }
  };

  return (
    <FlexContainer>
      <UserForm formType="Login" onSubmit={onSubmit} />
    </FlexContainer>)
};

export default LoginPage;
