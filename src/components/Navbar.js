import React, {useState } from "react";
import {useHistory} from 'react-router-dom'
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
  setUserId,
} from "../features/userSlice";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import * as BlogServices from "../service/api";
import CreateBlog from "./CreateBlog";

const NavBar = () => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const [tokenId, setTokenId] = useState("");

  const dispatch = useDispatch();
  dispatch(setUserId(tokenId));

  const logout = (res) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
    setTokenId("");
  };

  const login = (res) => {
    console.log(res, "----");
    dispatch(setSignedIn(true));
    dispatch(setUserData(res.profileObj));

    BlogServices.logIn({ token: res.tokenId })
      .then((res) => {
        setTokenId(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };



  return (
    <div className="navbar">
      <h1 className="nav-header">BLOG POST</h1>
      {isSignedIn && (
        <>
          <button className="create-blog-btn" onClick={()=>{ history.push({
          pathname:'/createpost'})}} >
            Create a blog
          </button>

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
        </>
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
            clientId="1058823769266-758kalf90cmirensqppf8qt6rfebpvjs.apps.googleusercontent.com"
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
              clientId="1058823769266-758kalf90cmirensqppf8qt6rfebpvjs.apps.googleusercontent.com"
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
