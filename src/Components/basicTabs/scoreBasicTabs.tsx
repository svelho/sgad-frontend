import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pizza from "../charts/pizza";
import { Bar } from "../charts/bar";
import Credentials from "../../models/credentials";
import { UseAxiosGet } from "../../hooks/axios";
import Loading from "react-loading";
import Planning from "../../models/planning";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ScoreBasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const headers = {
    Authorization: `Bearer ${credential.token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const { data, error, loaded } = UseAxiosGet(
    `${process.env.REACT_APP_BACKEND}/v1/planningList`,
    headers
  );

  if (loaded) {
    if (error)
      return (
        <div className="validationError">
          Erro ao tentar realizar a consulta, tente mais tarde!
        </div>
      );
    else
      return (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Pizza" {...a11yProps(0)} />
              <Tab label="Barras" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Pizza arrayPlanning={data as unknown as Planning[]} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Bar arrayPlanning={data as unknown as Planning[]} />
          </TabPanel>
        </Box>
      );
  } else return <Loading />;
}
