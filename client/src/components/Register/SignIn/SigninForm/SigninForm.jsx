import { Button, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import useInput from "../../../../hooks/use-input";
import "./SigninForm.scss";
const SignInForm = ({ getUser }) => {
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

  let formIsValid = emailIsValid && passwordIsValid;

  const user = {
    email,
    password,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getUser(user);
    resetEmail();
    resetPassword();
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
        >
          Email
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          sx={{ mb: "20px", py: "3px" }}
          error={emailHasError}
          type="email"
          name="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <InputLabel
          sx={{ color: "#5f7d95", fontSize: "14px", fontWeight: "bold" }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          size="small"
          sx={{ py: "3px" }}
          fullWidth
          error={passwordHasError}
          type="password"
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
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
          disabled={!formIsValid}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
