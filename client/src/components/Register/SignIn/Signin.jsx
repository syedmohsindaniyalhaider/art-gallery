import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SignInForm from "./SigninForm/SigninForm";
// import "./Signin.scss";
const SignIn = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const getUser = async (user) => {
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.message === "loggedIn") {
        // console.log(data);
        localStorage.setItem("loggedIn", JSON.stringify(data));
        navigate("/home", { replace: true });
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        setError(null);
        setMessage("");
      }, 2000);
    }
  }, [error, message]);
  return (
    <>
      <SignInForm getUser={getUser} />
      {error && (
        <Box sx={{ mt: "20px", color: "red", fontWeight: "bold" }}>{error}</Box>
      )}
      {message && !error && (
        <Box sx={{ mt: "20px", color: "#496BD6", fontWeight: "bold" }}>
          {message}
        </Box>
      )}
    </>
  );
};

export default SignIn;
