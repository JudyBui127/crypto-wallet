import React, { FC, useEffect, useState } from "react";
import styles from "./login.module.scss";

import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../btc.png";
import { useNavigate } from "react-router-dom";
import { ContentCopy, ContentPasteGo } from "@mui/icons-material";
import {
  initBTCWallet,
  importBTCWallet,
  decrypt,
  encryptPassphrase,
  generateSeed,
  verifyMnemonic,
  WALLET,
  BTC_NETWORK_TYPE,
} from "../../models/walletModel";
import { useAuth } from "../../auth";
import CoinLogo from "../Commons/coinLogo/coinLogo";

interface LoginProps {}
interface SeedData {
  mnemonic: string;
  generateMnemonic: string;
  password: string;
  token: string;
}
const NETWORK:BTC_NETWORK_TYPE = 'mainnet'

const Login: FC<LoginProps> = () => {  
  const [seedData, setSeedData] = useState<SeedData>({
    mnemonic: "",
    generateMnemonic: "",
    password: "",
    token: "",
  });

  const [wallet, setWallet] = useState<WALLET>();
  const [error, setError] = useState<any>(null);
  let navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (
      seedData.generateMnemonic &&
      verifyMnemonic(seedData.generateMnemonic)
    ) {
      generateWallet(seedData.generateMnemonic);
    }
  }, [seedData.generateMnemonic]);

  useEffect(() => {
    if (seedData.mnemonic && verifyMnemonic(seedData.mnemonic)) {
      generateWallet(seedData.mnemonic);
    }
  }, [seedData.mnemonic]);

  useEffect(() => {
    const token = localStorage.getItem("encryptedToken")?.toString();
    if (token) {
      setSeedDataProp("token", token);
    }
  }, [localStorage]);

  useEffect(() => {
    const { password, token } = seedData;
    if (password && token) {
      generateWalletFromPrivateToken(token, password);
    }
  }, [seedData.password, seedData.token]);

  function generateWallet(words: string) {
    if (!words) return;
    const wallet = initBTCWallet(words, NETWORK);
    setWallet(wallet);
    const address = wallet.getAddress();
  }
  function generateWalletFromPrivateToken(token, password) {
    if (token && password) {
      try {
        const wif = decrypt(token, password);
        if (wif?.length > 0) {
          const wallet = importBTCWallet(wif, NETWORK);
          setWallet(wallet);
          
        }
      } catch (error) {
        raiseError(error);
      }
    }
  }
  function raiseError(error) {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 5000);
  }
  
  // handleLogin() // dev ---- Remove before release-

  function handleLogin() {
    // dev--------Remove before release-----
    // let wallet = initBTCWallet("basic blue universe advance cat output mountain north dolphin evoke name science", 'testnet')
    // dev------------
    if (!wallet) return;
    auth.signin(wallet, () => {
      if (seedData.password) {
        const token = encryptPassphrase(
          wallet.getPrivateKey(),
          seedData.password
        );
        setSeedDataProp("token", token);
        localStorage.setItem("encryptedToken", token);
      }
      navigate("../app", { replace: true });
    });
  }

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const [tab, setTab] = React.useState(0);
  const handleChangeTab = (event, v) => setTab(v);

  function handleChangeLoginInput(event) {
    setSeedDataProp("mnemonic", event.target.value);
  }
  function handleSetPassword(value) {
    setSeedDataProp("password", value);
  }
  function setSeedDataProp(key, value) {
    setSeedData({ ...seedData, [key]: value });
  }
  return (
    <div className={styles.login}>
      {/* <img src={``} className={styles.AppLogo} alt="logo" /> */}
      <CoinLogo coinName="BTC" styleName='AppLogo'/>
      {error && (
        <Box position="absolute" top="10%" width="382px">
          <Alert severity="error">Some thing went wrong</Alert>
        </Box>
      )}
      {seedData.token ? (
        <Box display="flex" justifyContent="center" flexDirection="column">
          <TextField
            id="pass"
            size="small"
            label="Your password"
            type="password"
            autoFocus={true}
            fullWidth={true}
            autoComplete="off"
            onChange={(e) => handleSetPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="success"
              fullWidth={true}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          </Box>
          <Box mt={2}>
            <Typography color="whitesmoke" mt={2}>
              Or{" "}
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="warning"
                fullWidth={true}
                onClick={() => {
                  localStorage.removeItem("encryptedToken");
                  setSeedDataProp("token", "");
                }}
              >
                Login with Master key
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              <Tab label="Login" />
              <Tab label="Generate" />
            </Tabs>
          </Box>
          {/* -----------------Login Wallet------------------- */}
          <TabPanel value={tab} index={0}>
            <Box width="400px" margin={5} display="flex" flexDirection="column">
              <Box mt={2} display="flex" flexDirection="row">
                <TextField
                  id="mnemonic"
                  label="Your Wallet Master Key"
                  value={seedData.mnemonic}
                  fullWidth={true}
                  autoFocus={!verifyMnemonic(seedData.mnemonic)}
                  autoComplete="off"
                  onChange={handleChangeLoginInput}
                />
                <Box ml="5px" height="56px">
                  <Button
                    style={{ height: "100%" }}
                    variant="outlined"
                    startIcon={<ContentPasteGo />}
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((text) => setSeedDataProp("mnemonic", text));
                    }}
                  >
                    Paste
                  </Button>
                </Box>
              </Box>
              <Box mt={2}>
                <Button
                  disabled={
                    !seedData.mnemonic || !verifyMnemonic(seedData.mnemonic)
                  }
                  variant="contained"
                  color="success"
                  fullWidth={true}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </TabPanel>
          {/* -----------------Generate Wallet------------------- */}
          <TabPanel value={tab} index={1}>
            <Box width="400px" margin={5} display="flex" flexDirection="column">
              <Box marginBottom={2} display="flex" flexDirection="row">
                <TextField
                  id="outlined-read-only-input"
                  autoComplete="off"
                  type="text"
                  value={seedData.generateMnemonic}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth={true}
                />
                <Box ml="5px" height="56px">
                  <Button
                    disabled={!seedData.generateMnemonic}
                    style={{ height: "100%" }}
                    variant="outlined"
                    startIcon={<ContentCopy />}
                    onClick={() => {
                      navigator.clipboard.writeText(seedData.generateMnemonic);
                    }}
                  >
                    Copy
                  </Button>
                </Box>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth={true}
                  onClick={() => {
                    setSeedData({
                      ...seedData,
                      generateMnemonic: generateSeed(),
                    });
                  }}
                >
                  Generate 12 words
                </Button>
              </Box>
              {seedData.generateMnemonic &&
                verifyMnemonic(seedData.generateMnemonic) && (
                  <Box mt={2}>
                    <Button
                      fullWidth={true}
                      variant="contained"
                      color="success"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      Open Wallet
                    </Button>
                  </Box>
                )}
            </Box>
          </TabPanel>
          <SavePasswordCheckBox
            handleChange={(value) => handleSetPassword(value)}
            verified={
              verifyMnemonic(seedData.mnemonic) ||
              verifyMnemonic(seedData.generateMnemonic)
            }
          />
        </>
      )}
    </div>
  );
};
const SavePasswordCheckBox = (props) => {
  const { handleChange, verified } = props;
  const [checked, setChecked] = useState(true);
  return (
    <Box m="64px" display="flex" justifyContent="space-between">
      <FormGroup>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
          }
          label={
            <Typography fontSize="small" color="whitesmoke">
              Save this browser
            </Typography>
          }
        />
      </FormGroup>
      <Box mr={1} height="56px" display="flex" flexDirection="row">
        {checked && (
          <TextField
            id="pass"
            size="small"
            label="Your password"
            type="text"
            autoFocus={verified}
            fullWidth={true}
            autoComplete="off"
            onChange={(e) => handleChange(e.target.value)}
          />
        )}
      </Box>
    </Box>
  );
};
export default Login;
