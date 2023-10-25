import React from "react";
import SuggestionCarousel from "../../SuggestionCarousel/SuggestionCarousel";
import CompactSuggestionItem from "../../SuggestionCarousel/components/CompactSuggestionItem/CompactSuggestionItem";
import CompactSuggestionController, {
  CompactSuggestionControllerProps,
} from "../../SuggestionCarousel/components/CompactSuggestionController/CompactSuggestionController";
import { useSuggestionCount } from "../../SuggestionCarousel/hooks/useSuggestionCount";
import { generateContentInfoUri } from "../../Content/Router";
import {
  ContentSuggestionsSetFieldsFragment,
  ContentSuggestionsSetItemFieldsFragment,
} from "../../../generated/types";
import MovieIcon from "../../Icons/IconMovie";

type SuggestionSetProps = {
  lazy?: boolean;
  loading?: boolean;
  set?: ContentSuggestionsSetFieldsFragment;
};
const SuggestionSet: React.FunctionComponent<SuggestionSetProps> = ({
  lazy,
  loading,
  set,
}) => {
  const suggestionCount = useSuggestionCount();

  return loading ? (
    <SuggestionCarousel
      title={<></>}
      loading
      LoadingItem={<CompactSuggestionItem loading />}
    />
  ) : (
    <SuggestionCarousel
      title={set?.displayName}
      items={set?.items.map((item, index) => (
        <CompactSuggestionController
          key={item.id || index}
          lazy={
            // Passed from the set so we know not to force preloads on sets too far down on the page
            lazy ||
            // We can't be lazy about the displayed items
            index > suggestionCount + 1
          }
          {...getSuggestionItemProps(item)}
        />
      ))}
    />
  );
};
export default SuggestionSet;

const getSuggestionItemProps = (
  item: ContentSuggestionsSetItemFieldsFragment,
): CompactSuggestionControllerProps => {
  return {
    ...item,
    Icon: <MovieIcon />,
    Primary: item.primary,
    Secondary: item.secondary,
    linkProps: {
      to: generateContentInfoUri({ id: item.id }),
    },
  };
};
