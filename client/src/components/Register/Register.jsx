import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import SignIn from "./SignIn/Signin";
import SignUp from "./SignUp/Signup";
import "./Register.scss";
const Register = () => {
  const [active, setActive] = useState(0);

  const comps = [
    { id: 0, component: <SignIn /> },
    { id: 1, component: <SignUp /> },
  ];

  return (
      <Box className="register">
        <Box className="registeration">
          <Box className="btnGrou">
            <Link
              to="/signin"
              onClick={() => setActive(0)}
              className="btnLeft"
            >
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
          <Box className="comp">{comps[active].component}</Box>
        </Box>
      </Box>
  );
};

export default Register;
