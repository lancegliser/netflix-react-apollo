import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import ThemesContext from "./ThemeContext";

type ThemesContextProviderProps = {
  themes: Theme[];
  defaultTheme?: Theme;
  children: ReactNode;
};
export const ThemesContextProvider: FunctionComponent<
  ThemesContextProviderProps
> = ({ themes, defaultTheme, children }) => {
  if (!themes.length) {
    throw new Error("At least one theme must be provided");
  }

  const [theme, setTheme] = useState<Theme>(defaultTheme || themes[0]);
  useEffect(() => {
    if (!defaultTheme) {
      return;
    }

    setTheme(defaultTheme);
  }, [defaultTheme, setTheme]);

  return (
    <ThemesContext.Provider
      value={{
        themes,
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemesContext.Provider>
  );
};
export default ThemesContextProvider;
