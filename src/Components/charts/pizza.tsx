import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { UseAxiosGetWithParameter } from "../../hooks/axios";
import Planning, { ListPlanning } from "../../models/planning";

function Pizza({ arrayPlanning }: ListPlanning) {
  const [planningSelected, setPlanning] = useState(arrayPlanning[0]);
  const [_color, set_color] = React.useState("green");
  const [options, setOptions] = useState({
    title: "",
  });

  const [data, setData] = useState({});

  const calcRiskScore = () => {
    let total = 0;
    planningSelected.policies?.forEach((x) => (total += x.level ?? 0));
    let totalStakeholders = 0;
    planningSelected.stakeholders?.forEach((x) => {
      if (x.area === "Gestao Ambiental") totalStakeholders += 30;
      else totalStakeholders += 15;
    });
    let totalGoal = 0;
    if (planningSelected.goal1 != "") totalGoal += 10;
    if (planningSelected.goal2 != "") totalGoal += 10;
    if (planningSelected.goal3 != "") totalGoal += 10;
    setData([
      ["Linguagens", "Quantidade"],
      ["Politicas Ambientais", total],
      ["Atividade de Risco", planningSelected.activity?.level],
      ["Stakeholders", totalStakeholders],
      ["Metas do Planejamento", totalGoal],
    ]);
  };

  useEffect(() => {
    if (arrayPlanning.length > 1) setPlanning(arrayPlanning[1]);
    else setPlanning(arrayPlanning[0]);
    calcRiskScore();
  }, []);

  const handleChangeActivity = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setPlanning(arrayPlanning.filter((x) => x.id === value)[0]);
    calcRiskScore();
  };

  const changeLabel = () => {
    set_color("#4caf50");
  };
  const changeLabelBlur = () => {
    set_color("gray");
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        autoComplete="off"
      >
        <Stack spacing={3} direction="column">
          <InputLabel sx={{ color: "green" }}>Planejamento</InputLabel>
          <Select
            defaultValue=""
            required
            labelId="demo-simple-select-label"
            value={planningSelected.id || ""}
            label="Nível de Importância"
            onChange={handleChangeActivity}
            onFocus={changeLabel}
            onBlur={changeLabelBlur}
          >
            {arrayPlanning != null &&
              arrayPlanning.map((x: Planning) => (
                <MenuItem value={x.id}>{x.name}</MenuItem>
              ))}
          </Select>
        </Stack>
      </Box>
      <div>
        <Chart
          width={"700px"}
          height={"500px"}
          chartType="PieChart"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default Pizza;
