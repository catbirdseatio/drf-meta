import { useRef, useState, useEffect } from "react";
import { validateEmail } from "../utils";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFlash } from "../contexts/FlashContext";

type FormErrors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { login } = useAuth();
  const { flash } = useFlash()
  const emailField = useRef<HTMLInputElement | null>(null);
  const passwordField = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailField.current?.focus();
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailField.current?.value;
    const password = passwordField.current?.value;
    const errors: FormErrors = {};

    if (!email) errors.email = "Email must not be empty.";
    if (email && !validateEmail(email)) errors.email = "Email must be valid.";
    if (!password) errors.password = "Password must not be empty.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const success: boolean = await login(email!, password!);

    if (success) {
      flash(`${email} has been successfully logged in.`);
      navigate("/");
      setFormErrors({})
    } else flash("User could not be authenticated.");
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login Form</h2>
      <InputField
        name="email"
        label="Enter email address"
        placeholder="Email"
        error={formErrors.email}
        fieldRef={emailField}
      />
      <br />
      <InputField
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        error={formErrors.password}
        fieldRef={passwordField}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
