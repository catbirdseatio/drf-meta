import { FieldError } from "react-hook-form";

export interface ErrorProps {
  error?: FieldError;
}

const Error = ({ error }: ErrorProps) => {
  return <>{error && <span className="text-red-500 text-xs italic mt-2">{error.message}</span>}</>;
};

export default Error;
