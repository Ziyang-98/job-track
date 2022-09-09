import Layout from "layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "common/theme.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
