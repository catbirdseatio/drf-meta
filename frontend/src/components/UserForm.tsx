import { z } from "zod";
import { UserSchema } from "../@types/auth.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserFormProps } from "../@types/auth.d";
import Input from "./Input";

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
       <Input fieldName="email" label="Email" {...register("email")} />
        {errors["email"] && <span>{errors["email"].message}</span>}
      </>
      <br />
      <>
      <Input fieldName="password" label="password" {...register("password")} type="password" />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default UserForm;