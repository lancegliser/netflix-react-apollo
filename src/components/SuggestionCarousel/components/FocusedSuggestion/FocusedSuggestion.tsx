import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Box, Card, Chip, Grid, Link, Skeleton, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ErrorBoundary } from "@torch-ai-internal/react-display-components/lib/components/Feedback/ErrorBoundary/ErrorBoundary";
import SuggestionContent from "../SuggestionContent/SuggestionContent";
import SuggestionMedia, {
  SuggestionMediaProps,
} from "../SuggestionMedia/SuggestionMedia";
import {
  getSuggestionItemAnimationDuration,
  suggestionCarouselSizes,
} from "../../SuggestionCarousel.constants";
import {
  HaloConnectivityQueryHookResult,
  HaloNodeQueryHookResult,
  HaloSourcesQueryHookResult,
} from "../../../../generated/types";
import ApolloErrorAlert from "@torch-ai-internal/react-display-components/lib/components/Feedback/ApolloErrorAlert/ApolloErrorAlert";
import TopicChip from "../../../Topics/TopicChip";
import { generateDashboardSearchV1Path } from "../../../Dashboard/Router";
import { SuggestionItemProps } from "../types";
import { throttle } from "lodash";
import { arrowWidth } from "../../../Carousel/components/CarouselArrow/CarouselArrow";
import EntityRatings from "../../../EntityRatings/EntityRatings";

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
  connectivityQuery: HaloConnectivityQueryHookResult;
  nodeQuery: HaloNodeQueryHookResult;
  /** A lighter weight source query, we only need the display name and this will be used on many pages anyway. */
  sourcesQuery: HaloSourcesQueryHookResult;
  SaveControl: ReactNode;
};
const ExpandedContent: FunctionComponent<FocusedSuggestionProps> = ({
  connectivityQuery,
  nodeQuery,
  sourcesQuery,
  SaveControl,
}) => {
  return (
    <Box m={1}>
      {nodeQuery.error ? (
        <ApolloErrorAlert error={nodeQuery.error} />
      ) : (
        <Grid container direction={"column"} gap={1}>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Ratings
              nodeQuery={nodeQuery}
              connectivityQuery={connectivityQuery}
            />
            <div>{SaveControl}</div>
          </Grid>
          <EcosystemTag nodeQuery={nodeQuery} sourcesQuery={sourcesQuery} />
          <Topics nodeQuery={nodeQuery} />
          <ApolloErrorAlert error={connectivityQuery.error} />
        </Grid>
      )}
    </Box>
  );
};

type RatingsProps = {
  connectivityQuery: HaloConnectivityQueryHookResult;
  nodeQuery: HaloNodeQueryHookResult;
};
const Ratings: FunctionComponent<RatingsProps> = ({
  connectivityQuery,
  nodeQuery,
}) => {
  const node = nodeQuery.data?.halo.node;

  const facts = node?.attributes
    ? Object.entries(node.attributes).length
    : undefined;
  const ltdMaximum =
    connectivityQuery?.data?.halo.connectivity.entities.at(0)?.score;
  const ltdScore = node?.id
    ? connectivityQuery?.data?.halo.connectivity.entities.find(
        ({ entity }) => entity === node.id,
      )?.score
    : undefined;

  return (
    <EntityRatings
      centrality={false}
      loading={nodeQuery.loading || connectivityQuery.loading}
      facts={facts}
      ltdRank={{
        value: ltdScore,
        maximum: ltdMaximum,
      }}
    />
  );
};

type EcosystemProps = {
  nodeQuery: HaloNodeQueryHookResult;
  /** A lighter weight source query, we only need the display name and this will be used on many pages anyway. */
  sourcesQuery: HaloSourcesQueryHookResult;
};
const EcosystemTag: FunctionComponent<EcosystemProps> = ({
  nodeQuery,
  sourcesQuery,
}) => {
  const sourceDisplayName = nodeQuery.variables?.sourceId
    ? sourcesQuery.data?.halo.sources.find(
        (source) => source.id === nodeQuery.variables?.sourceId,
      )?.displayName
    : undefined;

  return sourcesQuery.error ? (
    <ApolloErrorAlert error={sourcesQuery.error} />
  ) : (
    <Box>
      <Chip
        label={
          nodeQuery.loading || sourcesQuery.loading ? (
            <Skeleton width={"12ch"} />
          ) : (
            sourceDisplayName
          )
        }
        variant="outlined"
      />
    </Box>
  );
};

const Topics: FunctionComponent<Pick<FocusedSuggestionProps, "nodeQuery">> = ({
  nodeQuery,
}) => {
  const theme = useTheme();
  const sourceId = nodeQuery.variables?.sourceId;
  const topics: string[] = nodeQuery.data?.halo.node.attributes.topics ?? [];

  return (
    <>
      {(nodeQuery.loading || topics.length > 0) && (
        <Grid container direction={"row"} spacing={1}>
          {nodeQuery.loading ? (
            <Grid item>
              <TopicChip
                isLoading={true}
                color={theme.palette.info.main}
                score={"*"}
              />
            </Grid>
          ) : (
            topics?.map((topic) => (
              <Grid item key={topic}>
                <TopicChip
                  text={topic}
                  color={theme.palette.info.main}
                  score={"*"}
                  linkProps={{
                    to: generateDashboardSearchV1Path(
                      { query: topic, source: sourceId! },
                      { exact: "1" },
                    ),
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
