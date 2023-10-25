import { useMediaQuery, useTheme } from "@mui/material";

export const useSuggestionCount = (): number => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const isXXl = useMediaQuery(theme.breakpoints.only("xxl"));
  const isXXXlUp = useMediaQuery(theme.breakpoints.up("xxxl"));
  return isXXXlUp
    ? 7
    : isXXl
    ? 6
    : isXl
    ? 5
    : isLg
    ? 4
    : isMd
    ? 3
    : isSm
    ? 2
    : 1;
};
