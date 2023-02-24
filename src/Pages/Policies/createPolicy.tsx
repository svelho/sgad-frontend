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

export default function CreatePolicy() {
  const [level, setLevel] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

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
        />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          placeholder="Escreva aqui a descrição completa da política ambiental"
          style={{ flex: 1 }}
        />
        <InputLabel id="demo-simple-select-label">
          Nível de Importância
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="Nível de Importância"
          onChange={handleChange}
        >
          <MenuItem value={25}>Necessário</MenuItem>
          <MenuItem value={50}>Relevante</MenuItem>
          <MenuItem value={75}>Muito Relevante</MenuItem>
          <MenuItem value={100}>Imprescindível</MenuItem>
        </Select>

        <Button variant="outlined">Salvar</Button>
      </Stack>
    </Box>
  );
}
