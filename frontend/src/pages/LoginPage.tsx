import { useRef, useState, useEffect, FormEvent } from "react";
import { useUser } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useFlash } from "../contexts/FlashProvider";

const validateEmail = (email:string) => {
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginPage = () => {
  const [formErrors, setFormErrors] = useState({});
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const { login } = useUser();
  const navigate = useNavigate();
  const flash = useFlash();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailField.current.value;
    const password = passwordField.current.value;
    const errors = {};

    if (!email) errors.email = "Email must not be empty.";
    if (email && !validateEmail(email)) errors.email = "Email must be valid.";
    if (!password) errors.password = "Password must not be empty.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const success = await login(email, password);
    if (success) {
      setFormErrors({});
      flash(`${email} has been logged in`);
      navigate("/");
    } else {
      flash("Could not authenticate");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login Form</h2>
      <InputField
        name="email"
        label="Enter email address"
        error={formErrors.email}
        fieldRef={emailField}
      />
      <br />
      <InputField
        name="password"
        type="password"
        label="Password"
        error={formErrors.password}
        fieldRef={passwordField}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
