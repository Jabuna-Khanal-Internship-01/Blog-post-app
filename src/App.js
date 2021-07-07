import React from "react";
import Homepage from "./components/HomePage";
import "./App.css";
import Details from "./components/Details";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path={"/"} component={Homepage} exact/>
          <Route path={"/details"} component={Details} exact/>
          <Route path ={"/createpost"} component={CreateBlog} exact />
          <Route path ={"/profile"} component={Profile} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
