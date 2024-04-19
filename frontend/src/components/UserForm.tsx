import { FC } from "react";
import { useForm } from "../hooks/useForm";
import { UserSchema } from "../@types/auth.d"
import { Form } from "./Form";
import { SubmitHandler } from "react-hook-form";
import { ILogin } from "../@types/auth.d";
import InputField  from "./InputField";

interface IUserFormProps {
  formType: string;
  onSubmitHandler: SubmitHandler<ILogin>
}

const UserForm: FC<IUserFormProps> = ({ formType, onSubmitHandler }) => {
  const form = useForm({
    schema: UserSchema
  });
  return <Form form={form}
  onSubmit={onSubmitHandler}
  >
    <h2>{formType}</h2>
    <InputField
      label="email"
      type="text"
      placeholder="user@example.com"
      {...form.register('email')}
    />
    <InputField
      label="password"
      type="password"
      placeholder="Enter your password"
      {...form.register('password')}
    />
    <button type="submit">Submit</button>
  </Form>;
};

export default UserForm;
