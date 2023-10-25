// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react";
import Carousel, { CarouselProps } from "./Carousel";
import React, { FunctionComponent, ReactNode } from "react";
import { Box, Theme, useTheme } from "@mui/material";
import CarouselPanel, {
  CarouselPanelProps,
} from "./components/CarouselPanel/CarouselPanel";

const getPanels = (
  theme: Theme,
  props?: Omit<CarouselPanelProps, "children">,
): ReactNode[] =>
  [
    theme.palette.warning,
    theme.palette.success,
    theme.palette.error,
    theme.palette.info,
    theme.palette.warning,
    theme.palette.success,
    theme.palette.error,
    theme.palette.info,
  ].map((color, index) => (
    <CarouselPanel
      key={[index, color.main].join(":")}
      {...props}
      sx={[
        {
          height: 200,
          width: "33.333%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ...(!props?.sx
          ? []
          : Array.isArray(props?.sx)
          ? props?.sx
          : [props?.sx]),
      ]}
      style={{ background: color.main, color: color.contrastText }}
    >
      {index} - {color.main}
    </CarouselPanel>
  ));

const Template: FunctionComponent<
  Omit<CarouselProps, "children"> & {
    panelProps?: Omit<CarouselPanelProps, "children">;
  }
> = ({ panelProps, ...props }) => {
  const theme = useTheme();

  return (
    <Box width={"85vw"} sx={{ border: "solid 5px grey" }}>
      <Carousel {...props}>
        {getPanels(theme, panelProps).map((Panel) => Panel)}
      </Carousel>
    </Box>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Carousel> = {
  component: Carousel,
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
    arrows: {
      enabled: false,
      behavior: "item",
    },
  },
  render: (args) => <Template {...args} />,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  args: {},
};

export const EnableArrows: Story = {
  args: {
    arrows: {
      enabled: true,
    },
  },
};

export const HoverArrows: Story = {
  args: {
    arrows: {
      enabled: "hover",
    },
  },
};

export const ArrowBehaviorViewport: Story = {
  args: {
    arrows: {
      enabled: true,
      behavior: "viewport",
    },
  },
};

export const WithContentGaps: Story = {
  args: {},
  render: (args) => (
    <Template
      {...args}
      panelProps={{
        sx: {
          width: "calc(33.333% - .5rem)",
          marginRight: ".5rem",
        },
      }}
    />
  ),
};

export const WithContentHoverZoom: Story = {
  args: {},
  render: (args) => (
    <Template
      {...args}
      panelProps={{
        sx: (theme) => ({
          position: "relative",
          zIndex: 1,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.complex,
          }),
          transform: "scale(1)",
          "&:hover": {
            zIndex: 2,
            transform: "scale(1.5)",
          },
        }),
      }}
    />
  ),
};

export const KitchenSink: Story = {
  args: {
    arrows: {
      enabled: true,
    },
  },
  render: (args) => (
    <Template
      {...args}
      panelProps={{
        sx: (theme) => ({
          width: "calc(33.333% - .5rem)",
          marginRight: ".5rem",
          position: "relative",
          zIndex: 1,
          transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.complex,
          }),
          transform: "scale(1)",
          "&:hover": {
            zIndex: 2,
            transform: "scale(1.5)",
          },
        }),
      }}
    />
  ),
};

export const IndependentCarousels: Story = {
  args: {
    arrows: {
      enabled: true,
    },
  },
  render: (args) => (
    <Box>
      <Template {...args} />
      <hr />
      <Template {...args} />
    </Box>
  ),
};
