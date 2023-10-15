import DataContext from "./DataContext";
import { FunctionComponent, ReactNode } from "react";
import { useHaloSuggestionsQuery } from "../../generated/types";
import { useSuggestionCount } from "../SuggestionCarousel/hooks/useSuggestionCount";

type DataContextProviderProps = {
  children: ReactNode;
};
export const DataContextProvider: FunctionComponent<
  DataContextProviderProps
> = ({ children }) => {
  const suggestionCount = useSuggestionCount();
  const suggestionsQuery = useHaloSuggestionsQuery({
    variables: {
      // We're preloading the initial display, and the next item that will display under the paging control.
      preload: suggestionCount + 1,
      preloadLast: true,
    },
  });

  return (
    <DataContext.Provider
      value={{
        suggestionsQuery,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
