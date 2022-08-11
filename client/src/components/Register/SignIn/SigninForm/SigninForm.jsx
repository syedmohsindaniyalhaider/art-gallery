import { Button, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import useInput from "../../../../hooks/use-input";
import "./SigninForm.scss";
const SignInForm = ({
  loading,
  error,
  userExist,
  loadUsers,
  setLoginEmail,
  setLoginPassword,
}) => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    loadUsers();
    if (userExist) {
      resetEmail();
      resetPassword();
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <InputLabel sx={{ color: "#5f7d95", fontWeight: "bold" }}>
          Email
        </InputLabel>
        <OutlinedInput
          size="small"
          fullWidth
          error={emailHasError}
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            emailChangeHandler(e);
            setLoginEmail(e.target.value);
          }}
          onBlur={emailBlurHandler}
          sx={{ mb: "20px", py: "5px" }}
        />
        <InputLabel sx={{ color: "#5f7d95", fontWeight: "bold" }}>
          Password
        </InputLabel>
        <OutlinedInput
          size="small"
          sx={{ py: "5px"}}
          fullWidth
          error={passwordHasError}
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            passwordChangeHandler(e);
            setLoginPassword(e.target.value);
          }}
          onBlur={passwordBlurHandler}
        />
        {loading && <div className="loader"></div>}
        <div className="w">
          <small>{error}</small>
        </div>
        {userExist !== null && !userExist && !loading && (
          <div>
            <small className="error">* Incorrect email or password</small>
          </div>
        )}
        <Button
          size="small"
          fullWidth
          disableRipple
          sx={{
            py: "15px",
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
          className={!formIsValid ? "disable" : ""}
          disabled={!formIsValid}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
