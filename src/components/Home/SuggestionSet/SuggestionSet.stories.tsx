import type { Meta, StoryObj } from "@storybook/react";

import SuggestionSet from "./SuggestionSet";
import DataContext from "../DataContext";
import {
  dataContextStoryDefaults,
  dataContextStoryLoading,
} from "../DataContextProvider.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SuggestionSet> = {
  component: SuggestionSet,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
  render: (args) => (
    <DataContext.Provider value={dataContextStoryDefaults}>
      <SuggestionSet {...args} />
    </DataContext.Provider>
  ),
};

export default meta;
type Story = StoryObj<typeof SuggestionSet>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
  render: (args) => (
    <DataContext.Provider value={dataContextStoryLoading}>
      <SuggestionSet {...args} />
    </DataContext.Provider>
  ),
};
