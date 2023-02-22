import "./googlesync.css";
import LogoGoogle from "../../../assets/google-logo.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../../services/firebase";
import Credentials from "../../../models/credentials";
import { useNavigate } from "react-router-dom";

function GoogleSync() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  const navigate = useNavigate();

  function makeLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;

        const cred = new Credentials();
        cred.name = user.displayName ?? "";
        cred.email = user.email ?? "";
        cred.token = credential?.accessToken;
        cred.refreshToken = credential?.idToken;
        cred.expirationTime = 60000;
        cred.photoUrl = user.photoURL ?? "";
        cred.uid = user.uid;
        localStorage.setItem("credentials", JSON.stringify(cred));

        navigate("/home");
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);

        console.log("Something went wrong with sign up: ", error);
      });
  }

  return (
    <div className="googlesync-in">
      <button onClick={makeLogin}>
        <img src={LogoGoogle} alt="logo" />
        <span>Login com Google</span>
      </button>
    </div>
  );
}

export default GoogleSync;
