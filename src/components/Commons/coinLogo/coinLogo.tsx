import React from "react";
import styles from "./coinLogo.module.scss";
import BTCLogo from "../../../assets/btc.png"
import BNBLogo from "../../../assets/BNB.png"
import ETHLogo from "../../../assets/eth.png"
import DogeLogo from "../../../assets/doge.png"
import NoLogo from "../../../assets/noLogo.png"
interface PropType {
  coinName: "BTC" | "ETH" | "BNB" | "DOGE" | string;
  size?: "lg" | "md" | "sm" | number;
  styleName?: string;
}
const COINS_LOGO = {
  'BTC': BTCLogo,
  'BNB': BNBLogo,
  'ETH': ETHLogo,
  'DOGE': DogeLogo,
  'NONE': NoLogo,
}
export const CoinLogo = (props: PropType) => {
  const { coinName, size="sm", styleName } = props;
  return (
    <img
      src={COINS_LOGO[coinName] || COINS_LOGO.NONE}
      className={`
        ${styles.CoinLogo}
        ${size ? styles[size] : ""}
        ${styleName ? styles[styleName] : ""}
        `}
      alt="logo"
    />
  );
};

export default CoinLogo;
