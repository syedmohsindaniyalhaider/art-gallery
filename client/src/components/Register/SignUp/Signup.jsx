import React, { useState } from "react";
import SignUpForm from "./SignupForm/SignupForm";
import "./Signup.scss";
const SignUp = () => {
  const [userAdd, setUserAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [userAlreadyExist, setUserAlreadyExist] = useState(null);
  const addUser = async (userDetails) => {
    setLoading(true);
    setError(null);
    try {
      await fetch(
        "https://blindit-c5213-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    } catch (e) {
      setError(e.message);
    }
    setUserAdd(true);
    setLoading(false);
  };
  const checkUser = async (user) => {
    setUserAlreadyExist(false);
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
        (user) => user.email === signUpEmail && user.password === signUpPassword
      );

      const boolUserMatch = matchUser.length === 1 ? true : false;
      if (boolUserMatch) {
        setUserAlreadyExist(true);
        setLoading(false);
        setUserAdd(false);

        return;
      }
      addUser(user);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <>
      <SignUpForm
        userAlreadyExist={userAlreadyExist}
        checkUser={checkUser}
        setSignUpEmail={setSignUpEmail}
        setSignUpPassword={setSignUpPassword}
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
