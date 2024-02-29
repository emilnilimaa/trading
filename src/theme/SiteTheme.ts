import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    name: string;
    headerBg: string;
    linkColor: string;
    colors: {
      primary: string;
      white: string;
      red: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    name: string;
    headerBg: string;
    linkColor: string;
    colors: {
      primary: string;
      white: string;
      red: string;
    };
  }
}
export const lightTheme = createTheme({
  name: "light",
  headerBg: "#f7f7f7",
  linkColor: "#059b72",
  colors: {
    primary: "#059b72",
    white: "#ffffff",
    red: "#d0184d",
  },
});
