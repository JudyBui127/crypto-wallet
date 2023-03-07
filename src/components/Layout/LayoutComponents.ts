import { Box, Button, styled } from "@mui/material";
import { LightColor } from "../../utils/ColorModeProvider";

export const StyledLayout = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
`
export const StyledSideBar = styled(Box)(({theme}) => ({
  height: '100%',
  width: '120px',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRight: `1px solid ${theme.palette.divider}`
}))
export const StyledSideBarButton = styled(Button)`
  margin: 2rem !important;
  icon {
    color: #48484b;
  }
`
export const StyledMain = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
`
export const StyledNavBar = styled(Box)(({theme}) => ({
  height: "60px",
  display: "flex",
  padding: "0.5rem 1rem",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`
}))
