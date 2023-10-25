import React from "react";
import { ContentSuggestionsQueryHookResult } from "../../generated/types";

export type IDataContext = {
  suggestionsQuery: ContentSuggestionsQueryHookResult;
};

const DataContext = React.createContext<IDataContext>({} as IDataContext);
DataContext.displayName = "DataContext";

export default DataContext;
