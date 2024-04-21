import { forwardRef } from "react";

interface InputProps {
  label: string;
  type?: "text" | "password";
  fieldName: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type = "text", fieldName, ...props }: InputProps, ref) => (
    <>
        <label htmlFor={fieldName}>{label}</label>
      <input type={type} ref={ref} {...props} />
    </>
  ));

export default Input;