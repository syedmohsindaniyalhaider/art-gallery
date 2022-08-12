import React, { useState } from "react";
import SignUpForm from "./SignupForm/SignupForm";
import "./Signup.scss";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
const SignUp = () => {
  const [userAdd, setUserAdd] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  // const [signUpEmail, setSignUpEmail] = useState("");
  // const [signUpPassword, setSignUpPassword] = useState("");
  const addUser = async (userDetails) => {
    console.log(userDetails);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (e) {
      setError(e.message);
    }
    setUserAdd(true);
  };
  return (
    <>
      <SignUpForm
        setMessage={setMessage}
        addUser={addUser}
        // setSignUpEmail={setSignUpEmail}
        // setSignUpPassword={setSignUpPassword}
      />
      {error && <Box sx={{ color: "red" }}>{error}</Box>}
      {message && (
        <Box sx={{ mt: "20px", color: "#496BD6", fontWeight: "bold" }}>
          {message}
        </Box>
      )}
    </>
  );
};

export default SignUp;
