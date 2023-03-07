import { Brightness4Outlined, Brightness7Outlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext } from "../../utils/ColorModeProvider";
import { capitalize } from "../../utils/stringUtils";

export const ThemeToggler = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 5,
        p: 1,
      }}
    >
      <Typography fontSize="sm">{capitalize(theme.palette.mode)}</Typography>
      <IconButton
        sx={{ mr: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Outlined />
        ) : (
          <Brightness4Outlined />
        )}
      </IconButton>
    </Box>
  );
};
