import { z } from "zod";
import { UserSchema } from "../@types/auth.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserFormProps } from "../@types/auth.d";

type UserFormData = z.infer<typeof UserSchema>;


const UserForm = ({ onSubmit, formType }: IUserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({ resolver: zodResolver(UserSchema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <h2>{formType}</h2>
      <>
        <label htmlFor="email">Email</label>
        <input type="text" {...register("email")} />
        {errors["email"] && <span>{errors["email"].message}</span>}
      </>
      <br />
      <>
        <label htmlFor="password">password</label>
        <input type="password" {...register("password")} />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default UserForm;
