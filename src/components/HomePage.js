import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

const Homepage = () => {
  const dispatch = useDispatch();

  const login = (res) => {
    console.log(res, "-----");
    dispatch(setSignedIn(true));
    dispatch(setUserData(res.profileObj));
  };
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="home-page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <GoogleLogin
          clientId="462975936573-kg2l3a95alo3c6mepf4odhmi8342ghgj.apps.googleusercontent.com"
          render={(renderProps) => (
            <button 
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className = "login-btn"
            >
                Login/Signin with google
            </button>
          )}
          onSuccess={login}
          onFailure={login}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Homepage;
