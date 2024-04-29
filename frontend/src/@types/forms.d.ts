export interface IInputProps {
  label: string;
  type?: "text" | "password";
  fieldName: string;
  error?: FieldError;
}

export interface ITextAreaProps {
  label: string;
  fieldName: string;
  error?: FieldError;
  rows?: number
}
