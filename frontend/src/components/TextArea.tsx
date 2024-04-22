import { forwardRef } from "react";
import { ITextAreaProps } from "../@types/forms";
import Error from "./Error";



const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, fieldName, error, ...props }: ITextAreaProps, ref) => (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <textarea ref={ref} {...props} />
      <Error error={error} />
    </div>
  )
);

export default TextArea;
