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
      className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 m-4"
    >
      <div className="mb-3">
        <h2 className="text-4xl font-bold text-center">{formType}</h2>
        <TextArea
          fieldName="email"
          label="Email"
          {...register("email")}
          error={errors.email}
        />
      </div>
      <div className="mb-4">
        <Input
          fieldName="password"
          label="password"
          {...register("password")}
          type="password"
          error={errors.password}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{formType}</button>
    </form>
  );
};

export default UserForm;
