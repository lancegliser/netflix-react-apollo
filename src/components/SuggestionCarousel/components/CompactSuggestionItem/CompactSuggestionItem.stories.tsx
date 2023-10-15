// noinspection JSUnusedGlobalSymbols

import { ComponentProps, FunctionComponent, useState } from "react";
import { ComponentAnnotations } from "@storybook/types";
import type { ReactRenderer, StoryObj } from "@storybook/react";
import CompactSuggestionItem, {
  CompactSuggestionItemProps,
} from "./CompactSuggestionItem";
import { generateDashboardSearchV1Path } from "../../../Dashboard/Router";
import EntityCategoryIcon from "../../../EntityIcon/EntityCategoryIcon";
import { HaloEntityCategory } from "../../../../generated/types";
import { Box } from "@mui/material";

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
export const Person: Story = {
  args: {},
};

export const PersonMissingImage: Story = {
  args: {
    displayImageUrl: undefined,
  },
};

export const PersonMissingPrimary: Story = {
  args: {
    Primary: undefined,
  },
};

export const PersonMissingSecondary: Story = {
  args: {
    Secondary: undefined,
  },
};

export const Organization: Story = {
  args: {
    displayImageUrl:
      "https://www.w3.org/cms-uploads/Hero-illustrations/groups.svg",
    Icon: <EntityCategoryIcon category={HaloEntityCategory.Organization} />,
    Primary: <>International</>,
    Secondary: <abbr title={"The World Wide Web Consortium "}>W3C</abbr>,
    linkProps: {
      to: generateDashboardSearchV1Path(
        { query: "W3C", source: "0" },
        { nodeId: "organizations/1" },
      ),
    },
  },
};

export const Content: Story = {
  args: {
    displayImageUrl: undefined,
    Icon: <EntityCategoryIcon category={HaloEntityCategory.Content} />,
    Primary: <>https://www.w3.org/2001/tag/doc/web-https</>,
    Secondary: <>Securing the Web</>,
    linkProps: {
      to: generateDashboardSearchV1Path(
        { query: "Securing the Web", source: "0" },
        { nodeId: "papers/1" },
      ),
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
