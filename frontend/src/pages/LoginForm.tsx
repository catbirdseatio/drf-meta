import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, UserSchema } from "../@types/auth.d";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";

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
        await login(email, password)
        flash(`${email} has been logged in.`)
        navigate("/")
    } catch (error) {
        flash("User could not be authenticated.")
    }
    
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email")} />
      {errors.email && (
        <p style={{ fontSize: ".75rem", color: "red" }}>
          {errors.email.message}
        </p>
      )}
      <br />
      <input type="password" {...register("password")} />
      {errors.password && (
        <p style={{ fontSize: ".75rem", color: "red" }}>
          {errors.password.message}
        </p>
      )}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
