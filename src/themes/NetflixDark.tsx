import { colors, createTheme, PaletteMode } from "@mui/material";
import { PaletteColorOptions } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { getComponents, getTypography } from "./Netflix";

const paletteType: PaletteMode = "dark";

const disabledOpacity = 0.4;

const backgroundColor: PaletteOptions["background"] = {
  default: colors.common.black,
  paper: "rgba(25, 25, 25, 0.8)",
};

const textColor: PaletteOptions["text"] = {
  primary: "rgba(255, 255, 255, 0.92)",
  secondary: "rgba(255, 255, 255, 0.72)",
  disabled: `rgba(255, 255, 255, ${disabledOpacity})`,
};

const primaryColor: PaletteColorOptions = {
  light: "#8BDDF0",
  main: "#54B3F6",
  dark: "#4E99F5",
  contrastText: colors.common.black,
};

const secondaryColor: PaletteColorOptions = {
  light: "#EEE",
  main: "#DDD",
  dark: "#CCC",
  contrastText: colors.common.black,
};

const successColor: PaletteColorOptions = {
  light: "#5ED075",
  main: "#36C453",
  dark: "#31B24C",
  contrastText: colors.common.black,
};

const infoColor: PaletteColorOptions = {
  light: "#9AC1FE",
  main: "#79A9EA",
  dark: "#719DC5",
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
const netflixDark = createTheme({
  palette: {
    mode: paletteType,
    background: backgroundColor,
    primary: primaryColor,
    secondary: secondaryColor,
    success: successColor,
    info: infoColor,
    error: errorColor,
    warning: warningColor,
    text: textColor,
    action: {
      disabledOpacity: disabledOpacity,
    },
  },
});

netflixDark.components = getComponents(netflixDark);
netflixDark.typography = getTypography(netflixDark);

export default netflixDark;
