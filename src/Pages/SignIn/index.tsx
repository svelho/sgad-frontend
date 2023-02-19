import "./styles.css";
import LogoGoogle from "../../assets/google-logo.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useState } from "react";

function SignIn() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  function makeLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        setName(user.displayName || "");
        setProfileImage(user.photoURL || "");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="sign-in">
      <button onClick={makeLogin}>
        <img src={LogoGoogle} alt="logo" />
        <span>Login com Google</span>
      </button>
      <div className="user-info">
        <h1>{name}</h1>
        <img src={profileImage} alt="profile" />
      </div>
    </div>
  );
}

export default SignIn;
