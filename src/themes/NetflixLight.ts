import { colors, createTheme, PaletteMode } from "@mui/material";
import { PaletteColorOptions } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { getComponents, getTypography } from "./Netflix";

const paletteType: PaletteMode = "light";

const disabledOpacity = 0.4;

const textColor: PaletteOptions["text"] = {
  primary: "rgba(35, 39, 48, 0.92)",
  secondary: "rgba(35, 39, 48, 0.72)",
  disabled: `rgba(35, 39, 48, ${disabledOpacity})`,
};

const primaryColor: PaletteColorOptions = {
  light: "#4B9DF0",
  main: "#1473E6",
  dark: "#0E59C5",
  contrastText: colors.common.white,
};

const secondaryColor: PaletteColorOptions = {
  light: "#484D5B",
  main: "#3C414E",
  dark: "#353A45",
  contrastText: colors.common.white,
};

const successColor: PaletteColorOptions = {
  light: "#5ED075",
  main: "#36C453",
  dark: "#31B24C",
  contrastText: colors.common.black,
};

const infoColor: PaletteColorOptions = {
  light: "#7AA1EE",
  main: "#5989EA",
  dark: "#517DD5",
  contrastText: colors.common.black,
};

const errorColor: PaletteColorOptions = {
  light: "#FF6464",
  main: "#FF3D3D",
  dark: "#E83838",
  contrastText: colors.common.black,
};

const warningColor: PaletteColorOptions = {
  light: "#FCAA5F",
  main: "#FB9537",
  dark: "#E48832",
  contrastText: colors.common.black,
};

// Create our actual theme
const netflixLight = createTheme({
  palette: {
    mode: paletteType,
    primary: primaryColor,
    secondary: secondaryColor,
    success: successColor,
    info: infoColor,
    error: errorColor,
    warning: warningColor,
    background: {
      default: "#F0F4FA",
      paper: colors.common.white,
    },
    text: textColor,
    action: {
      disabledOpacity: disabledOpacity,
    },
  },
});

netflixLight.components = getComponents(netflixLight);
netflixLight.typography = getTypography(netflixLight);

export default netflixLight;
