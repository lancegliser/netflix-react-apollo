import React, { FunctionComponent, memo, ReactNode } from "react";
import { Box, Grid, Link, Skeleton, Typography } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import CarouselPanel from "../Carousel/components/CarouselPanel/CarouselPanel";
import { arrowWidth } from "../Carousel/components/CarouselArrow/CarouselArrow";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { useSuggestionCount } from "./hooks/useSuggestionCount";
import CompactSuggestionFiller from "./components/CompactSuggestionFiller/CompactSuggestionFiller";

type SuggestionCarouselProps = {
  items?: ReactNode[];
  loading?: boolean;
  LoadingItem?: ReactNode;
  title: ReactNode;
  viewAllLinkProps?: LinkProps;
};
const SuggestionCarousel: FunctionComponent<SuggestionCarouselProps> = ({
  items = [],
  loading,
  LoadingItem,
  title,
  viewAllLinkProps,
}) => {
  const suggestionCount = useSuggestionCount();
  if (!items?.length) {
    return null;
  }

  const displaysRequired = suggestionCount + 2;
  const display = [
    ...(loading ? new Array(displaysRequired).fill(LoadingItem) : items),
    ...(items.length < displaysRequired
      ? new Array(displaysRequired - items.length).fill(
          <CompactSuggestionFiller />,
        )
      : []),
  ];
  const panelMargin = 4;

  return (
    <Box component={"section"} width={"100%"} overflow={"hidden"}>
      <Grid
        container
        direction={"row"}
        alignItems={"bottom"}
        gap={1}
        component={"header"}
      >
        <Typography
          variant={"h5"}
          gutterBottom
          noWrap
          sx={{ marginLeft: `${arrowWidth}px` }}
        >
          {loading ? <Skeleton width={"35ch"} /> : title}
        </Typography>
        {viewAllLinkProps && (
          <Typography variant={"body2"}>
            <Link component={RouterLink} {...viewAllLinkProps}>
              View all
            </Link>
          </Typography>
        )}
      </Grid>
      <Carousel
        flickingProps={{
          align: { camera: 0, panel: arrowWidth * -1 },
          circular: !loading,
          // This doesn't actually stop arrow controls, just click and drag
          disableOnInit: true,
        }}
        arrows={{
          enabled: items.length > suggestionCount,
          behavior: "viewport",
        }}
      >
        {display.map((item, index) => (
          <CarouselPanel
            key={index}
            sx={{
              marginRight: `${panelMargin}px`,
              width: `calc(${100 / suggestionCount}% - ${
                (arrowWidth * 2) / suggestionCount
              }px - ${panelMargin}px)`,
              overflow: "hidden",
            }}
          >
            {item}
          </CarouselPanel>
        ))}
      </Carousel>
    </Box>
  );
};
export default memo(SuggestionCarousel);
