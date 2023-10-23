import DataContext from "./DataContext";
import { FunctionComponent, ReactNode } from "react";
import { useSuggestionCount } from "../SuggestionCarousel/hooks/useSuggestionCount";
import { useContentSuggestionsQuery } from "../../generated/types";

type DataContextProviderProps = {
  children: ReactNode;
};
export const DataContextProvider: FunctionComponent<
  DataContextProviderProps
> = ({ children }) => {
  const suggestionCount = useSuggestionCount();
  const suggestionsQuery = useContentSuggestionsQuery({
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
