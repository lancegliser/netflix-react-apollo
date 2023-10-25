import React, { FunctionComponent, ReactNode } from "react";
import { alpha, Box, useTheme } from "@mui/material";
import { getSuggestionItemAnimationDuration } from "../../SuggestionCarousel.constants";
import { Maybe } from "../../../../generated/types";
import ImageOverlayGradient from "../../../ImageOverlayGradient/ImageOverlayGradient";

export type SuggestionMediaProps = {
  loading?: boolean;
  /** An image to be displayed, if available. Icon will be used otherwise */
  displayImageUrl?: Maybe<string>;
  /** An Icon to be displayed instead of the default "Unknown" icon */
  Icon?: ReactNode;
  /** A hint if this object should load immediately, or delay until in view */
  lazy?: boolean;
  /** A callback to allow timing sync */
  onImageLoaded?: () => void;
  /** A scaling factor applied to the content. Will have to be offset by font sizes. Default 1 */
  scale?: number;
};
const SuggestionMedia: FunctionComponent<SuggestionMediaProps> = ({
  loading,
  displayImageUrl,
  Icon,
  lazy = false,
  onImageLoaded,
  scale = 1,
}) => {
  const theme = useTheme();
  const duration = getSuggestionItemAnimationDuration(theme);
  const padding = theme.spacing(scale);

  return (
    <>
      {(loading || displayImageUrl) && (
        <Box
          sx={{
            background: alpha(theme.palette.common.black, 0.7),
            color: theme.palette.common.white,
            borderRadius: "50%",
            height: theme.spacing(3 * scale),
            left: padding,
            padding: theme.spacing(0.25 * scale),
            position: "absolute",
            top: padding,
            transition: theme.transitions.create(
              ["width", "height", "left", "top", "padding"],
              {
                duration,
              },
            ),
            width: theme.spacing(3 * scale),
            zIndex: 2,
            "& > svg": {
              height: "100%",
              width: "100%",
            },
          }}
        >
          {!loading && Icon}
        </Box>
      )}

      <ImageOverlayGradient
        loading={loading}
        imgProps={{
          src: displayImageUrl || "",
          onLoad: onImageLoaded,
          loading: lazy ? "lazy" : undefined,
        }}
      />
    </>
  );
};
export default SuggestionMedia;
