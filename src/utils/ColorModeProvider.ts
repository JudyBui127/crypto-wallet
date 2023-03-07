import { createContext } from "react";

export const LightColor = {
  greyBG: "#444851",
  inputBG: "#282C34",
  inputLogoBG: "#444851",
  primaryBtn: "#232A3D",
  primaryText: "#99B4F5",
  secondaryBtn: "#282C34",
  secondaryText: "#C0C0C0",
  highLightText: "#E3A42A",
  highLightBtn: "#E3A42A",
  highLightBtnText: "#432E06",
  textColor: "#E5E5E5",
  tableBG: "#2F3440",
  border: "#99B4F5",
};

export const DarkColor = {
  greyBG: "#444851",
  inputBG: "#282C34",
  inputLogoBG: "#444851",
  primaryBtn: "#232A3D",
  primaryText: "#99B4F5",
  secondaryBtn: "#282C34",
  secondaryText: "#C0C0C0",
  highLightText: "#E3A42A",
  highLightBtn: "#E3A42A",
  highLightBtnText: "#432E06",
  textColor: "#E5E5E5",
  tableBG: "#2F3440",
  border: "#99B4F5",
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
