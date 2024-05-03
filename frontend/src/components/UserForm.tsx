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
      <div >
        <h2 >{formType}</h2>
        <Input
          fieldName="email"
          label="Email"
          {...register("email")}
          error={errors.email}
        />
      </div>
      <div >
        <Input
          fieldName="password"
          label="password"
          {...register("password")}
          type="password"
          error={errors.password}
        />
      </div>
      <button type="submit" >{formType}</button>
    </form>
  );
};

export default UserForm;
