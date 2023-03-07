import React, { useState } from "react";
import styles from "./ChainSelector.module.scss";
import BTCLogo from "../../../assets/btc.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CoinLogo from "../coinLogo/coinLogo";
import { StyledButton } from "../Buttons";
import { useAuth } from "../../../auth";

function AccountSelector() {
  const { wallet } = useAuth()
  
  const [currentAccount, setcurrentAccount] = useState(wallet.getAddress());

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null)

  return (
    <Box className={styles.Container}>
      <Box>
        <StyledButton
          id="chain-btn"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          icon={currentAccount.icon}
          title={currentAccount.title}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        />
        <Menu
          id="chain-menu"
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ "aria-labelledby": "chain-btn" }}
          open={open}
          className={styles.Menu}
        >
          {/* {CHAINS.map((chain, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                setcurrentAccount(chain);
                handleClose()
              }}
            >
              <Box display="flex" width="100%" alignItems="center">
                <Box className={styles.Icon}>{chain.icon}</Box>
                <Typography id="title" variant="body1">
                  {chain.title}
                </Typography>
              </Box>
            </MenuItem>
          ))} */}
        </Menu>
      </Box>
    </Box>
  );
}
export default AccountSelector;
