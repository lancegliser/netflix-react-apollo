import { Theme } from "@mui/material";

export const getSuggestionItemAnimationDuration = (theme: Theme): number =>
  theme.transitions.duration.standard;

export const suggestionCarouselTimingsMultipliers = {
  /** A multiplier to apply to a duration determining when user's attention is considered likely */
  focusIntended: 0.75,
  /** A multiplier to apply to a duration determining when user's attention is considered assured and we should react */
  focusCaptured: 1.5,
};

export const suggestionCarouselSizes = {
  /** Aspect ratio controller for the SuggestionMedia img container */
  aspectRatio: 1.3974358974,
};
