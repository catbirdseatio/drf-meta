import { z } from "zod";
import { UserSchema, IUserFormProps } from "./../../@types/auth.d";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";

import styles from "./UserForm.module.css";

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
      className={styles.form}
    >
      <div>
        <h2>{formType}</h2>
        <Input
          fieldName="email"
          label="Email"
          {...register("email")}
          error={errors.email}
        />
      </div>
      <div>
        <Input
          fieldName="password"
          label="Password"
          {...register("password")}
          type="password"
          error={errors.password}
        />
      </div>
      <div className={styles.button}>
        <button type="submit">{formType}</button>
      </div>
    </form>
  );
};

export default UserForm;
