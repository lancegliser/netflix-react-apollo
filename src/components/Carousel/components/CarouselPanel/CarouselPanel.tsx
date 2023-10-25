import React, { forwardRef, ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

export type CarouselPanelProps = BoxProps & {
  children: ReactNode;
};
/**
 * A forwarding ref enabled component as required by Flicking that can provide additional styling controls.
 */
const CarouselPanel = forwardRef<unknown, CarouselPanelProps>(
  ({ children, ...props }, ref) => (
    <Box component={"section"} {...props} ref={ref}>
      {children}
    </Box>
  ),
);
export default CarouselPanel;
