import React from "react";
import { useGoogleLogin } from "react-google-login";

import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "462975936573-kg2l3a95alo3c6mepf4odhmi8342ghgj.apps.googleusercontent.com";

function LoginHooks() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => console.log("Login failed: res:", res);

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">LogIn/Sign up with Google</span>
    </button>
  );
}

export default LoginHooks;
