import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { shortString } from "../../../utils/stringUtils";
import styles from "./CryptoCard.module.scss";

interface CryptoCardProps {
  address: string;
}

const CryptoCard: FC<CryptoCardProps> = ({ address }) => {
  return (
    <div className={styles.CryptoCard}>
      <Box>
        <Typography>Multi-coin Wallet</Typography>
        <Typography textAlign="left" mt={1} fontSize="large" fontWeight={600}>$100,000</Typography>
      </Box>
      <Box>
        <Typography>{shortString(address)}</Typography>
      </Box>
    </div>
  );
};

export default CryptoCard;
