import { FunctionComponent } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";

export type SaveControlProps = IconButtonProps & {
  loading?: boolean;
  mutating?: boolean;
  saved?: boolean;
};
const SaveControl: FunctionComponent<SaveControlProps> = ({
  loading,
  mutating,
  saved,
  ...props
}) => {
  return (
    <IconButton
      color={"info"}
      {...props}
      disabled={props.disabled || loading || mutating}
      sx={[
        {
          ".static": { display: "block" },
          ".decorated": { display: "none" },
          "&:hover,:focus": {
            ".static": { display: "none" },
            ".decorated": { display: "block" },
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
      title={!saved ? "Add to saved" : "Remove from saved"}
    >
      {mutating ? (
        <CircularProgress size={24} />
      ) : !saved ? (
        <>
          <BookmarkBorderOutlinedIcon className={"static"} />
          <BookmarkAddOutlinedIcon className={"decorated"} />
        </>
      ) : (
        <>
          <BookmarkIcon className={"static"} />
          <BookmarkRemoveIcon className={"decorated"} />
        </>
      )}
    </IconButton>
  );
};
export default SaveControl;
