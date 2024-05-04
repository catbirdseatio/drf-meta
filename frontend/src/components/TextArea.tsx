import { forwardRef } from "react";
import { ITextAreaProps } from "../@types/forms";
import Error from "./Error";


const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, fieldName, error, rows = 4, ...props }: ITextAreaProps, ref) => (
    <div >
      <label htmlFor={fieldName} >{label}</label>
      <textarea ref={ref} rows={rows} {...props} />
      <Error error={error} />
    </div>
  )
);

export default TextArea;
