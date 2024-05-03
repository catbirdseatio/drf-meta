import { forwardRef } from "react";
import { IInputProps } from "../@types/forms";
import Error from "./Error";

const baseInputClasses = "form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", fieldName, error, ...props }: IInputProps, ref) => (
    <div >
      <label htmlFor={fieldName} >{label}</label>
      <input type={type} ref={ref} {...props} className={error ? `${baseInputClasses} border border-red-500` : baseInputClasses}/>
      <Error error={error} />
    </div>
  )
);

export default Input;
