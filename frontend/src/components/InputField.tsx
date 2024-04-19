import {  forwardRef } from 'react'
import FieldError from './FieldError';

interface InputProps {
   label: string;
   type?: string;
   name: string;
   placeholder?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, type = "text", ...props },
    ref
  ) {
    return (
      <div>
        <label>{label}</label>
        <input type={type} ref={ref} {...props} />
        <FieldError name={props.name} />
      </div>
    );
  });

export default InputField