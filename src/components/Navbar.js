import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  selectUserId,
  setUserData,
  setUserId,
  setBlogData,
} from "../features/userSlice";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import * as BlogServices from "../service/api";
import { removeToken, setToken, getToken } from "../utils/Token";
import * as localStorageData from "../utils/userData";

const NavBar = () => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const isSignedIn = useSelector(selectSignedIn);
  const [isCreateBlog, setCreateBlog] = useState(false);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [inputTitle, setTitle] = useState("");
  const [inputDes, setDes] = useState("");
  const userId = localStorageData.getUserId();

  const postBlog = (e) => {
    e.preventDefault();
    setTitle(inputTitle);
    setDes(inputDes);

    const post = {
      title: inputTitle,
      description: inputDes,
      users: { _id: userId },
    };
    BlogServices.createPost(post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelBlogPost = (e) => {
    e.preventDefault();
    setTitle("");
    setDes("");
    setCreateBlog(false);
  };

  const token = getToken();
  if (token !== null) {
    dispatch(setSignedIn(true));
  }

  const logout = (res) => {
    removeToken();
    localStorageData.removeUserId();
    localStorageData.removeUserName();
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
    localStorageData.removeUserName();
  };

  const login = (res) => {
    console.log(res, "response");
    dispatch(setSignedIn(true));
    dispatch(setUserData(res.profileObj));

    BlogServices.logIn({ token: res.tokenId })
      .then((res) => {
        console.log(res);
        const id = res.data.data.accessToken;
        setToken(id);
        localStorageData.setUserName(res.data.data.name);
        localStorageData.userId(res.data.data.id);
        dispatch(setUserId(res.data.data.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };
  const createBlog = () => {
    setCreateBlog(true);
  };

  return (
    <div className="navbar">
      <h1 className="nav-header">BLOG POST</h1>
      {isSignedIn && (
        <>
          <button className="create-blog-btn" onClick={createBlog}>
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
          <span className="signedIn">
            {localStorageData.getUserName() || userData?.name}
          </span>
          <GoogleLogout
            clientId="1058823769266-758kalf90cmirensqppf8qt6rfebpvjs.apps.googleusercontent.com"
            render={(renderProps) => (
              <span
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout-btn"
              >
                Logout
              </span>
            )}
            onLogoutSuccess={logout}
          />
          <span
            className="profile-btn"
            onClick={() => {
              history.push({
                pathname: "/profile",
              });
            }}
          >
            Profile
          </span>
          {isCreateBlog && (
            <div className="addBlog">
              <input
                className="addedBlog"
                value={inputTitle}
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <input
                className="addedDes"
                value={inputDes}
                placeholder="Enter description of Blog"
                onChange={(e) => setDes(e.target.value)}
              ></input>
              <button className="save-btn" onClick={postBlog}>
                Save
              </button>
              <button className="cancel-btn" onClick={cancelBlogPost}>
                cancel
              </button>
            </div>
          )}
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
