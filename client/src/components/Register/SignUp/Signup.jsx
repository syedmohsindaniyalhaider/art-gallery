import { useState, useEffect } from "react";
import SignUpForm from "./SignupForm/SignupForm";
import "./Signup.scss";
import { Box } from "@mui/system";
const SignUp = () => {
  const [userAdd, setUserAdd] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    if (userAdd || error || message) {
      setTimeout(() => {
        setUserAdd(false);
        setError(null);
        setMessage("");
      }, 2000);
    }
  }, [userAdd, error, message]);

  return (
    <>
      <SignUpForm addUser={addUser} />
      {error && (
        <Box sx={{ mt: "20px", color: "red", fontWeight: "bold" }}>{error}</Box>
      )}
      {message && (
        <Box sx={{ mt: "20px", color: "#496BD6", fontWeight: "bold" }}>
          {message}
        </Box>
      )}
      {userAdd && !message && !error && (
        <Box sx={{ mt: "20px", color: "green", fontWeight: "bold" }}>
          User added successfully
        </Box>
      )}
    </>
  );
};

export default SignUp;
