import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useFlash } from "../contexts/FlashProvider";
import { useAPI } from "../contexts/APIProvider";

const validateEmail = (email) => {
  // Regular expression pattern for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const RegistrationPage = () => {
  const [formErrors, setFormErrors] = useState({});
  const emailField = useRef();
  const passwordField = useRef();
  const API = useAPI();
  const navigate = useNavigate();
  const flash = useFlash();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const submitHandler = async (event) => {
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

    try {
      const response = await API.post("/accounts/users/", { email, password });
      console.log(response);
      if (response.status === 201) {
        flash("User has been created.");
        navigate("/login");
      }
    } catch (error) {
      flash("User could not be created", "danger");
    }
  };

  return (
    <form onSubmit={submitHandler}>
        <h2>Registration Form</h2>
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

export default RegistrationPage;
