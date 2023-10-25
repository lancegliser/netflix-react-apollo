import React from "react";
import { Theme } from "@mui/material";

export interface IThemesContext {
  theme: Theme;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
}

const ThemesContext = React.createContext<IThemesContext>({} as IThemesContext);
ThemesContext.displayName = "ThemesContext";

export default ThemesContext;
