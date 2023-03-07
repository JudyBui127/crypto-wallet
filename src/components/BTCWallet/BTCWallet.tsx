import { ExitToApp, LibraryAdd } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../auth";
import { LightColor } from "../../utils/ColorModeProvider";
import { shortString } from "../../utils/stringUtils";
import CoinLogo from "../Commons/coinLogo/coinLogo";
import LoadingDot from "../Commons/loadingDot/loadingDot";
import styles from "./BTCWallet.module.scss";
import { getWalletAsync, WalletInfo, walletInfoSelector } from "./btcWalletSlice";
import { DUMMY } from "./dummy";

interface BTCWalletProps {}

const BTCWallet: FC<BTCWalletProps> = () => {
  const auth = useAuth();
  const dispatch = useDispatch()
  function handleChangeAddress() {}
  const [wallet, setWallet] = useState(auth.wallet);
  const [currentAddress, setCurrentAddress] = useState(auth?.wallet?.getAddress());
  const [balance, setBalance] = useState<WalletInfo | null>(null);
  function onClickDeposit() {}
  function onClickWidthdaw() {}

  const MuiTheme = useTheme();
  
  const getAddress = () => wallet?.getAddress() || ''
  const balances = useSelector(walletInfoSelector)
  
  useEffect(()=> {
    if (auth.wallet && getAddress()) {
      dispatch(getWalletAsync([getAddress()]))
    }
  }, [auth])
  useEffect(() => {
    if (balances && currentAddress && balances[currentAddress]) {
      setBalance(balances[currentAddress])
    }
  }, [balances, currentAddress])
  

  return (
    <div className={styles.container}>
      <Box
        className={styles.wallet}
        color={LightColor.textColor}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box className={styles.address}>
          <FormControl fullWidth>
            <InputLabel id="address-id">Address</InputLabel>
            <Select
              labelId="address-id"
              id="address"
              color="primary"
              value={getAddress()}
              label="Address"
              onChange={handleChangeAddress}
            >
              <MenuItem key={currentAddress} value={currentAddress}>
                {currentAddress}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box my={2} display="flex">
          <Typography variant="h6">
            {balance?.final_balance?.toString() ||  "-" } BTC
            </Typography>
          <Box ml={1}>
            <CoinLogo coinName="BTC" />
          </Box>
        </Box>
        <Box my={2} width="80%" display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            style={StyledPrimaryButtonClass}
            startIcon={<LibraryAdd />}
            onClick={onClickDeposit}
          >
            Deposit
          </Button>
          <Box mx={1} />
          <Button
            variant="contained"
            style={StyledSecondaryButtonClass}
            startIcon={<ExitToApp />}
            onClick={onClickWidthdaw}
          >
            Widthdaw
          </Button>
        </Box>
        <Box mt={2} className={styles.History} style={StyledHistory}>
          <Box mb={1}>
            <Typography variant="body1">History</Typography>
          </Box>
          <Box className={styles.TxTable} style={StyledTxTable}>
            {DUMMY.map((e: TxInfoProp) => {
              return <TxInfoRow {...e} />;
            })}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BTCWallet;

interface TxInfoProp {
  type: "deposit" | "widthdraw";
  time: string;
  amount: number;
  txid: string;
  partnerAddress: string;
  isConfirming?: boolean;
}
const TxInfoRow = (props: TxInfoProp) => {
  const { type, time, amount, txid, partnerAddress, isConfirming } = props;
  return (
    <Box className={styles.TxRow} style={StyledTxRow}>
      <Box style={StyledCenterFlex} flexDirection="column">
        <Typography variant="body2">{type?.toUpperCase()}</Typography>
        {isConfirming ? (
          <Box className={styles.confirming} style={StyledConfirming}>
            <Typography variant="body2">Confirming</Typography>
            <LoadingDot />
          </Box>
        ) : (
          <Typography variant="body2" style={StyledInfo}>
            {time}
          </Typography>
        )}
      </Box>
      <Box style={StyledCenterFlex}>
        <Typography variant="body2" fontWeight="bold">
          {type == "deposit" ? "+" : "-"} {amount}
        </Typography>
      </Box>
      <Box style={StyledCenterFlex}>
        <Typography mr={2} width="30px">
          TxID
        </Typography>
        <Link
          href={`https://blockchain.com/btc/tx/${txid}`}
          variant="body2"
          style={StyledInfo}
          target="_blank"
        >
          {shortString(txid)}
        </Link>
      </Box>
      <Box style={StyledCenterFlex}>
        <Typography mr={2} width="40px">
          {type == "deposit" ? "From" : "To"}
        </Typography>
        <Link
          href={`https://blockchain.com/btc/address/${partnerAddress}`}
          variant="body2"
          style={StyledInfo}
          target="_blank"
        >
          {shortString(partnerAddress)}
        </Link>
      </Box>
    </Box>
  );
};
const StyledCenterFlex = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  flex: 1,
};
const StyledPrimaryButtonClass = {
  background: LightColor.primaryBtn,
  color: LightColor.primaryText,
  flex: 1,
};
const StyledSecondaryButtonClass = {
  background: LightColor.secondaryBtn,
  color: LightColor.secondaryText,
  flex: 1,
};
const StyledHistory = {
  background: LightColor.greyBG,
};
const StyledTxTable = {
  background: LightColor.tableBG,
};
const StyledTxRow = {
  borderBottom: `1px solid ${LightColor.border}`,
};
const StyledInfo = {
  color: LightColor.primaryText,
  textDecorationColor: LightColor.primaryText,
};
const StyledConfirming = {
  color: LightColor.highLightText,
};
