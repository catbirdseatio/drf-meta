import { UserSchema } from "../@types/auth.d";
import { IUserFormProps } from "../@types/auth.d";
import { Form, useForm} from "./Form";


const UserForm = ({ onSubmit, formType }: IUserFormProps) => {
  const form = useForm({
    schema: UserSchema
  });


  return (
    <Form
      form={form}
      onSubmit={(values) => {
        onSubmit(values)
        form.reset()
      }}
    >
      <h2>{formType}</h2>
      <div>
      <label htmlFor="email">email</label>
        <input type="text" {...form.register("email")} />
      </div>
      <br />
      <div>
        <label htmlFor="password">password</label>
        <input type="password" {...form.register("password")} />
      </div>
      <button type="submit">{formType}</button>
    </Form>
  );
};

export default UserForm;
