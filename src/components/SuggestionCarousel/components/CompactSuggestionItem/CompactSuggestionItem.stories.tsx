// noinspection JSUnusedGlobalSymbols

import { ComponentProps, FunctionComponent, useState } from "react";
import { ComponentAnnotations } from "@storybook/types";
import type { ReactRenderer, StoryObj } from "@storybook/react";
import CompactSuggestionItem, {
  CompactSuggestionItemProps,
} from "./CompactSuggestionItem";
import { generateContentInfoUri } from "../../../Content/Router";
import { Box } from "@mui/material";
import MovieIcon from "../../../Icons/IconMovie";

type ControlArgs = {
  width: string;
};

const Renderer: FunctionComponent<
  Omit<CompactSuggestionItemProps, "element" | "setElement">
> = (props) => {
  const [element, setElement] =
    useState<CompactSuggestionItemProps["element"]>(null);

  return (
    <CompactSuggestionItem
      element={element}
      setElement={setElement}
      {...props}
    />
  );
};
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: ComponentAnnotations<
  ReactRenderer,
  ComponentProps<typeof CompactSuggestionItem> & ControlArgs
> = {
  component: CompactSuggestionItem,
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
    Icon: <MovieIcon />,
    Primary: <>Phoenix, Arizona</>,
    Secondary: <>Tester Bennington</>,
    displayImageUrl:
      "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*wFRSaIty-3Ogkl7yHYOaQg.jpeg",
    linkProps: {
      to: generateContentInfoUri({ id: "1234" }),
    },
    loading: false,
    width: "300px",
  },
  render: ({ width, ...args }) => (
    <Box width={width}>
      <Renderer {...args} />
    </Box>
  ),
};
export default meta;

type Story = StoryObj<typeof CompactSuggestionItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Movie: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
