import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import SignIn from "./SignIn/Signin";
import SignUp from "./SignUp/Signup";
import Bg from "../../assets/login.png";
import "./Register.scss";
const Register = () => {
  const [active, setActive] = useState(0);

  const comps = [
    { id: 0, component: <SignIn /> },
    { id: 1, component: <SignUp /> },
  ];

  return (
    <Box className="register" sx={{ display: "flex" }}>
      <Box sx={{ width: "70%" }}>
        <img src={Bg} className="bg-image" alt="bgImage" />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          width: "30%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mx: 10 }}>
          <Box className="btnGroup" sx={{ textAlign: "center" }}>
            <Link to="/signin" onClick={() => setActive(0)} className="btnLeft">
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setActive(1)}
              className="btnRight"
            >
              Sign Up
            </Link>
          </Box>
          <Box>{comps[active].component}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
