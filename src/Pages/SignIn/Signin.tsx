import "./styles.css";
import LogoGoogle from "../../assets/google-logo.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useState } from "react";
import Header from "../Components/header/header";
import GoogleSync from "../Components/autosync/googlesync";
import Auth from "../Components/auth/auth";

function SignIn() {
  return (
    <div>
      <Header />
      <Auth />
    </div>
  );
}

export default SignIn;
