import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import GetHeader from "../../shared/localStorage";

function Onboarding() {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [position, setPosition] = useState("");
  let [area, setArea] = useState("");

  function createNewUser() {
    const headers = GetHeader();
    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;

    if (credential.onboarding) navigate("/home");

    const payload = {
      name: name,
      email: credential.email,
      phone: phone,
      position: position,
      area: area,
      photoUrl: credential.photoUrl ?? "",
      uid: credential.uid,
    };

    UseAxiosPost(
      `${process.env.REACT_APP_BACKEND}/user/create`,
      payload,
      headers
    )
      .then(async (data) => {
        credential.onboarding = true;
        await localStorage.setItem("credentials", JSON.stringify(credential));
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <div className="Auth-form-container" style={{ marginTop: 100 }}>
      <form
        className="Auth-form"
        onSubmit={(e) => {
          createNewUser();
          e.preventDefault();
        }}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Criar Conta</h3>
          <div className="form-group mt-3">
            <div className="text-center">Por favor finalize o cadastro</div>
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
        </div>
      </form>
    </div>
  );
}

export default Onboarding;
