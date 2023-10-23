// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react";
import FocusedSuggestion, { FocusedSuggestionProps } from "./FocusedSuggestion";
import { generateContentInfoUri } from "../../../Dashboard/Router";
import { ApolloError } from "@apollo/client";
import React from "react";
import SaveControl from "../../../SaveControl/SaveControl";
import MovieIcon from "../../../Icons/IconMovie";
import { ContentItemFormat } from "../../../../generated/types";

const id = "singers/1";
const displayName = "Tester Bennington";
const displayImageUrl =
  "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*wFRSaIty-3Ogkl7yHYOaQg.jpeg";

const queryDefaults = {
  loading: false,
  called: true,
  error: undefined,
  data: undefined,
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FocusedSuggestion> = {
  component: FocusedSuggestion,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    anchorWidth: 425,
    expanded: true,
    Icon: <MovieIcon />,
    Primary: <>Phoenix, Arizona</>,
    Secondary: <>{displayName}</>,
    displayImageUrl,
    linkProps: {
      to: generateContentInfoUri({ id: "1234" }),
    },
    itemQuery: {
      ...queryDefaults,
      variables: { id: id },
      data: {
        content: {
          item: {
            id: id,
            format: ContentItemFormat.Movie,
            displayName: displayName,
            displayImageUrl,
            genres: ["Horror", "Documentry"],
          },
        },
      },
    } as FocusedSuggestionProps["itemQuery"],
    SaveControl: <SaveControl saved />,
  },
};
export default meta;

type Story = StoryObj<typeof FocusedSuggestion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    itemQuery: {
      loading: true,
    } as FocusedSuggestionProps["itemQuery"],
    SaveControl: <SaveControl loading />,
  },
};

export const ItemQueryError: Story = {
  args: {
    itemQuery: {
      error: new ApolloError({ errorMessage: "An unexpected error occurred" }),
    } as FocusedSuggestionProps["itemQuery"],
    SaveControl: <SaveControl disabled />,
  },
};
