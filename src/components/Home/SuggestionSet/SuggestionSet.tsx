import React from "react";
import SuggestionCarousel from "../../SuggestionCarousel/SuggestionCarousel";
import CompactSuggestionItem from "../../SuggestionCarousel/components/CompactSuggestionItem/CompactSuggestionItem";
import CompactSuggestionController, {
  CompactSuggestionControllerProps,
} from "../../SuggestionCarousel/components/CompactSuggestionController/CompactSuggestionController";
import {
  HaloSuggestionsSetItemFieldsFragment,
  HaloSuggestionsSetFieldsFragment,
} from "../../../generated/types";
import EntityCategoryIcon from "../../EntityIcon/EntityCategoryIcon";
import { useSuggestionCount } from "../../SuggestionCarousel/hooks/useSuggestionCount";
import { generateDashboardSearchV1Path } from "../../Dashboard/Router";

type SuggestionSetProps = {
  lazy?: boolean;
  loading?: boolean;
  set?: HaloSuggestionsSetFieldsFragment;
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
          key={item.nodeId || index}
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
  item: HaloSuggestionsSetItemFieldsFragment,
): CompactSuggestionControllerProps => {
  return {
    ...item,
    Icon: <EntityCategoryIcon category={item.entityCategory} />,
    Primary: item.primary,
    Secondary: item.secondary,
    linkProps: {
      to: generateDashboardSearchV1Path(
        { query: item.searchId, source: item.sourceId },
        { nodeId: item.nodeId, exact: "1" },
      ),
    },
  };
};
