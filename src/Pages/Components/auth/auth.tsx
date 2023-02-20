import "bootstrap/dist/css/bootstrap.min.css";
import GoogleSync from "../autosync/googlesync";
import "./auth.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function Auth() {
  // const auth = getAuth();
  // function createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode == "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
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
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
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
        <form className="Auth-form">
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
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
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
