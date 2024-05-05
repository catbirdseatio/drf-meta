import { SubmitHandler } from "react-hook-form";
import { ILogin } from "../@types/auth.d";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../contexts/FlashContext";
import RegisterService from "../services/AuthServices/RegisterService"
import UserForm from "../components/UserForm";
import FlexContainer from "../components/FlexContainer";

const RegistrationPage = () => {
  const { flash } = useFlash();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const { email, password } = data;

    try {
      const user: ILogin = await RegisterService.post({ email: email, password: password });

      if (user) {
        flash(`${email} has been successfully registered.`);
        navigate("/login");
      }
    } catch (error) {
      flash("The user could not be registered.");
    }
  };

  return (
    <FlexContainer>
      <UserForm formType="Register" onSubmit={onSubmit} />
    </FlexContainer>);
};

export default RegistrationPage;
