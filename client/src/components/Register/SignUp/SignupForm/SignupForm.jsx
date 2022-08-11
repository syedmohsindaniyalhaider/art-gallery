import { Button, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import useInput from "../../../../hooks/use-input";
import "./SignupForm.scss";
const SignUpForm = ({
  addUser,
  userAlreadyExist,
  setSignUpEmail,
  setSignUpPassword,
}) => {
  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.trim().includes("@"));
  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "");
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value.trim() !== "");

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;

  let passwordMatch = password === confirmPassword;

  let userDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addUser(userDetails);
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
          htmlFor="firstname"
        >
          First Name
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ mb: "15px", py: "3px" }}
          type="firstname"
          name="firstname"
          value={firstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          error={firstNameHasError}
        />
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
          htmlFor="lastname"
        >
          Last Name
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ mb: "15px", py: "3px" }}
          type="lastname"
          name="lastname"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          error={lastNameHasError}
        />
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
          htmlFor="email"
        >
          Email
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ mb: "15px", py: "3px" }}
          type="email"
          name="email"
          className="input"
          value={email}
          onChange={(e) => {
            emailChangeHandler(e);
            setSignUpEmail(e.target.value);
          }}
          onBlur={emailBlurHandler}
          error={emailHasError}
        />
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
          htmlFor="password"
        >
          Password
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ mb: "15px", py: "3px" }}
          type="password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => {
            passwordChangeHandler(e);
            setSignUpPassword(e.target.value);
          }}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
        />
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
          htmlFor="confirmpassword"
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ py: "3px" }}
          type="password"
          name="confirmpassword"
          className="input"
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={!passwordMatch}
        />
        {/* {!passwordMatch && (
          <small className="error">Password does not match</small>
        )} */}
        <Button
          type="submit"
          size="small"
          fullWidth
          disableRipple
          sx={{
            py: "12px",
            mt: "20px",
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "#496BD6",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#496BD6",
              boxShadow: "none",
            },
          }}
          variant="contained"
          disabled={!formIsValid || !passwordMatch}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
