import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import router from "./routes/router";
import { lightTheme } from "./theme/SiteTheme";

const Fallback = () => {
  return null;
};

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <MuiThemeProvider theme={lightTheme}>
        <ThemeProvider theme={lightTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;
