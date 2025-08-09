import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f2",
    },
    text: {
      primary: "#222222",
      secondary: "#666666",
    },
    primary: {
      main: "#e96b2a",
    },
    secondary: {
      main: "#a08c75",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Playfair Display', serif",
  },
});

export default theme;