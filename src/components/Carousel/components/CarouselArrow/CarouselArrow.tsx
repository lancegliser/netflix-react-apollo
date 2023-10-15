import { FunctionComponent } from "react";
import { alpha, ButtonBase, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";

export type CarouselArrowProps = {
  direction: "next" | "previous";
  visible?: boolean;
};
const CarouselArrow: FunctionComponent<CarouselArrowProps> = ({
  direction,
  visible,
}) => {
  const theme = useTheme();

  return (
    <>
      <ButtonBase
        tabIndex={-1}
        sx={[
          {
            background: alpha(theme.palette.background.paper, 0.6),
            bottom: 0,
            position: "absolute",
            zIndex: 3,
            top: 0,
            // We're adding a very slight addition here to ensure rounding arrows
            // are never exposed uncovered.
            width: `${arrowWidth + 1}px`,
            "&.flicking-arrow-disabled": {
              opacity: theme.palette.action.disabledOpacity,
            },
          },
          !visible && { visibility: "hidden" },
          direction === "next" && { right: 0 },
          direction === "previous" && { left: 0 },
        ]}
        className={
          direction === "next" ? nextArrowClassName : previousArrowClassName
        }
      >
        <ArrowForwardIcon
          sx={[
            direction === "next" && {},
            direction === "previous" && { transform: "rotate(180deg)" },
          ]}
        />
      </ButtonBase>
    </>
  );
};
export default CarouselArrow;

export const previousArrowClassName = "arrow-previous";
export const nextArrowClassName = "next-previous";
/** A pixel width of the space allotted for a single paging control. */
export const arrowWidth = 68;
