import { forwardRef } from "react";
import { IInputProps } from "../@types/form";
import FieldError from "./FieldError";

const InputField = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input type={type} ref={ref} {...props} />
      <FieldError name={props.name} />
    </div>
  )
);

export default InputField;
