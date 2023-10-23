import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Card, Link, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  getSuggestionItemAnimationDuration,
  suggestionCarouselSizes,
  suggestionCarouselTimingsMultipliers,
} from "../../SuggestionCarousel.constants";
import SuggestionContent from "../SuggestionContent/SuggestionContent";
import SuggestionMedia, {
  SuggestionMediaProps,
} from "../SuggestionMedia/SuggestionMedia";
import { SuggestionItemProps } from "../types";
import { throttle } from "lodash";
import { ErrorBoundary } from "../../../ErrorBoundary/ErrorBoundary";

export type CompactSuggestionItemProps = SuggestionItemProps & {
  loading?: boolean;
  /**
   * A callback to be fired when the user has paused over this suggestion item indicating potential interest.
   * If they remain onFocused will fire and FocusedSuggestion is displayed.
   * */
  onFocusIntended?: (element: HTMLDivElement) => void;
  /** A callback to be fired when the FocusedSuggestion is displayed */
  onFocusCaptured?: (element: HTMLDivElement) => void;
  /** A hint if this object should load immediately, or delay until in view */
  lazy?: SuggestionMediaProps["lazy"];
  element?: HTMLDivElement | null;
  setElement?: Dispatch<SetStateAction<CompactSuggestionItemProps["element"]>>;
};
/**
 * Provides limited information about a node suggestion.
 * Typically, name, location, and image supplied via parameters.
 * Enables user interaction through hover effects focus timing callbacks.
 * A mediating smart component is expected to track its timing, position, and data loading.
 */
const CompactSuggestionItem: FunctionComponent<CompactSuggestionItemProps> = ({
  lazy,
  element,
  setElement,
  ...props
}) => {
  const { linkProps, onFocusIntended, onFocusCaptured } = props;
  const theme = useTheme();
  const animationDuration = getSuggestionItemAnimationDuration(theme);

  const focusIntendedTimer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();
  const focusCapturedTimer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();
  const clearTimers = useCallback(() => {
    clearTimeout(focusIntendedTimer.current);
    clearTimeout(focusCapturedTimer.current);
  }, []);

  const onMouseEnter: EventListener = useCallback(() => {
    if (!element) {
      return;
    }

    focusIntendedTimer.current = setTimeout(() => {
      !!onFocusIntended && onFocusIntended(element!);
    }, suggestionCarouselTimingsMultipliers.focusIntended * animationDuration);

    focusCapturedTimer.current = setTimeout(() => {
      !!onFocusCaptured && onFocusCaptured(element!);
    }, suggestionCarouselTimingsMultipliers.focusCaptured * animationDuration);
  }, [element, onFocusCaptured, onFocusIntended, animationDuration]);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const throttledMouseEvent = throttle(onMouseEnter, 100);
    element.addEventListener("mouseover", throttledMouseEvent);
    element.addEventListener("mouseleave", clearTimers);
    return () => {
      element.removeEventListener("mouseover", throttledMouseEvent);
      element.removeEventListener("mouseleave", clearTimers);
      clearTimers();
    };
  }, [element, onMouseEnter, clearTimers]);

  return (
    <Card
      ref={setElement}
      sx={{
        position: "relative",
        aspectRatio: suggestionCarouselSizes.aspectRatio,
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
      }}
    >
      <ErrorBoundary>
        {linkProps ? (
          <Link
            display={"inline-block"}
            component={RouterLink}
            color={"inherit"}
            underline={"none"}
            width={"100%"}
            height={"100%"}
            {...linkProps}
          >
            <SuggestionMedia {...props} lazy={lazy} />
            <SuggestionContent {...props} />
          </Link>
        ) : (
          <>
            <SuggestionMedia {...props} lazy={lazy} />
            <SuggestionContent {...props} />
          </>
        )}
      </ErrorBoundary>
    </Card>
  );
};
export default CompactSuggestionItem;
