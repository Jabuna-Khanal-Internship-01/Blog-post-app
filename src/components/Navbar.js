import React from "react";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { GoogleLogout, GoogleLogin } from "react-google-login";

const NavBar = () => {
  const [inputValue, setInputValue] = useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const logout = (res) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const login = (res) => {
    console.log(res, "-----");
    dispatch(setSignedIn(true));
    dispatch(setUserData(res.profileObj));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="nav-header">Blog post </h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="search-btn" onClick={handleClick}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="user-data">
          <Avatar
            className="profile-img"
            src={userData?.imageUrl}
            alt={userData?.givenName}
          />
          <span className="signedIn">{userData?.name}</span>
          <GoogleLogout
            clientId="462975936573-kg2l3a95alo3c6mepf4odhmi8342ghgj.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout-btn"
              >
                Logout
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <>
          <div className="blog__search">
            <input
              className="search"
              placeholder="Search for a blog"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="search-btn" onClick={handleClick}>
              Search
            </button>
          </div>
          <div className="user-data">
            <GoogleLogin
              clientId="462975936573-kg2l3a95alo3c6mepf4odhmi8342ghgj.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="login-btn"
                >
                  Login/Signin with google
                </button>
              )}
              onSuccess={login}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
