import React from "react";
import useInput from "../../../../hooks/use-input";
import "./SignupForm.scss";
const SignUpForm = ({
  checkUser,
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
    checkUser(userDetails);
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstname">First Name</label>
        <div className="mb">
          <input
            type="firstname"
            name="firstname"
            className="input"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <div>
              <small className="error">* Enter a valid first name</small>
            </div>
          )}
        </div>
        <label htmlFor="lastname">Last Name</label>
        <div className="mb">
          <input
            type="lastname"
            name="lastname"
            className="input"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <div>
              <small className="error">* Enter a valid last name</small>
            </div>
          )}
        </div>
        <label htmlFor="email">Email</label>
        <div className="mb">
          <input
            type="email"
            name="email"
            className="input"
            value={email}
            onChange={(e) => {
              emailChangeHandler(e);
              setSignUpEmail(e.target.value);
            }}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <div>
              <small className="error">* Enter a valid email</small>
            </div>
          )}
        </div>
        <label htmlFor="password">Password</label>
        <div className="mb">
          <input
            type="password"
            name="password"
            className="input"
            value={password}
            onChange={(e) => {
              passwordChangeHandler(e);
              setSignUpPassword(e.target.value);
            }}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <div>
              <small className="error">* Enter a valid password</small>
            </div>
          )}
        </div>
        <label htmlFor="confirmpassword">Confirm Password</label>
        <div className="mb">
          <input
            type="password"
            name="confirmpassword"
            className="input"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
          />
        </div>
        {!passwordMatch && (
          <small className="error">Password does not match</small>
        )}
        <button
          className={!formIsValid || !passwordMatch ? "disable" : "btn"}
          disabled={!formIsValid || !passwordMatch}
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
