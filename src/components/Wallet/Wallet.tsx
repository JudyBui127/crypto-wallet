import {
  ArrowDownward,
  ArrowUpward,
  AttachMoney,
  CurrencyExchange,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { styled } from "@mui/material";
import React, { FC } from "react";
import { useAuth } from "../../auth";
import { DUMMY, DUMMY_ASSETS } from "../BTCWallet/dummy";
import Balance from "../Commons/Balance/Balance";
import { ActionButton } from "../Commons/Buttons";
import CoinLogo from "../Commons/coinLogo/coinLogo";
import CryptoCard from "../Commons/CryptoCard/CryptoCard";
import { StyledPrimaryText } from "../Commons/Texts";
import styles from "./Wallet.module.scss";

interface WalletProps {}
const StyledMainInfo = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
}));
const Wallet: FC<WalletProps> = () => {
  const { wallet } = useAuth();
  return (
    <div className={styles.Wallet}>
      <StyledMainInfo flex={5}>
        <Box className={styles.Cards}>
          <CryptoCard address={wallet.getAddress()} />
          <Box mt={3} className={styles.Actions}>
            <Box>
              <ActionButton size="large" onClick={() => {}}>
                <AttachMoney />
              </ActionButton>
              <StyledPrimaryText>Buy</StyledPrimaryText>
            </Box>
            <Box>
              <ActionButton size="large" onClick={() => {}}>
                <ArrowUpward />
              </ActionButton>
              <StyledPrimaryText>Send</StyledPrimaryText>
            </Box>
            <Box>
              <ActionButton size="large" onClick={() => {}}>
                <ArrowDownward />
              </ActionButton>
              <StyledPrimaryText>Receive</StyledPrimaryText>
            </Box>
            <Box>
              <ActionButton size="large" onClick={() => {}}>
                <CurrencyExchange />
              </ActionButton>
              <StyledPrimaryText>Exchange</StyledPrimaryText>
            </Box>
          </Box>
        </Box>
        <Box className={styles.Assets}>
          <Typography
            mb={2}
            fontWeight="bold"
            textAlign="left"
            color="text.primary"
          >
            Assets
          </Typography>
          <Box className={styles.AssetList}>
            {DUMMY_ASSETS.map((e: AssetProp, i) => {
              return (
                <Box key={i}>
                  <AssetItem {...e} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </StyledMainInfo>
      <Box flex={3} className={styles.SubInfo}>
        <Balance />
      </Box>
    </div>
  );
};

export default Wallet;

interface AssetProp {
  amount: number;
  asset: string;
  assetName: string;
  price: number;
  fiat: string;
}
const AssetItem = (props: AssetProp) => {
  const { amount, asset, assetName, price, fiat } = props;
  return (
    <Box className={styles.AssetItem}>
      <Box flex={2} display="flex" alignItems="center">
        <CoinLogo coinName={asset} size="sm" />
        <Box display="flex" flex={1} ml={2}>
          <Typography
            color="text.primary"
            fontWeight="bold"
            textAlign="left"
          >
            {assetName}
          </Typography>
          <Typography
            ml={1}
            textAlign="left"
            color="text.secondary"
          >
            {asset}
          </Typography>
        </Box>
      </Box>
      <Box flex={1}>
        <Typography color="text.primary" textAlign="left">
          $ {price}
        </Typography>
      </Box>
      <Box flex={1}>
        <Typography color="text.primary" textAlign="left">
          $ {Math.floor(amount * price)}
        </Typography>
      </Box>
      <Box flex={2}>
        <Typography
          textAlign="left"
          justifySelf="flex-end"
          fontWeight="bold"
          color="text.primary"
        >
          {amount} {asset}
        </Typography>
      </Box>
    </Box>
  );
};
