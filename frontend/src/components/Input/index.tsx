import { forwardRef } from "react";
import { IInputProps } from "../../@types/forms";
import Error from "../Error";

import styles from "./Input.module.css";

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = "text", fieldName, error, ...props }: IInputProps, ref) => (
    <div className={styles.formField}>
      <label htmlFor={fieldName}>{label}</label>
      <input type={type} ref={ref} {...props} data-testid={fieldName} />
      <Error error={error} />
    </div>
  )
);

export default Input;
