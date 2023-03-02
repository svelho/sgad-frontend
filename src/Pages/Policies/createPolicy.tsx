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
import "./createPolicy.css";
import { minWidth } from "@mui/system";
import { UseAxiosGet, UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import { useState } from "react";
import Loading from "../../Components/loading/loading";

export default function CreatePolicy() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1100;
  const [_color, set_color] = React.useState("gray");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [level, setLevel] = useState(0);
  let obj: any;
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

  const createPolicy = () => {
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
      `${process.env.REACT_APP_BACKEND}/v1/policy/create`,
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
        alert("Erro ao tentar cadastrar política");
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
            id="standard-basic"
            label="Título da Política"
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Escreva aqui a descrição completa da política ambiental"
            style={{ flex: 1, width: width > breakpoint ? 800 : 230 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Nível de Importância
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level.toString()}
            label="Nível de Importância"
            onChange={handleChange}
            onFocus={changeLabel}
            onBlur={changeLabelBlur}
          >
            <MenuItem value={25}>Necessário</MenuItem>
            <MenuItem value={50}>Relevante</MenuItem>
            <MenuItem value={75}>Muito Relevante</MenuItem>
            <MenuItem value={100}>Imprescindível</MenuItem>
          </Select>

          <Button variant="outlined" onClick={createPolicy}>
            Salvar
          </Button>
        </Stack>
      </Box>
    );
}
