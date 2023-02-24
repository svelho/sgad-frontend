import { AppRoutes } from "./routes/routes";

import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
