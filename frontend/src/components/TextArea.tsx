import { forwardRef } from "react";
import { ITextAreaProps } from "../@types/forms";
import Error from "./Error";


const baseInputClasses = "textarea shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"


const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, fieldName, error, rows = 4, ...props }: ITextAreaProps, ref) => (
    <div className="grid grid-flow-row">
      <label htmlFor={fieldName} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <textarea ref={ref} rows={rows} {...props} className={error ? `${baseInputClasses} border border-red-500` : baseInputClasses}/>
      <Error error={error} />
    </div>
  )
);

export default TextArea;
