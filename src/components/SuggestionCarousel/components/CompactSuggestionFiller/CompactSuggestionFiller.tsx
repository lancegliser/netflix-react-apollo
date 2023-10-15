import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import { suggestionCarouselSizes } from "../../SuggestionCarousel.constants";

const CompactSuggestionFiller: FunctionComponent = () => {
  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: suggestionCarouselSizes.aspectRatio,
      }}
    />
  );
};
export default CompactSuggestionFiller;
