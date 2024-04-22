import { forwardRef } from "react";
import { ITextAreaProps } from "../@types/forms";
import Error from "./Error";



const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, fieldName, error, ...props }: ITextAreaProps, ref) => (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <textarea ref={ref} {...props} />
      <Error error={error} />
    </>
  )
);

export default TextArea;
