import { forwardRef } from "react";
import { IInputProps } from "../@types/forms";
import Error from "./Error";

const baseInputClasses = "form-inputshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", fieldName, error, ...props }: IInputProps, ref) => (
    <div className="grid grid-flow-row">
      <label htmlFor={fieldName} className=" text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input type={type} ref={ref} {...props} className={error ? `${baseInputClasses} border border-red-500` : baseInputClasses}/>
      <Error error={error} />
    </div>
  )
);

export default Input;
