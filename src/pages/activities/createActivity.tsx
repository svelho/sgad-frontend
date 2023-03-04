import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, TextareaAutosize } from "@material-ui/core";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import "./createActivity.css";
import { UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import { useState } from "react";
import Loading from "../../Components/loading/loading";
import { RiskClassification } from "../../enum/riskClassification";

export default function CreateActivity() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1100;
  const [_color, set_color] = React.useState("gray");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [level, setLevel] = useState(0);
  let [success, setSuccess] = useState(true);
  let [riskField, setRiskField] = useState(false);
  let [classificationField, setClassificationField] = useState(false);
  let [classification, setClassification] = useState("");

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(parseInt(event.target.value));
    setRiskField(false);
  };

  const handleChangeRiskClassification = (event: SelectChangeEvent) => {
    setClassification(event.target.value.toString());
    setClassificationField(false);
  };

  const changeLabel = () => {
    set_color("#4caf50");
  };
  const changeLabelBlur = () => {
    set_color("gray");
  };

  const createActivity = () => {
    if (level === 0) {
      setRiskField(true);
      return false;
    } else if (level > 0) setRiskField(false);

    if (classification === "") {
      setClassificationField(true);
      return false;
    } else setClassificationField(false);

    setSuccess(false);
    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;

    const headers = {
      Authorization: `Bearer ${credential.token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const payload = {
      title: title,
      description: description,
      classification: classification,
      level: level,
    };

    const returned = UseAxiosPost(
      `${process.env.REACT_APP_BACKEND}/v1/activity/create`,
      payload,
      headers
    ).then((data) => {
      setSuccess(data);
      if (data) {
        setTitle("");
        setDescription("");
        setLevel(0);
        alert("Salvo com sucesso!");
      } else {
        alert("Erro ao tentar cadastrar atividade");
      }
    });
  };

  if (!success) return <Loading />;
  else
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => {
          createActivity();
          e.preventDefault();
        }}
      >
        <Stack spacing={3} direction="column">
          <TextField
            required
            id="standard-basic"
            label="Título da Atividade"
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextareaAutosize
            required
            aria-label="minimum height"
            minRows={10}
            placeholder="Escreva aqui a descrição completa da atividade de risco"
            style={{ flex: 1, width: width > breakpoint ? 800 : 230 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Classificação do Risco
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classification}
            label="Nível de Importância"
            onChange={handleChangeRiskClassification}
            onFocus={changeLabel}
            onBlur={changeLabelBlur}
          >
            <MenuItem value={"fisico"}>{RiskClassification.fisico}</MenuItem>
            <MenuItem value={"quimico"}>{RiskClassification.quimico}</MenuItem>
            <MenuItem value={"biologico"}>
              {RiskClassification.biologico}
            </MenuItem>
            <MenuItem value={"acidente"}>
              {RiskClassification.acidente}
            </MenuItem>
          </Select>
          <div hidden={!classificationField} className="validationError">
            Por favor selecione a classificação do risco.
          </div>
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Nível de Risco
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level.toString()}
            label="Nível de Importância"
            onChange={handleChange}
            onFocus={changeLabel}
            onBlur={changeLabelBlur}
          >
            <MenuItem value={50}>Básico</MenuItem>
            <MenuItem value={100}>Moderado</MenuItem>
            <MenuItem value={150}>Agressivo</MenuItem>
            <MenuItem value={200}>Muito Agressivo</MenuItem>
          </Select>
          <div hidden={!riskField} className="validationError">
            Por favor selecione um nível de risco.
          </div>

          <Button className="buttonSave" variant="outlined" type="submit">
            Salvar
          </Button>
        </Stack>
      </Box>
    );
}
