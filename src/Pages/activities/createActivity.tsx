import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, TextareaAutosize } from "@material-ui/core";
import {
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

export default function CreateActivity() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1100;
  const [_color, set_color] = React.useState("gray");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [level, setLevel] = useState(0);
  let [success, setSuccess] = useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(parseInt(event.target.value));
  };

  const changeLabel = () => {
    set_color("#4caf50");
  };
  const changeLabelBlur = () => {
    set_color("gray");
  };

  const createActivity = () => {
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
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} direction="column">
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

          <Button variant="outlined" onClick={createActivity}>
            Salvar
          </Button>
        </Stack>
      </Box>
    );
}
