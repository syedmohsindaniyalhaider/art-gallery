import "./App.scss";
import Main from "./components/Layout/Main/Main";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/Pagenotfound/Pagenotfound";
import Collections from "./components/Collections/Collections";
import Discover from "./components/Discover/Discover";
import About from "./components/About/About";
import SignIn from "./components/Register/SignIn/Signin";
import SignUp from "./components/Register/SignUp/Signup";
import Profile from "./components/Profile/Profile";
import { useEffect, useState } from "react";
const App = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    console.log("app", user);
  }, [user]);

  // let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  return (
    <Routes>
      <Route path="/" exact element={<Register />}>
        <Route path="signin" element={<SignIn setUser={setUser} />} />
        <Route exact path="signup" element={<SignUp />} />
      </Route>
      {user?.message === "loggedIn" && (
        <Route path="/" element={<Main user={user} />}>
          <Route path="home" element={<Home />} />
          <Route
            exact
            path="collections"
            element={<Collections user={user} />}
          />
          <Route exact path="discover" element={<Discover />} />
          <Route exact path="about" element={<About />} />
          <Route exact path="profile" element={<Profile />} />
        </Route>
      )}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
