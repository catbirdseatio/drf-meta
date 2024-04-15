import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, UserSchema } from "../@types/auth.d";
import UserInputField from "../components/UserInputField";


type UserFormProps = {
    handleOnSubmit: SubmitHandler<ILogin>,
    formType: "Login" | "Register"
}
const UserForm: FC<UserFormProps> = ({ 
handleOnSubmit,
formType
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(UserSchema),
  });


  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h2>{formType}</h2>
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
      <button type="submit">{formType}</button>
    </form>
  );
};

export default UserForm;
