// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
import { ReactRenderer, StoryObj } from "@storybook/react";
import CompactSuggestionController from "./CompactSuggestionController";
import { ComponentProps } from "react";
import { ComponentAnnotations } from "@storybook/types";
import { Box } from "@mui/material";
import EntityCategoryIcon from "../../../EntityIcon/EntityCategoryIcon";
import { HaloEntityCategory } from "../../../../generated/types";
import { generateDashboardSearchV1Path } from "../../../Dashboard/Router";

type ControlArgs = {
  width: string;
};
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: ComponentAnnotations<
  ReactRenderer,
  ComponentProps<typeof CompactSuggestionController> & ControlArgs
> = {
  component: CompactSuggestionController,
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
    Icon: <EntityCategoryIcon category={HaloEntityCategory.Person} />,
    Primary: <>Phoenix, Arizona</>,
    Secondary: <>Tester Bennington</>,
    displayImageUrl:
      "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*wFRSaIty-3Ogkl7yHYOaQg.jpeg",
    linkProps: {
      to: generateDashboardSearchV1Path(
        { query: "Tester Bennington", source: "0" },
        { nodeId: "singers/1" },
      ),
    },
    width: "300px",
    lazy: false,
  },
  render: ({ width, ...args }) => (
    <Box width={width}>
      <CompactSuggestionController {...args} />
    </Box>
  ),
};
export default meta;

type Story = StoryObj<typeof CompactSuggestionController>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Person: Story = {
  args: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Base64Image: Story = {
  args: {
    displayImageUrl:
      "data:image/png;base64, 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",
  },
};
