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
import { UseAxiosPost } from "../../hooks/axios";
import GetHeader from "../../shared/localStorage";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Maximize } from "@mui/icons-material";
import Alert from "react-bootstrap/esm/Alert";

function Auth() {
  let [authMode, setAuthMode] = useState("signin");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [position, setPosition] = useState("");
  let [area, setArea] = useState("");
  let [userNotFound, setUserNotFound] = useState(false);
  let [wrongPassword, setWrongPassword] = useState(false);

  const changeAuthMode = (mode: string) => {
    cleanFields();
    //setAuthMode(authMode === "signin" ? "signup" : "signin");
    setAuthMode(mode);
  };

  const cleanFields = () => {
    setEmail("");
    setPassword("");
    setUserNotFound(false);
    setWrongPassword(false);
    setName("");
    setPhone("");
    setPosition("");
    setArea("");
  };

  const navigate = useNavigate();

  const createNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user as any;
        const cred = new Credentials();
        cred.email = user.email ?? "";
        cred.token = user.accessToken ?? "";
        cred.refreshToken = user.stsTokenManager.refreshToken;
        cred.expirationTime = user.stsTokenManager.expirationTime;
        cred.photoUrl = user.photoURL ?? "";
        cred.uid = user.uid;

        const headers = GetHeader();

        const payload = {
          name: name,
          email: user.email,
          phone: phone,
          position: position,
          area: area,
          photoUrl: user.photoURL ?? "",
          uid: user.uid,
        };

        UseAxiosPost(
          `${process.env.REACT_APP_BACKEND}/v1/user/create`,
          payload,
          headers
        ).then(async (data) => {
          cred.onboarding = true;
          await localStorage.setItem("credentials", JSON.stringify(cred));

          cleanFields();
          navigate("/home");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const loginUser = () => {
    setUserNotFound(false);
    setWrongPassword(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user as any;
        const cred = new Credentials();
        cred.email = user.email ?? "";
        cred.token = user.accessToken ?? "";
        cred.refreshToken = user.stsTokenManager.refreshToken;
        cred.expirationTime = user.stsTokenManager.expirationTime;
        cred.photoUrl = user.photoURL ?? "";
        cred.uid = user.uid;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (String(errorCode).includes("user-not-found")) {
          setUserNotFound(true);
        }
        if (String(errorCode).includes("wrong-password")) {
          setWrongPassword(true);
        }
        console.log(errorMessage);
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
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Novo usuário?{" "}
              <span
                className="link-primary"
                onClick={() => changeAuthMode("signup")}
              >
                Criar Conta
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                required
                id="email"
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div hidden={!userNotFound} className="validationError">
                Usuário não encontrado.
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                required
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div hidden={!wrongPassword} className="validationError">
                Senha incorreta.
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            <p className="text-center mt-2">
              Esqueceu sua{" "}
              <span
                className="link-primary"
                onClick={() => changeAuthMode("forgot")}
              >
                senha?
              </span>
            </p>
            <GoogleSync />
          </div>
        </form>
      </div>
    );
  } else if (authMode === "signup") {
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
              <span
                className="link-primary"
                onClick={() => changeAuthMode("signin")}
              >
                Login
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Nome Completo</label>
              <input
                required
                type="text"
                className="form-control mt-1"
                placeholder="Nome Completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                required
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
                required
                id="password"
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Telefone</label>
              <input
                required
                type="text"
                className="form-control mt-1"
                placeholder="Telefone pra contato"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Cargo</label>
              <input
                required
                type="text"
                className="form-control mt-1"
                placeholder="Cargo"
                value={position}
                onChange={(event) => setPosition(event.target.value)}
              />
            </div>
            <label>Area</label>
            <Select
              required
              className="form-group mt-3"
              value={area}
              label="Area"
              onChange={(event) => setArea(event.target.value)}
              sx={{ width: 300 }}
              //onFocus={changeLabel}
              //onBlur={changeLabelBlur}
            >
              <MenuItem value={"Gestao Ambiental"}>Gestão Ambiental</MenuItem>
              <MenuItem value={"Financeiro"}>Financeiro</MenuItem>
              <MenuItem value={"TI"}>TI</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
            </Select>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Criar
              </button>
            </div>
            <p className="text-center mt-2">
              Esqueceu sua{" "}
              <span
                className="link-primary"
                onClick={() => changeAuthMode("forgot")}
              >
                senha?
              </span>
            </p>
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
            <h3 className="Auth-form-title">Recuperar Senha</h3>

            <div className="form-group mt-3">
              <label>Informe seu e-mail de cadastro.</label>
              <input
                required
                type="email"
                className="form-control mt-1"
                placeholder="E-mail"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  alert("E-mail enviado com sucesso");
                  changeAuthMode("signin");
                }}
              >
                Enviar
              </button>
            </div>
            <br />
            <span
              className="link-primary"
              onClick={() => changeAuthMode("signin")}
            >
              Voltar para Login.
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
