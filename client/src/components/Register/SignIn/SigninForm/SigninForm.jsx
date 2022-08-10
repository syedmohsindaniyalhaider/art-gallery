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
        <label htmlFor="email">Email</label>
        <div className="mb">
          <input
            type="email"
            name="email"
            className="input"
            value={email}
            onChange={(e) => {
              emailChangeHandler(e);
              setLoginEmail(e.target.value);
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
              setLoginPassword(e.target.value);
            }}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <div>
              <small className="error">* Enter a valid password</small>
            </div>
          )}
          {loading && <div className="loader"></div>}
          <div className="w">
            <small>{error}</small>
          </div>
          {userExist !== null && !userExist && !loading && (
            <div>
              <small className="error">* Incorrect email or password</small>
            </div>
          )}
        </div>
        <button
          className={!formIsValid ? "disable" : "btn"}
          disabled={!formIsValid}
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default SignInForm;
