import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Planning, { ListPlanning } from "../../models/planning";

export const data = [
  ["Políticas Ambientais", "2010 Population", "2000 Population"],
  ["jjjj", 8175000, 8008000],
  ["Los Angeles, CA", 3792000, 3694000],
  ["Chicago, IL", 2695000, 2896000],
  ["Houston, TX", 2099000, 1953000],
  ["Philadelphia, PA", 1526000, 1517000],
];

export const options = {
  chart: {
    title: "Gráfico de Comparação de Projetos",
    subtitle:
      "Compara os pontos positivos (Políticas, Stakeholders, Metas) com os pontos negativos (Nível da atividade de Risco)",
  },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
  bars: "horizontal",
  axes: {
    y: {
      0: { side: "right" },
    },
  },
};

export function Bar({ arrayPlanning }: ListPlanning) {
  const [planningSelected, setPlanning] = useState(arrayPlanning[0]);
  const [_color, set_color] = React.useState("green");
  const [options, setOptions] = useState({
    chart: {
      title: "Gráfico de Comparação de Projetos",
      subtitle:
        "Compara a pontuação dos fatores positivos (Políticas, Stakeholders, Metas) com os fatores negativos (Nível de Risco da Atividade Empresarial)",
    },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "",
    },
    bars: "horizontal",
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  });

  const [data, setData] = useState([] as any);

  const calcRiskScore = (x: Planning) => {
    let pontosPositivos = 0;
    x.policies?.forEach((y) => (pontosPositivos += (y.level ?? 0) / 3));
    x.stakeholders?.forEach((y) => {
      if (y.area === "Gestao Ambiental") pontosPositivos += 20;
      else pontosPositivos += 10;
    });

    if (planningSelected.goal1 !== "") pontosPositivos += 10;
    if (planningSelected.goal2 !== "") pontosPositivos += 10;
    if (planningSelected.goal3 !== "") pontosPositivos += 10;

    let pontosNegativos = x.activity?.level;

    return { pontosPositivos, pontosNegativos };
  };

  useEffect(() => {
    setPlanning(arrayPlanning[1]);
    let data1 = [
      ["Itens de Pontuação", "Pontos Posivitos", "Pontos Negativos"],
    ];
    arrayPlanning.forEach((planning) => {
      const projectName = planning.name;
      const { pontosPositivos, pontosNegativos } = calcRiskScore(planning);
      data1.push([projectName, pontosPositivos as any, pontosNegativos as any]);
    });
    setData(data1);
  }, []);

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
