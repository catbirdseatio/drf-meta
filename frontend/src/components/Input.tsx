import { forwardRef } from "react";
import { IInputProps } from "../@types/forms";
import Error from "./Error";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", fieldName, error, ...props }: IInputProps, ref) => (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <input type={type} ref={ref} {...props} />
      <Error error={error} />
    </div>
  )
);

export default Input;
