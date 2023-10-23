// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react";
import SuggestionCarousel from "./SuggestionCarousel";
import { Box } from "@mui/material";
import CompactSuggestionItem from "./components/CompactSuggestionItem/CompactSuggestionItem";
import CompactSuggestionController, {
  CompactSuggestionControllerProps,
} from "./components/CompactSuggestionController/CompactSuggestionController";
import { generateContentInfoUri } from "../Content/Router";

const controllerDefaults: CompactSuggestionControllerProps = {
  Primary: <>Phoenix, Arizona</>,
  Secondary: <>Tester Bennington</>,
  displayImageUrl:
    "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*wFRSaIty-3Ogkl7yHYOaQg.jpeg",
  linkProps: {
    to: generateContentInfoUri({ id: "1234" }),
  },
  lazy: false,
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SuggestionCarousel> = {
  component: SuggestionCarousel,
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
    loading: false,
    LoadingItem: <CompactSuggestionItem loading />,
    items: [
      <CompactSuggestionController {...controllerDefaults} />,
      <CompactSuggestionController {...controllerDefaults} />,
      <CompactSuggestionController {...controllerDefaults} />,
      <CompactSuggestionController {...controllerDefaults} />,
      <CompactSuggestionController {...controllerDefaults} />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
      <CompactSuggestionController {...controllerDefaults} lazy />,
    ],
    title: "Promoted to you",
  },
  render: (args) => (
    <Box width={"75vw"}>
      <SuggestionCarousel {...args} />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof SuggestionCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  args: {},
};

export const VariousItemCounts: Story = {
  args: {
    items: [],
  },
  render: (args) => (
    <Box width={"75vw"}>
      <SuggestionCarousel
        {...args}
        items={[<CompactSuggestionController {...controllerDefaults} />]}
      />
      <SuggestionCarousel
        {...args}
        items={[
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
        ]}
      />
      <SuggestionCarousel
        {...args}
        items={[
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
          <CompactSuggestionController {...controllerDefaults} />,
        ]}
      />
    </Box>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const ViewAll: Story = {
  args: {
    viewAllLinkProps: {
      to: "/view-all",
    },
  },
};
