import { FieldError } from "react-hook-form";


export interface ErrorProps {
  error?: FieldError;
}

const Error = ({ error }: ErrorProps) => {
  return <>{error && <span>{error.message}</span>}</>;
};

export default Error;
