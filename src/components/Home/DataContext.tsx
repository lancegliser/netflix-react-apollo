import React from "react";
import { HaloSuggestionsQueryHookResult } from "../../generated/types";

export type IDataContext = {
  suggestionsQuery: HaloSuggestionsQueryHookResult;
};

const DataContext = React.createContext<IDataContext>({} as IDataContext);
DataContext.displayName = "DataContext";

export default DataContext;
