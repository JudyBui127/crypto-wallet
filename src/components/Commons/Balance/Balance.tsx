import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./Balance.module.scss";

interface BalanceProps {}
function tabIdProps(index) {
  return {
    id: `wallet-tab-${index}`,
    "aria-controls": `wallet-tabpanel-${index}`,
  };
}
const Balance: FC<BalanceProps> = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <div className={styles.Balance}>
      <Box className={styles.TabContainer} color="#4D97F5">
        <Tabs
          className={styles.Tabs}
          centered={true}
          value={tab}
          aria-label="wallet tabs"
          onChange={handleChange}
        >
          <Tab className={styles.Tab} label="Balance" {...tabIdProps(0)} />
          <Tab className={styles.Tab} label="Price" {...tabIdProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Box width="100%" height="100%">
          Balance
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Chart
      </TabPanel>
    </div>
  );
};

export default Balance;

function TabPanel(props) {
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
