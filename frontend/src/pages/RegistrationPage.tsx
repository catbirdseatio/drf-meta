import { useRef, useState, useEffect } from "react";
import { validateEmail } from "../utils";
import { ILogin } from "../@types/auth"
import RegisterService from "../services/AuthServices/RegisterService"
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../contexts/FlashContext";
import React from "react";

type FormErrors = {
  email?: string;
  password?: string;
};

const RegistrationPage = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
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

    try {
        const user: ILogin = await RegisterService.post({email: email!, password: password!});

        if (user) {
          flash(`${email} has been successfully registered.`);
          navigate("/login");
          setFormErrors({})
        }
    } catch (error) {
        console.log("The user could not be registered.");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Registration Form</h2>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationPage;
