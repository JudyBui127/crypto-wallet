import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Layout.module.scss";
import Explorer from "../Explorer/Explorer";
import Wallet from "../Wallet/Wallet";
import Portfolio from "../Portfolio/Portfolio";
import Market from "../Market/Market";
import {
  AccountBalanceWallet,
  Apps,
  ManageSearch,
  PieChart,
  Settings,
} from "@mui/icons-material";
import _uniqueId from "lodash/uniqueId";
import MetamaskIcon from "../MetamaskIcon/MetamaskIcon";
import ChainSelector from "../Commons/ChainSelector/ChainSelector";
import Setting from "../Setting/Setting";
import { ColorModeContext } from "../../utils/ColorModeProvider";
import { ThemeToggler } from "../Commons/ThemeToggler";
import {
  StyledLayout,
  StyledMain,
  StyledNavBar,
  StyledSideBar,
} from "./LayoutComponents";
import { Row } from "../Commons/Flexers";
import { StyledButton, StyledIconButton } from "../Commons/Buttons";

interface LayoutProps {}
const SideBarIcon = ({ Icon, setTab, isActive }) => {
  const [id] = useState(_uniqueId("sidebar-"));
  return (
    <Box mt={2} key={id} className={styles.SideBarButton}>
      <IconButton
        color={isActive ? "info" : "secondary"}
        size="large"
        onClick={setTab}
      >
        {Icon}
      </IconButton>
    </Box>
  );
};
interface SubAppItemProps {
  icon: any;
  path: string;
  title: string;
}
const SubAppItems: SubAppItemProps[] = [
  {
    icon: <AccountBalanceWallet />,
    path: "/wallet",
    title: "Wallet",
  },
  {
    icon: <Apps />,
    path: "/market",
    title: "Market",
  },
  {
    icon: <PieChart />,
    path: "/portfolio",
    title: "Portfolio",
  },
  {
    icon: <ManageSearch />,
    path: "/history",
    title: "History",
  },
  {
    icon: <Settings />,
    path: "/setting",
    title: "Setting",
  },
];

const Layout = (props: LayoutProps) => {
  const [currentTab, setCurrentTab] = useState<SubAppItemProps>(SubAppItems[0]);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  console.log(theme, colorMode);

  function handleChangeTab(path) {
    const tab = SubAppItems.find((e) => e.path === path);
    if (tab) {
      setCurrentTab(tab);
    }
  }
  return (
    <StyledLayout>
      <StyledSideBar>
        {SubAppItems.map((e, i) => (
          <SideBarIcon
            key={i}
            Icon={e.icon}
            setTab={() => handleChangeTab(e.path)}
            isActive={currentTab.title === e.title}
          />
        ))}
        <Box sx={{ bottom: "2%", position: "absolute" }}>
          <ThemeToggler />
        </Box>
      </StyledSideBar>
      <StyledMain>
        <StyledNavBar>  
          <Typography color="text.primary" fontWeight="bold">
            {currentTab.title}
          </Typography>
          <Row>
            <ChainSelector />
            <Box m={2}>
              <StyledIconButton icon={<MetamaskIcon size={16} diameter={40} />} onClick={() => {
                console.log('clicked');
              }} />
            </Box>
          </Row>
        </StyledNavBar>
        <Box flex={1}>
          {currentTab.path === "/wallet" && <Wallet />}
          {currentTab.path === "/market" && <Market />}
          {currentTab.path === "/portfolio" && <Portfolio />}
          {currentTab.path === "/explorer" && <Explorer />}
          {currentTab.path === "/setting" && <Setting />}
        </Box>
      </StyledMain>
    </StyledLayout>
  );
};
export default Layout;
