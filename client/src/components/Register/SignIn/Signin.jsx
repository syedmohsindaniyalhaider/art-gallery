import React, { useState } from "react";
import { useNavigate } from "react-router";
import SignInForm from "./SigninForm/SigninForm";
// import "./Signin.scss";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userExist, setUserExist] = useState(null);
  const navigate = useNavigate();
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        "https://blindit-c5213-default-rtdb.firebaseio.com/users.json";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Something went Wrong!");
      }
      const data = await res.json();
      const loadedUsers = [];
      for (const key in data) {
        loadedUsers.push({
          id: key,
          firstName: data[key]?.firstName,
          email: data[key]?.email,
          password: data[key]?.password,
          roles: data[key]?.roles,
        });
      }
      const matchUser = loadedUsers.filter(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      let exist = matchUser.length > 0 ? true : false;
      setUserExist(exist);
      if (exist) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <>
      <SignInForm
        error={error}
        loading={loading}
        userExist={userExist}
        loadUsers={loadUsers}
        setLoginEmail={setLoginEmail}
        setLoginPassword={setLoginPassword}
      />
    </>
  );
};

export default SignIn;
