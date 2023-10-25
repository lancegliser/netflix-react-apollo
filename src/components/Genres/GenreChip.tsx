import React, { FunctionComponent } from "react";
import {
  Box,
  BoxProps,
  Link,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export type GenreChipProps = BoxProps & {
  isLoading?: boolean;
  text?: string;
  score?: "*" | ">" | number;
  color?: string;
  linkProps?: RouterLinkProps;
};
const GenreChip: React.FunctionComponent<GenreChipProps> = ({
  linkProps,
  ...props
}) => {
  return linkProps ? (
    <Link
      color={"inherit"}
      underline={"none"}
      display={"inline-block"}
      component={RouterLink}
      {...linkProps}
    >
      <GenreChipContent {...props} />
    </Link>
  ) : (
    <GenreChipContent {...props} />
  );
};
export default GenreChip;

type GenreChipContentProps = Omit<GenreChipProps, "linkProps">;
const GenreChipContent: FunctionComponent<GenreChipContentProps> = ({
  isLoading,
  text,
  score,
  color,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box
      {...props}
      sx={[
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        {
          background: theme.palette.background.paper,
          border: `solid 2px ${theme.palette.divider}`,
          borderRadius: 3,
          display: "flex",
          flexFlow: "row nowrap",
          position: "relative",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        },
      ]}
      style={{ borderColor: color }}
    >
      <Typography
        variant={"body2"}
        sx={{
          lineHeight: 1,
          flexGrow: 1,
          padding: theme.spacing(1),
        }}
      >
        {isLoading ? (
          <Skeleton width={"15ch"} sx={{ display: "inline-block" }} />
        ) : (
          text
        )}
      </Typography>
    </Box>
  );
};
