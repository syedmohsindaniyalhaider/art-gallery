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
function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  return (
    <Routes>
      <Route path="/" exact element={<Register />}>
        <Route exact path="signin" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
      </Route>
      <Route exact element={<Main />}>
        <Route exact path="home" element={<Home />} />
        <Route exact path="collections" element={<Collections />} />
        <Route exact path="discover" element={<Discover />} />
        <Route exact path="about" element={<About />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
