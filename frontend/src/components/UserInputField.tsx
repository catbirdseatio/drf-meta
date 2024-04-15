import { FC } from "react";
import {  FieldError, UseFormRegister } from "react-hook-form";
import { ILogin } from "../@types/auth";

type InputFieldProps = {
    name: "email" | "password";
    label: string;
    type?: string;
    error: FieldError | undefined;
    placeholder?: string;
    register: UseFormRegister<ILogin>
}

const UserInputField: FC<InputFieldProps> = ({
    name, label, type, placeholder, error, register
}) => <div>
    <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input type={type} 
        placeholder={placeholder}
        {...register(name)}
        />
        <span style={{color: 'red', fontSize: '.75rem'}}>{error?.message}</span>
    </div>
</div>


export default UserInputField