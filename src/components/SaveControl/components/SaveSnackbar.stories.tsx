import type { Meta, StoryObj } from "@storybook/react";
import SaveSnackbar from "./SaveSnackbar";
import { getLoremIpsumParagraphs } from "@torch-ai-internal/react-display-components/lib/utils/storybook";

const oneLoremIpsum = getLoremIpsumParagraphs(1);
const twoSentences = oneLoremIpsum.split(".").slice(0, 1).join(". ") + ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SaveSnackbar> = {
  component: SaveSnackbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    action: "saved",
    displayName: <>Tester Bennington</>,
    displayImageUrl:
      "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*wFRSaIty-3Ogkl7yHYOaQg.jpeg",
  },
};

export default meta;
type Story = StoryObj<typeof SaveSnackbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const SaveSuccess: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const SaveSuccessWithoutImage: Story = {
  args: {
    displayImageUrl: undefined,
  },
};

export const SaveError: Story = {
  args: {
    error: new Error(twoSentences),
  },
};

export const RemoveSuccess: Story = {
  args: {
    action: "removed",
  },
};

export const RemoveError: Story = {
  args: {
    action: "removed",
    error: new Error(twoSentences),
  },
};
