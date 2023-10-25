import { forwardRef, ReactNode } from "react";
import { SnackbarContent, CustomContentProps } from "notistack";
import { IDisplayImage, Maybe } from "../../../generated/types";
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

// See https://notistack.com/features/customization#custom-component
type Action = "saved" | "removed";

declare module "notistack" {
  // noinspection JSUnusedGlobalSymbols
  interface VariantOverrides {
    save: {
      action: Action;
      displayName: ReactNode;
      displayImageUrl?: Maybe<string>;
      error?: Error;
    };
  }
}

export type SaveSnackbarProps = CustomContentProps &
  IDisplayImage & {
    action: Action;
    displayName: ReactNode;
    error?: Error;
  };
const SaveSnackbar = forwardRef<HTMLDivElement, SaveSnackbarProps>(
  (props, ref) => {
    const {
      // You have access to notistack props and options 👇🏼
      // id,
      // message,
      action,
      displayName,
      displayImageUrl,
      error,
    } = props;
    const theme = useTheme();
    const imageSize = theme.spacing(6);
    const paddingY = 1.5;
    const paddingX = 1;

    return (
      <SnackbarContent ref={ref} role="alert">
        <Alert
          color={!error ? "success" : "error"}
          sx={{
            padding: 0,
            "& .MuiAlert-icon": {
              padding: theme.spacing(paddingY, 0, paddingY, paddingX),
            },
            "& .MuiAlert-message": {
              padding: 0,
            },
          }}
        >
          <Grid
            container
            direction={"row"}
            alignItems={"top"}
            justifyContent={"space-between"}
            flexWrap={"nowrap"}
          >
            <Box
              sx={{ maxWidth: "30em", padding: theme.spacing(paddingY, 0) }}
              marginRight={2}
              flexGrow={1}
            >
              <AlertTitle sx={[!error && { marginBottom: 0 }]}>
                {!error ? (
                  <>
                    {displayName} {action}
                  </>
                ) : (
                  <>
                    {displayName} could not be {action}
                  </>
                )}
              </AlertTitle>
              {error && (
                <Typography variant={"inherit"}>{error.message}</Typography>
              )}
            </Box>
            {displayImageUrl && (
              <Box
                sx={{
                  "& > img": {
                    aspectRatio: "1",
                    borderRadius: theme.spacing(0.5),
                    display: "block",
                    height: imageSize,
                    objectFit: "cover",
                    objectPosition: "center center",
                  },
                }}
              >
                <img src={displayImageUrl} alt="" />
              </Box>
            )}
          </Grid>
        </Alert>
      </SnackbarContent>
    );
  },
);
export default SaveSnackbar;
