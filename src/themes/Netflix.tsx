// import { inputColorOverrides } from "./utils";
import { alpha, lighten, Theme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const h1FontSizeUnits = 6;
const h2FontSizeUnits = 3.75;
const h3FontSizeUnits = 3;
const h4FontSizeUnits = 2.13;
const h5FontSizeUnits = 1.5;
const h6FontSizeUnits = 1;
const subtitle1FontSizeUnits = 1;
const subtitle2FontSizeUnits = 0.875;
const body1FontSizeUnits = 1;
const body2FontSizeUnits = 0.875;
const captionFontSizeUnits = 0.75;
const overlineFontSizeUnits = 0.75;

const smFontSizeRatio = 0.8;

export const getTypography: (theme: Theme) => Theme["typography"] = (
  theme,
) => ({
  ...theme.typography,
  h1: {
    ...theme.typography.h1,
    lineHeight: 1.167,
    fontWeight: 300,
    fontSize: `${h1FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: "-1.5px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${h1FontSizeUnits}rem`,
    },
  },
  h2: {
    ...theme.typography.h2,
    lineHeight: 1.2,
    fontWeight: 300,
    letterSpacing: "-.5px",
    fontSize: `${h2FontSizeUnits * smFontSizeRatio}rem`,
    [theme.breakpoints.up("md")]: {
      fontSize: `${h2FontSizeUnits}rem`,
    },
  },
  h3: {
    ...theme.typography.h3,
    lineHeight: 1.167,
    fontWeight: 400,
    fontSize: `${h3FontSizeUnits * smFontSizeRatio}rem`,
    [theme.breakpoints.up("md")]: {
      fontSize: `${h3FontSizeUnits}rem`,
    },
  },
  h4: {
    ...theme.typography.h4,
    lineHeight: 1.235,
    fontWeight: 400,
    letterSpacing: ".25px",
    fontSize: `${h4FontSizeUnits * smFontSizeRatio}rem`,
    [theme.breakpoints.up("md")]: {
      fontSize: `${h4FontSizeUnits}rem`,
    },
  },
  h5: {
    ...theme.typography.h5,
    lineHeight: 1.334,
    fontWeight: 400,
    fontSize: `${h5FontSizeUnits * smFontSizeRatio}rem`,
    [theme.breakpoints.up("md")]: {
      fontSize: `${h5FontSizeUnits}rem`,
    },
  },
  h6: {
    ...theme.typography.h6,
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: `${h6FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".15px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${h6FontSizeUnits}rem`,
    },
  },
  subtitle1: {
    ...theme.typography.subtitle1,
    lineHeight: 1.75,
    fontWeight: 500,
    fontSize: `${subtitle1FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".15px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${subtitle1FontSizeUnits}rem`,
    },
  },
  subtitle2: {
    ...theme.typography.subtitle2,
    lineHeight: 1.57,
    fontWeight: 500,
    fontSize: `${subtitle2FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".1px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${subtitle2FontSizeUnits}rem`,
    },
  },
  body1: {
    ...theme.typography.body1,
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: `${body1FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".15px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${body1FontSizeUnits}rem`,
    },
  },
  body2: {
    ...theme.typography.body2,
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: `${body2FontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".15px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${body2FontSizeUnits}rem`,
    },
  },
  caption: {
    ...theme.typography.caption,
    lineHeight: 1.66,
    fontWeight: 400,
    fontSize: `${captionFontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: ".4px",
    [theme.breakpoints.up("md")]: {
      fontSize: `${captionFontSizeUnits}rem`,
    },
  },
  overline: {
    ...theme.typography.overline,
    lineHeight: 2.66,
    fontWeight: 400,
    fontSize: `${overlineFontSizeUnits * smFontSizeRatio}rem`,
    letterSpacing: "1px",
    textTransform: "uppercase",
    [theme.breakpoints.up("md")]: {
      fontSize: `${overlineFontSizeUnits}rem`,
    },
  },
});

export const getComponents = (theme: Theme): Theme["components"] =>
  deepmerge(
    {},
    // inputColorOverrides,
    {
      MuiCssBaseline: {
        styleOverrides: {
          code: {
            fontFamily: `"JetBrains Mono", "monospace"`,
            fontSize: "0.875rem",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: `blur(${theme.spacing(1)})`,
            backgroundColor: "transparent",
            backgroundImage: `linear-gradient(to bottom, ${[
              `${alpha(theme.palette.background.paper, 0.95)}`,
              `${alpha(theme.palette.background.paper, 0.85)} 60%`,
              `${alpha(theme.palette.background.paper, 0.89)}`,
            ].join(", ")})`,
            boxShadow:
              theme.palette.mode === "light"
                ? undefined
                : [
                    `0px 2px 1px -1px ${alpha(
                      lighten(theme.palette.background.paper, 0.6),
                      0.2,
                    )}`,
                    `0px 1px 1px 0px ${alpha(
                      lighten(theme.palette.background.paper, 0.6),
                      0.14,
                    )}`,
                    `0px 1px 3px 0px ${alpha(
                      lighten(theme.palette.background.paper, 0.6),
                      0.12,
                    )}`,
                  ].join(", "),
          },
        },
      } /* Stepper */,
      MuiStepper: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            "&.Mui-active": {
              color: theme.palette.primary.main,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused  .MuiOutlinedInput-notchedOutline": {
              borderColor: "currentColor",
              color: theme.palette.primary.dark,
            },
          },
        },
      },
      // /* Trees */
      MuiTreeItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected > div > .Mui-label": {
              backgroundColor: `${theme.palette.background.default} !important`,
            },
          },
          label: {
            padding: 8,
          },
          iconContainer: {
            marginLeft: 8,
          },
        },
      },
      /* Dialogs */
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: `${alpha(
              theme.palette.background.paper,
              1,
            )} !important`,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "16px 24px",
            justifyContent: "flex-start",
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            // There appears to be no simple way to override the dialog title's variant
            // This override is as specific as I could make it to avoid other `disableTypography` usages being caught.
            // https://github.com/mui-org/material-ui/blob/v4.x/packages/material-ui/src/DialogTitle/DialogTitle.js
            "& > h2.MuiTypography-h6": {
              fontSize: "1.1rem",
              lineHeight: 1.6,
              fontWeight: 500,
            },
          },
        },
      },
      /* Cards */
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: "0 16px 16px",
          },
        },
      },
      /* Tables */
      MuiTableCell: {
        styleOverrides: {
          root: {
            "&.MuiTableCell-stickyHeader": {
              backgroundColor: theme.palette.background.paper,
            },
          },
        },
      },
      /* Inputs */
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "& > svg": {
              color: `${theme.palette.secondary.main} !important`,
            },
            "&.Mui-disabled": {
              opacity: theme.palette.action.disabledOpacity,
            },
          },
        },
      },
      /* Buttons */
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "inherit",
            fontFamily: "inherit",
            lineHeight: "inherit",
          },
        },
      },
    },
  );
