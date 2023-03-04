import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
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
import { UseAxiosGetWithParameter, UseAxiosPost } from "../../hooks/axios";
import Credentials from "../../models/credentials";
import { useEffect, useState } from "react";
import Loading from "../../Components/loading/loading";
import Activity from "../../models/activity";
import Policy from "../../models/policy";

export default function CreatePlanning() {
  //#region properties
  const [_color, set_color] = React.useState("green");
  let [name, setName] = useState("");
  let [activity, setActivity] = useState({} as Activity);
  let [objective, setObjective] = useState("");
  let [goal1, setGoal1] = useState("");
  let [goal2, setGoal2] = useState("");
  let [goal3, setGoal3] = useState("");
  let [selectedPolicies, setSelectedPolicies] = useState([] as Policy[]);
  let [selectedStakeholders, setSelectedStakeholders] = useState(
    [] as Credentials[]
  );
  let [success, setSuccess] = useState(true);
  const [dateValue, setDateValue] = useState(new Date());
  let [policiesField, setPoliciesField] = useState(false);
  let [stakeholdersField, setStakeholdersField] = useState(false);
  let [activities, setActivities] = useState([] as Activity[]);
  let [policies, setPolicies] = useState([] as Policy[]);
  let [stakeholders, setStakeholders] = useState([] as Credentials[]);
  let [numbersStake, setNumbersStake] = useState([] as number[]);
  let [numbersPoli, setNumbersPoli] = useState([] as number[]);

  console.log(activity.id);
  //#endregion

  //#region userEffect
  useEffect(() => {
    UseAxiosGetWithParameter(
      `${process.env.REACT_APP_BACKEND}/v1/activities`,
      headers
    ).then((data) => setActivities(data));

    UseAxiosGetWithParameter(
      `${process.env.REACT_APP_BACKEND}/v1/policies`,
      headers
    ).then((data) => setPolicies(data));

    UseAxiosGetWithParameter(
      `${process.env.REACT_APP_BACKEND}/v1/users`,
      headers
    ).then((data) => setStakeholders(data));
  }, []);
  //#endregion

  //#region functions
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const clearFields = () => {};

  const handleChangeActivity = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setActivity(activities.filter((x) => x.id === value)[0]);
  };

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

  const handleChangePoli = (event: any) => {
    setPoliciesField(false);
    const selected = event.target.ariaSelected;
    const id = event.target.id as string;
    const index = parseInt(id.substring(id.lastIndexOf("-") + 1));
    if (selected.toString() === "false") numbersPoli.push(index);
    else numbersPoli.splice(numbersPoli.indexOf(index), 1);

    setNumbersPoli(numbersPoli);
  };

  const handleChangeStake = (event: any) => {
    setStakeholdersField(false);
    const selected = event.target.ariaSelected;
    const id = event.target.id as string;
    const index = parseInt(id.substring(id.lastIndexOf("-") + 1));
    if (selected.toString() === "false") numbersStake.push(index);
    else numbersStake.splice(numbersStake.indexOf(index), 1);

    setNumbersStake(numbersStake);
  };

  //#endregion

  //#region designer
  const changeLabel = () => {
    set_color("#4caf50");
  };
  const changeLabelBlur = () => {
    set_color("gray");
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

  //#endregion

  //#region save
  const createPlanning = () => {
    setSuccess(false);

    if (numbersPoli && numbersPoli.length === 0) {
      setPoliciesField(true);
      setSuccess(true);
      return false;
    }

    if (numbersStake && numbersStake.length === 0) {
      setStakeholdersField(true);
      setSuccess(true);
      return false;
    }

    const payload = {
      name: name,
    };

    const cred = localStorage.getItem("credentials");
    const credential = JSON.parse(cred ?? "") as Credentials;

    const headers = {
      Authorization: `Bearer ${credential.token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const returned = UseAxiosPost(
      `${process.env.REACT_APP_BACKEND}/v1/policy/create`,
      payload,
      headers
    ).then((data) => {
      setSuccess(data);
      if (data) {
        clearFields();
        alert("Salvo com sucesso!");
      } else {
        alert("Erro ao tentar cadastrar política");
      }
    });
  };
  //#endregion

  //#region Components
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
          createPlanning();
          e.preventDefault();
        }}
      >
        <Stack spacing={3} direction="column">
          <TextField
            required
            id="standard-basic"
            label="Nome do Plano de Ação"
            variant="standard"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <InputLabel sx={{ color: "green" }}>Atividade de Risco</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            value={activity.id || ""}
            onChange={handleChangeActivity}
            onFocus={changeLabel}
            onBlur={changeLabelBlur}
          >
            {activities != null &&
              activities.map((x: Activity) => (
                <MenuItem value={x.id}>{x.title}</MenuItem>
              ))}
          </Select>
          <TextField
            required
            id="standard-basic"
            label="Objetivo"
            //variant=""
            onChange={(event) => setObjective(event.target.value)}
            value={objective}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 1"
            //variant=""
            onChange={(event) => setGoal1(event.target.value)}
            value={goal1}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 2"
            //variant=""
            onChange={(event) => setGoal2(event.target.value)}
            value={goal2}
          />
          <TextField
            required
            id="standard-basic"
            label="Meta 3"
            //variant=""
            onChange={(event) => setGoal3(event.target.value)}
            value={goal3}
          />
          <InputLabel id="" sx={{ color: "#4caf50" }}>
            Políticas ambientais
          </InputLabel>
          <CustomMultiSelect
            defaultValue={numbersPoli}
            onChange={handleChangePoli}
          >
            {policies != null &&
              policies.map((x: Policy, index) => (
                <StyledOption value={index}>{x.title}</StyledOption>
              ))}
          </CustomMultiSelect>
          <div hidden={!policiesField} className="validationError">
            Por favor selecione pelo menos uma política.
          </div>
          <InputLabel id="demo-simple-select-label" sx={{ color: "#4caf50" }}>
            Stakeholders responsáveis pela execução do planejamento.
          </InputLabel>
          <CustomMultiSelect
            defaultValue={numbersStake}
            onChange={handleChangeStake}
          >
            {stakeholders != null &&
              stakeholders.map((x: Credentials, index) => (
                <StyledOption value={index}>{x.name}</StyledOption>
              ))}
          </CustomMultiSelect>
          <div hidden={!stakeholdersField} className="validationError">
            Por favor selecione pelo menos um stakeholder.
          </div>
          <InputLabel id="demo-simple-select-label" sx={{ color: _color }}>
            Selecione a data de Início do Plano
          </InputLabel>
          <DatePicker required onChange={setDateValue} value={dateValue} />
          <Button variant="outlined" type="submit">
            Salvar
          </Button>
        </Stack>
      </Box>
    );
  //#endregion
}
