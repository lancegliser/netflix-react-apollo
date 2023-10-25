import React, { FunctionComponent, ReactNode } from "react";
import {
  Box,
  Grid,
  GridProps,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { getSuggestionItemAnimationDuration } from "../../SuggestionCarousel.constants";
import { Maybe } from "../../../../generated/types";

type SuggestionContentProps = {
  loading?: boolean;
  /** Content to be placed into the primary line of the suggestion */
  Primary?: Maybe<ReactNode>;
  /** Content to be placed into the secondary line of the suggestion */
  Secondary?: Maybe<ReactNode>;
  /** An image to be displayed, if available. Icon will be used otherwise */
  displayImageUrl?: Maybe<string>;
  /** An Icon to be displayed instead of the default "Unknown" icon */
  Icon?: ReactNode;
  gridProps?: GridProps;
  /** A scaling factor applied to the content. Will have to be offset by font sizes. Default 1 */
  scale?: number;
};
const SuggestionContent: FunctionComponent<SuggestionContentProps> = ({
  loading,
  displayImageUrl,
  Primary,
  Secondary,
  Icon,
  gridProps,
  scale = 1,
}) => {
  const theme = useTheme();
  const duration = getSuggestionItemAnimationDuration(theme);
  const padding = theme.spacing(scale);

  return (
    <Grid
      container
      flexDirection={"column"}
      height={"100%"}
      position={"relative"}
      zIndex={1}
      overflow={"hidden"}
      {...gridProps}
    >
      <Grid
        item
        flexGrow={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loading && !displayImageUrl && (
          <Box
            sx={{
              "& > svg": {
                background: theme.palette.common.black,
                borderRadius: "50%",
                height: theme.spacing(10 * scale),
                padding: theme.spacing(1),
                width: theme.spacing(10 * scale),
                transition: theme.transitions.create(["width", "height"], {
                  duration,
                }),
              },
            }}
          >
            {Icon}
          </Box>
        )}
      </Grid>
      <Grid
        item
        sx={{
          // background: contentBackground,
          // backdropFilter: contentBackdropFilter,
          maxWidth: "100%",
          overflow: "hidden",
          padding,
          // transition: theme.transitions.create(
          //   ["background", "backdropFilter"],
          //   { duration: theme.transitions.duration.complex },
          // ),
        }}
      >
        {(loading || Primary) && (
          <SuggestionContentLine primary loading={loading} scale={scale}>
            {Primary}
          </SuggestionContentLine>
        )}
        {(loading || Secondary) && (
          <SuggestionContentLine loading={loading} scale={scale}>
            {Secondary}
          </SuggestionContentLine>
        )}
      </Grid>
    </Grid>
  );
};
export default SuggestionContent;

type SuggestionContentLineProps = {
  loading?: boolean;
  primary?: boolean;
  /** A scaling factor applied to the content. Will have to be offset by font sizes. */
  scale: number;
  children: ReactNode;
};
const SuggestionContentLine: FunctionComponent<SuggestionContentLineProps> = ({
  loading,
  primary,
  scale,
  children,
}) => {
  const theme = useTheme();
  const duration = getSuggestionItemAnimationDuration(theme);

  return (
    <Typography
      noWrap
      lineHeight={1.2}
      fontSize={`${1.125 * scale}rem !important`}
      fontWeight={primary ? 800 : undefined}
      color={theme.palette.common.white}
      sx={{
        transition: theme.transitions.create(["font-size"], {
          duration,
        }),
      }}
    >
      {loading ? <Skeleton width={primary ? "60%" : "85%"} /> : children}
    </Typography>
  );
};
