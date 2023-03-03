import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, TextareaAutosize } from "@material-ui/core";
import DatePicker from "react-date-picker";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import MultiSelectUnstyled, {
  MultiSelectUnstyledProps,
} from "@mui/base/MultiSelectUnstyled";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import "./createPlanning.css";
import { minWidth } from "@mui/system";
import { UseAxiosGet, UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import { useState } from "react";
import Loading from "../../Components/loading/loading";
import Activities from "../activities/activities";

export default function CreatePlanning() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1100;
  const [_color, set_color] = React.useState("green");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [level, setLevel] = useState(0);
  let obj: any;
  let [success, setSuccess] = useState(true);
  const [dateValue, setDateValue] = useState(new Date());
  let [riskActivityField, setRiskActivityField] = useState(true);
  let [policiesField, setPoliciesField] = useState(true);
  let [stakeholdersField, setStakeholdersField] = useState(true);

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

  const green = {
    100: "#aaecaa",
    200: "#81ec8d",
    400: "#94ec91",
    500: "#86ec84",
    600: "#4dec55",
    900: "#34ec2c",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };
  const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? green[900] : green[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? green[900] : green[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
  );

  const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
  `;

  const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
    props: MultiSelectUnstyledProps<number>,
    ref: React.ForwardedRef<any>
  ) {
    const slots: MultiSelectUnstyledProps<number>["slots"] = {
      root: StyledButton,
      listbox: StyledListbox,
      popper: StyledPopper,
      ...props.slots,
    };

    return <MultiSelectUnstyled {...props} ref={ref} slots={slots} />;
  });

  const StyledButton = styled("button")(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      border-color: ${green[400]};
      outline: 3px solid ${
        theme.palette.mode === "dark" ? green[500] : green[200]
      };
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
  );

  const StyledListbox = styled("ul")(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
  );

  if (!success) return <Loading />;
  else
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => {
          //createActivity();
          e.preventDefault();
        }}
      >
        <Stack spacing={3} direction="column">
          <TextField
            required
            id="standard-basic"
            label="Nome do Plano de Ação"
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <InputLabel sx={{ color: "green" }}>
            Selecione a atividade de risco abordada por esse planejamento.
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
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
          <div hidden={!riskActivityField} className="validationError">
            Por favor selecione um nível de risco.
          </div>
          <TextField
            required
            id="standard-basic"
            label="Objetivo"
            //variant=""
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 1"
            //variant=""
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 2"
            //variant=""
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 3"
            //variant=""
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Adicione as políticas ambientais ao planejamento.
          </InputLabel>
          <CustomMultiSelect defaultValue={[10, 20]}>
            <StyledOption value={10}>Ten</StyledOption>
            <StyledOption value={20}>Twenty</StyledOption>
            <StyledOption value={30}>Thirty</StyledOption>
            <StyledOption value={40}>Forty</StyledOption>
            <StyledOption value={50}>Fifty</StyledOption>
          </CustomMultiSelect>
          <div hidden={!policiesField} className="validationError">
            Por favor selecione um nível de risco.
          </div>
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Selecione os stakeholders responsáveis pela execução do
            planejamento.
          </InputLabel>
          <CustomMultiSelect defaultValue={[10, 20]}>
            <StyledOption value={10}>Ten</StyledOption>
            <StyledOption value={20}>Twenty</StyledOption>
            <StyledOption value={30}>Thirty</StyledOption>
            <StyledOption value={40}>Forty</StyledOption>
            <StyledOption value={50}>Fifty</StyledOption>
          </CustomMultiSelect>
          <div hidden={!stakeholdersField} className="validationError">
            Por favor selecione um nível de risco.
          </div>
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Selecione a data de Início do Plano
          </InputLabel>
          <DatePicker onChange={setDateValue} value={dateValue} />
          <Button variant="outlined" type="submit">
            Salvar
          </Button>
        </Stack>
      </Box>
    );
}
