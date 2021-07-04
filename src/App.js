import React from "react";
import Homepage from "./components/HomePage";
import "./App.css";
import NavBar from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import { useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import Details from "./components/Details";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path={"/"} component={Homepage} exact/>
          <Route path={"/details"} component={Details} exact/>
        </Switch>]
      </BrowserRouter>
    </div>
  );
};

export default App;
