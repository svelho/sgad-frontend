import "bootstrap/dist/css/bootstrap.min.css";
import GoogleSync from "../autosync/googlesync";
import "./auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../services/firebase";
import Credentials from "../../models/credentials";
import { useNavigate } from "react-router-dom";

function Auth() {
  let [authMode, setAuthMode] = useState("signin");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const cleanFields = () => {
    setEmail("");
    setPassword("");
  };

  const navigate = useNavigate();

  const createNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user as any;
        //console.log("usuário cadastrado", userCredential);
        //console.log("usuário", userCredential.user);
        const cred = new Credentials();
        cred.name = "Saulo Velho";
        cred.email = user.email ?? "";
        cred.token = user.accessToken ?? "";
        cred.refreshToken = user.stsTokenManager.refreshToken;
        cred.expirationTime = user.stsTokenManager.expirationTime;
        cred.photoUrl = user.photoURL ?? "";
        cred.uid = user.uid;

        localStorage.setItem("credentials", JSON.stringify(cred));
        cleanFields();
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user as any;
        const cred = new Credentials();
        cred.name = "Saulo Velho";
        cred.email = user.email ?? "";
        cred.token = user.accessToken ?? "";
        cred.refreshToken = user.stsTokenManager.refreshToken;
        cred.expirationTime = user.stsTokenManager.expirationTime;
        cred.photoUrl = user.photoURL ?? "";
        cred.uid = user.uid;

        localStorage.setItem("credentials", JSON.stringify(cred));
        cleanFields();
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form
          className="Auth-form"
          onSubmit={(e) => {
            loginUser();
            e.preventDefault();
          }}
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Novo usuário?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Criar Conta
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Esqueceu a <a href="#">senha?</a>
            </p>
            <GoogleSync />
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <form
          className="Auth-form"
          onSubmit={(e) => {
            createNewUser();
            e.preventDefault();
          }}
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Criar Conta</h3>
            <div className="text-center">
              Já tem conta?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Login
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Nome Completo</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Criar
              </button>
            </div>
            <p className="text-center mt-2">
              Esquece sua <a href="#">senha?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
