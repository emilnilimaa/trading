import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    name: string;
    headerBg: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    name: string;
    headerBg: string;
  }
}
export const lightTheme = createTheme({
  name: "light",
  headerBg: "#f7f7f7",
});
