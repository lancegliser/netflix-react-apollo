import React, { FunctionComponent } from "react";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { apolloClient } from "./services/apollo";
import ThemesContextProvider from "./contexts/ThemeContextProvider";
import NetflixDark from "./themes/NetflixDark";
import NetflixLight from "./themes/NetflixLight";

type AppProvidersProps = {
  children?: React.ReactNode;
};
const AppProviders: FunctionComponent<AppProvidersProps> = ({ children }) => (
  <HelmetProvider>
    <ThemesContextProvider themes={[NetflixDark, NetflixLight]}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ThemesContextProvider>
  </HelmetProvider>
);
export default AppProviders;
