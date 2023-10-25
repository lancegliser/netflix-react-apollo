import { LinkProps } from "react-router-dom";
import { ReactNode } from "react";
import { Maybe } from "../../../generated/types";

export type SuggestionItemProps = {
  linkProps?: LinkProps;
  /** Content to be placed into the primary line of the suggestion */
  Primary?: ReactNode;
  /** Content to be placed into the secondary line of the suggestion */
  Secondary?: ReactNode;
  /** An image to be displayed, if available. Icon will be used otherwise */
  displayImageUrl?: Maybe<string>;
  /** An Icon to be displayed instead of the default "Unknown" icon */
  Icon?: ReactNode;
};
