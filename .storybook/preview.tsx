// Imported here for storybook. These must be imported in your own project's index file
import type { Decorator, Preview, StoryFn } from "@storybook/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../src/services/apollo";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NetflixDark from "../src/themes/NetflixDark";
import NetflixLight from "../src/themes/NetflixLight";

const preview: Preview = {
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: "fullscreen", // TODO not having any effect..
    backgrounds: {
      default: "NetflixDark",
      values: [
        {
          name: "NetflixLight",
          value: NetflixLight.palette.background.default,
        },
        {
          name: "NetflixDark",
          value: NetflixDark.palette.background.default,
        },
      ],
    },
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export default preview;

const withTheme: Decorator = (Story, context) => {
  const theme =
    context.globals.backgrounds?.value ===
    NetflixDark.palette.background.default
      ? NetflixDark
      : NetflixLight;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Story />
      </ThemeProvider>
    </>
  );
};

export const decorators: Decorator[] = [
  (Story: StoryFn) => (
    <MemoryRouter>
      <ApolloProvider client={apolloClient}>
        <HelmetProvider>
          <Story />
        </HelmetProvider>
      </ApolloProvider>
    </MemoryRouter>
  ),
  withTheme,
];
