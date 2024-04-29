import { forwardRef } from "react";
import { IInputProps } from "../@types/forms";
import Error from "./Error";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", fieldName, error, ...props }: IInputProps, ref) => (
    <div className="grid grid-flow-row">
      <label htmlFor={fieldName} className=" text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input type={type} ref={ref} {...props} className="form-input"/>
      <Error error={error} />
    </div>
  )
);

export default Input;
