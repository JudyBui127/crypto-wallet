import React, { ReactElement, useContext } from "react";
import { Box, Button, IconButton, styled, Typography, useTheme } from "@mui/material";
import { ColorModeContext, DarkColor, LightColor } from "../../utils/ColorModeProvider";
import { Row } from "./Flexers";

const StyledMaterialButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "30px",
}));
const StyledMuiIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: "5px"
}));
interface ButtonProps {
  id?: string,
  icon: ReactElement,
  onClick: (e) => void,
  title?: string,
  others?: {}
}
export const StyledButton = (props: ButtonProps) => {
  const { icon, title, onClick, ...others } = props
  return (
    <StyledMaterialButton
      {...others}
      size="large"
      onClick={onClick}
      startIcon={icon}
    >
      {title && (
        <Typography
          color="text.primary"
          variant="subtitle1"
          textTransform="none"
        >
          {title}
        </Typography>
      )}
    </StyledMaterialButton>
  );
};

export const StyledIconButton = (props: ButtonProps) => {
  const { icon, onClick, ...others } = props
  return (
    <StyledMuiIconButton
      {...others}
      size="large"
      onClick={onClick}
      >
      {icon}
    </StyledMuiIconButton>
  );
};

export const ActionButton = styled(IconButton)(({theme}) => ({
  background: theme.palette.primary[theme.palette.mode],
  color: theme.palette.info.main,
}))

