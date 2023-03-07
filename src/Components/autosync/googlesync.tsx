import "./googlesync.css";
import LogoGoogle from "../../assets/google-logo.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../services/firebase";
import Credentials from "../../models/credentials";
import { useNavigate } from "react-router-dom";
import GetHeader from "../../shared/localStorage";
import { UseAxiosGetWithParameter, UseAxiosPost } from "../../hooks/axios";

function GoogleSync() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  const navigate = useNavigate();

  function makeLogin() {
    signInWithPopup(auth, provider).then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential?.accessToken;
      const user = result.user as any;

      const cred = new Credentials();
      cred.name = user.displayName ?? "";
      cred.email = user.email ?? "";
      cred.token = user.accessToken;
      cred.refreshToken = user.stsTokenManager.refreshToken;
      cred.expirationTime = user.stsTokenManager.expirationTime;
      cred.photoUrl = user.photoURL ?? "";
      cred.uid = user.uid;
      await localStorage.setItem("credentials", JSON.stringify(cred));

      const headers = GetHeader(user.accessToken);

      //verify user
      const userReturned = await UseAxiosGetWithParameter(
        `${process.env.REACT_APP_BACKEND}/v1/user/${user.uid}`,
        headers
      );

      if ((userReturned as boolean) === false) {
        navigate("/");
        console.log("Erro ao consultar a base de clientes");
        alert("Erro ao consultar a base de clientes");
        return;
      }

      userReturned as Credentials;
      if (userReturned && userReturned.name) {
        cred.onboarding = true;
        await localStorage.setItem("credentials", JSON.stringify(cred));
        navigate("/home");
      } else {
        await localStorage.setItem("credentials", JSON.stringify(cred));
        navigate("/onboarding");
      }
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
