import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  alpha,
  Box,
  Card,
  Grid,
  keyframes,
  Link,
  Rating,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SuggestionContent from "../SuggestionContent/SuggestionContent";
import SuggestionMedia, {
  SuggestionMediaProps,
} from "../SuggestionMedia/SuggestionMedia";
import {
  getSuggestionItemAnimationDuration,
  suggestionCarouselSizes,
} from "../../SuggestionCarousel.constants";
import { generateContentGenreUri } from "../../../Dashboard/Router";
import { SuggestionItemProps } from "../types";
import { throttle } from "lodash";
import { arrowWidth } from "../../../Carousel/components/CarouselArrow/CarouselArrow";
import { ErrorBoundary } from "../../../ErrorBoundary/ErrorBoundary";
import { ContentItemQueryHookResult } from "../../../../generated/types";
import ApolloErrorAlert from "../../../ApolloErrorAlert/ApolloErrorAlert";
import GenreChip from "../../../Genres/GenreChip";

export type FocusedSuggestionProps = SuggestionItemProps &
  ExpandedContentProps & {
    /** An absolute width of the compact suggestion to scale from */
    anchorWidth?: number;
    /** Controls the expanded and collapsed state, animating in-between */
    expanded?: boolean;
    /** A callback to invoke when the element looses user focus */
    onDismiss: () => Promise<void>;
    /** A callback to allow timing sync */
    onImageLoaded?: SuggestionMediaProps["onImageLoaded"];
  };
/**
 * Provides extended information and controls for a node suggestion.
 * Typically, name, location, and image supplied via parameters.
 * A mediating smart component is expected to track its position using a positioning div.
 */
const FocusedSuggestion: FunctionComponent<FocusedSuggestionProps> = ({
  onImageLoaded: propsOnImageLoaded,
  ...props
}) => {
  const { linkProps, expanded, onDismiss } = props;
  const theme = useTheme();
  const duration = getSuggestionItemAnimationDuration(theme);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const onImageLoaded = useCallback(() => {
    setIsImageLoaded(true);
    !!propsOnImageLoaded && propsOnImageLoaded();
  }, [propsOnImageLoaded]);

  const elementRef = useRef<HTMLDivElement>(null);

  const collapsedWidth = props.anchorWidth || 300;
  const expandedWidth = collapsedWidth + arrowWidth * 2;
  const scaleRatio = expandedWidth / collapsedWidth;
  const contentScale = !expanded ? scaleRatio : 1;

  useLayoutEffect(() => {
    if (!elementRef.current) {
      return;
    }

    // There's a nasty bug that can cause fast or erratic mouse movements to leave
    // a focused suggestion in expanded mode. We'll listen to mouse events instead of
    // target.'mouseleave' to ensure we don't get stuck.
    const element = elementRef.current;
    const onMouseMove = throttle(
      (event: MouseEvent) => {
        if (
          !elementRef.current ||
          !event.target ||
          elementRef.current.contains(event.target as Node)
        ) {
          return;
        }
        onDismiss();
      },
      100,
      { leading: true, trailing: true },
    );

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      element.removeEventListener("mousemove", onMouseMove);
    };
  }, [onDismiss]);

  return (
    <Card
      ref={elementRef}
      sx={[
        {
          opacity: 0,
          position: "relative",
          transition: theme.transitions.create(["transform"], {
            duration,
          }),
          transform: [
            `scale(${1 / scaleRatio})`,
            `translateY(-${((scaleRatio - 1) / 2) * 100}%)`,
          ].join(" "),
          width: expandedWidth,
        },
        !!expanded && { transform: ["scale(1)", "translateY(0)"].join(" ") },
        isImageLoaded && { opacity: 1 },
      ]}
    >
      <ErrorBoundary>
        <Box
          sx={{
            aspectRatio: suggestionCarouselSizes.aspectRatio,
            position: "relative",
          }}
        >
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
              <SuggestionMedia
                {...props}
                scale={contentScale}
                lazy={false}
                onImageLoaded={onImageLoaded}
              />
              <SuggestionContent {...props} scale={contentScale} />
            </Link>
          ) : (
            <>
              <SuggestionMedia
                {...props}
                scale={contentScale}
                lazy={false}
                onImageLoaded={onImageLoaded}
              />
              <SuggestionContent {...props} scale={contentScale} />
            </>
          )}
        </Box>
        <ExpandedContent {...props} />
      </ErrorBoundary>
    </Card>
  );
};
export default FocusedSuggestion;

type ExpandedContentProps = {
  itemQuery: ContentItemQueryHookResult;
  SaveControl: ReactNode;
};
const ExpandedContent: FunctionComponent<FocusedSuggestionProps> = ({
  itemQuery,
  SaveControl,
}) => {
  return (
    <Box m={1}>
      {itemQuery.error ? (
        <ApolloErrorAlert error={itemQuery.error} />
      ) : (
        <Grid container direction={"column"} gap={1}>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Ratings itemQuery={itemQuery} />
            <div>{SaveControl}</div>
          </Grid>
          <Genres itemQuery={itemQuery} />
        </Grid>
      )}
    </Box>
  );
};

type RatingsProps = {
  itemQuery: ContentItemQueryHookResult;
};
const Ratings: FunctionComponent<RatingsProps> = ({ itemQuery }) => {
  const theme = useTheme();
  const node = itemQuery.data?.content.item;

  return (
    <Rating
      value={typeof node?.rating === "number" ? node.rating * 5 : undefined}
      readOnly
      sx={[
        {
          // https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Skeleton/Skeleton.js
          "& .MuiRating-icon": {
            color: alpha(
              theme.palette.text.primary,
              theme.palette.mode === "light" ? 0.11 : 0.13,
            ),
            animation: `${pulseKeyframe} 2s ease-in-out 0.5s infinite`, // pulse
          },
        },
      ]}
    />
  );
};

const Genres: FunctionComponent<Pick<FocusedSuggestionProps, "itemQuery">> = ({
  itemQuery,
}) => {
  const theme = useTheme();
  const genres: string[] = itemQuery.data?.content.item.genres ?? [];

  return (
    <>
      {(itemQuery.loading || genres.length > 0) && (
        <Grid container direction={"row"} spacing={1}>
          {itemQuery.loading ? (
            <Grid item>
              <GenreChip
                isLoading={true}
                color={theme.palette.info.main}
                score={"*"}
              />
            </Grid>
          ) : (
            genres?.map((topic) => (
              <Grid item key={topic}>
                <GenreChip
                  text={topic}
                  color={theme.palette.info.main}
                  score={"*"}
                  linkProps={{
                    to: generateContentGenreUri({ id: topic }),
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </>
  );
};

const pulseKeyframe = keyframes`
0% {
  opacity: 1;
}

50% {
  opacity: 0.4;
}

100% {
  opacity: 1;
}
`;
