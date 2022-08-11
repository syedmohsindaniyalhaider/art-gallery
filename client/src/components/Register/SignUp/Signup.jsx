import React, { useState } from "react";
import SignUpForm from "./SignupForm/SignupForm";
import "./Signup.scss";
const SignUp = () => {
  const [userAdd, setUserAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [signUpEmail, setSignUpEmail] = useState("");
  // const [signUpPassword, setSignUpPassword] = useState("");
  const [userAlreadyExist, setUserAlreadyExist] = useState(null);
  const addUser = async (userDetails) => {
    console.log(userDetails);
    setLoading(true);
    setError(null);
    try {
      await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (e) {
      setError(e.message);
    }
    setUserAdd(true);
    setLoading(false);
  };
  return (
    <>
      <SignUpForm
        userAlreadyExist={userAlreadyExist}
        addUser={addUser}
        // setSignUpEmail={setSignUpEmail}
        // setSignUpPassword={setSignUpPassword}
      />
      {loading && <div className="loader"></div>}
      {error && !loading && <div className="error">{error}</div>}
      {userAlreadyExist && !userAdd && !loading && (
        <div className="error">* User Already Exist</div>
      )}
      {userAdd && !loading && (
        <small className="success">User Added Successfully!</small>
      )}
    </>
  );
};

export default SignUp;
