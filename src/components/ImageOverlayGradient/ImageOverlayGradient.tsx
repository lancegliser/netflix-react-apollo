import React, { FunctionComponent, ImgHTMLAttributes } from "react";
import { alpha, Grid, GridProps, Skeleton, useTheme } from "@mui/material";

type ImageOverlayGradientProps = {
  loading?: boolean;
  gridProps?: GridProps;
  imgProps: Omit<ImgHTMLAttributes<HTMLImageElement>, "height" | "width">;
};
const ImageOverlayGradient: FunctionComponent<ImageOverlayGradientProps> = ({
  loading,
  gridProps = {},
  imgProps = {},
}) => {
  const theme = useTheme();
  const overlayColor = theme.palette.common.black;

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      position={"absolute"}
      height={"100%"}
      width={"100%"}
      zIndex={0}
      {...gridProps}
      sx={[
        {
          background: theme.palette.divider,
          "::before": {
            content: `""`,
            position: "absolute",
            inset: "0 0 0 0",
            zIndex: "1",
            background: `linear-gradient(to bottom, ${[
              [alpha(overlayColor, 0.0), "38.02%"].join(" "),
              alpha(overlayColor, 0.8),
            ].join(",")})`,
          },
          "& img": {
            objectFit: "cover",
            objectPosition: "center center",
          },
        },
        ...(Array.isArray(gridProps.sx) ? gridProps.sx : [gridProps.sx]),
      ]}
    >
      {loading ? (
        <Skeleton variant={"rectangular"} width={"100%"} height={"100%"} />
      ) : (
        imgProps.src && (
          <img {...imgProps} height={"100%"} width={"100%"} alt={""} />
        )
      )}
    </Grid>
  );
};
export default ImageOverlayGradient;
