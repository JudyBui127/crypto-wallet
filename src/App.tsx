import React, { useMemo, useState } from "react";
import "./App.css";
import { createTheme, PaletteMode, styled, ThemeProvider } from "@mui/material";
import { amber, blue, deepOrange, grey, indigo, orange } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import { AuthProvider, RequireAuth } from "./auth";
import { ColorModeContext } from "./utils/ColorModeProvider";
import Layout from "./components/Layout/Layout";
import { Box } from "@mui/system";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StyledApp>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route
                  path="/app"
                  element={
                    <RequireAuth>
                      <Layout />
                    </RequireAuth>
                  }
                ></Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </StyledApp>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

const StyledApp = styled(Box)(({theme}) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  background: theme.palette.background.default
}))


const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: blue,
          secondary: grey,
          divider: grey[400],
          text: {
            primary: grey[700],
            secondary: grey[500],
          },
          info: {
            main: "rgb(0 86 174)",
            dark: "rgb(19, 47, 76)",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            light: blue[400],
            dark: blue[900],
            main: blue[500]
          },
          secondary: grey,
          info: {
            main: "rgb(243 246 249)",
            dark: "rgb(117 149 179)",
          },
          divider: "rgb(19 47 76);",
          background: {
            default: "#0a1929",
            paper: "#0a1929",
          },
          text: {
            primary: "rgb(243 246 249)",
            secondary: "rgb(151 162 173)",
          },
        }),
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto Slab',
      '-apple-system',
      '"Apple Color Emoji"',
      'BlinkMacSystemFont',
    ].join(','),
  },
});