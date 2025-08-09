'use client';

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; // import từ theme.js

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
