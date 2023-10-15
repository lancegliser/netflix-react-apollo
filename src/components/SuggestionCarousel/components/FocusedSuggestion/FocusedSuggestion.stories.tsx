// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react";
import FocusedSuggestion, { FocusedSuggestionProps } from "./FocusedSuggestion";
import { generateDashboardSearchV1Path } from "../../../Dashboard/Router";
import EntityCategoryIcon from "../../../EntityIcon/EntityCategoryIcon";
import { HaloEntityCategory } from "../../../../generated/types";
import { ApolloError } from "@apollo/client";
import React from "react";
import SaveControl from "../../../SaveControl/SaveControl";

const source = "0";
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
    connectivityQuery: {
      ...queryDefaults,
      data: {
        halo: {
          connectivity: {
            entities: [
              { entity: "1", score: 1 },
              { entity: id, score: 2 },
              { entity: "3", score: 3 },
            ],
          },
        },
      },
    } as FocusedSuggestionProps["connectivityQuery"],
    expanded: true,
    Icon: <EntityCategoryIcon category={HaloEntityCategory.Person} />,
    Primary: <>Phoenix, Arizona</>,
    Secondary: <>{displayName}</>,
    displayImageUrl,
    linkProps: {
      to: generateDashboardSearchV1Path(
        { query: displayName, source: "0" },
        { nodeId: id },
      ),
    },
    nodeQuery: {
      ...queryDefaults,
      variables: {
        id: id,
        sourceId: source,
        sourceUrl: "",
      },
      data: {
        halo: {
          node: {
            id: id,
            entityCategory: "person",
            displayName: displayName,
            displayImageUrl,
            geometry: null,
            hidden: false,
            attributes: {
              band: "Linkin Park",
              platinumAlbums: "1,825",
              topics: ["alternative", "metal"],
            },
            __typename: "HaloNode",
          },
          __typename: "Halo",
        },
      },
    } as FocusedSuggestionProps["nodeQuery"],
    SaveControl: <SaveControl saved />,
    sourcesQuery: {
      ...queryDefaults,
      data: {
        halo: {
          sources: [{ displayName: "Spotify", id: source }],
        },
      },
    } as FocusedSuggestionProps["sourcesQuery"],
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
    nodeQuery: {
      loading: true,
    } as FocusedSuggestionProps["nodeQuery"],
    SaveControl: <SaveControl loading />,
  },
};

export const NodeQueryError: Story = {
  args: {
    nodeQuery: {
      error: new ApolloError({ errorMessage: "An unexpected error occurred" }),
    } as FocusedSuggestionProps["nodeQuery"],
    SaveControl: <SaveControl disabled />,
  },
};

export const ConnectivityQueryError: Story = {
  args: {
    connectivityQuery: {
      error: new ApolloError({ errorMessage: "An unexpected error occurred" }),
    } as FocusedSuggestionProps["connectivityQuery"],
  },
};

export const SourcesQueryError: Story = {
  args: {
    sourcesQuery: {
      error: new ApolloError({ errorMessage: "An unexpected error occurred" }),
    } as FocusedSuggestionProps["sourcesQuery"],
    SaveControl: <SaveControl loading />,
  },
};
