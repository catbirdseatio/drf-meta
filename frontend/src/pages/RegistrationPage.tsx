import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, UserSchema } from "../@types/auth.d";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../contexts/FlashContext";
import UserInputField from "../components/UserInputField";
import RegisterService from "../services/AuthServices/RegisterService"

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(UserSchema),
  });
  const { flash } = useFlash();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const { email, password } = data;

    try {
        const user: ILogin = await RegisterService.post({email: email, password: password});

        if (user) {
          flash(`${email} has been successfully registered.`);
          navigate("/login");
        }
    } catch (error) {
        flash("The user could not be registered.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <UserInputField
        name="email"
        placeholder="Email"
        register={register}
        label="Email"
        error={errors.email}
      />
      <br />
      <UserInputField
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        label="Password"
        error={errors.password}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;
