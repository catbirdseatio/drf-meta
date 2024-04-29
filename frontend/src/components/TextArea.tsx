import { forwardRef } from "react";
import { ITextAreaProps } from "../@types/forms";
import Error from "./Error";

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, fieldName, error, ...props }: ITextAreaProps, ref) => (
    <div className="grid grid-flow-row">
      <label htmlFor={fieldName} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <textarea ref={ref} {...props} className="w-100"/>
      <Error error={error} />
    </div>
  )
);

export default TextArea;
