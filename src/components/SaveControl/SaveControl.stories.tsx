import type { Meta, StoryObj } from "@storybook/react";
import SaveControl from "./SaveControl";
import { withCard } from "../../../.storybook/decorators";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SaveControl> = {
  component: SaveControl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [withCard],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    disabled: false,
    loading: false,
    mutating: false,
    // onClick: false,
    saved: true,
  },
};

// Support for psuedo states is not fully baked. The addon that should do it has issues
// In particular: [Request] Support for Docs page #40 https://github.com/chromaui/storybook-addon-pseudo-states/issues/40

export default meta;
type Story = StoryObj<typeof SaveControl>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Saved: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

// export const SavedFocus: Story = {
//   // parameters: { pseudo: { focus: true } },
//   // More on args: https://storybook.js.org/docs/react/writing-stories/args
//   args: {},
// };

export const Unsaved: Story = {
  args: {
    saved: false,
  },
};

// export const UnsavedFocus: Story = {
//   // parameters: { pseudo: { focus: true } },
//   args: {
//     saved: false,
//   },
// };

export const Mutating: Story = {
  args: {
    mutating: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    saved: undefined,
  },
};
