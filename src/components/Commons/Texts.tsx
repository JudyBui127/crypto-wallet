import { styled, Typography } from "@mui/material";

export const StyledPrimaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary
}));

export const StyledSecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary
}));
