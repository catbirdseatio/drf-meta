import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, UserSchema } from "../@types/auth.d";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";
import UserInputField from "../components/UserInputField";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(UserSchema),
  });
  const { login } = useAuth();
  const { flash } = useFlash();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const { email, password } = data;

    try {
      await login(email, password);
      flash(`${email} has been logged in.`);
      navigate("/");
    } catch (error) {
      flash("User could not be authenticated.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
