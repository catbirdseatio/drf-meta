import { z } from "zod";
import { UserSchema } from "../@types/auth.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserFormProps } from "../@types/auth.d";
import TextArea from "./TextArea";
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
        <TextArea
          fieldName="email"
          label="Email"
          {...register("email")}
          error={errors.email}
        />
      </>
      <br />
      <>
        <Input
          fieldName="password"
          label="password"
          {...register("password")}
          type="password"
          error={errors.password}
        />
      </>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default UserForm;
