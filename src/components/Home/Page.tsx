import React, { FunctionComponent, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { routeHomeTitle } from "./Router";
import App from "../App/App";
import { getMetaTitle } from "../../utils/meta";
import { Grid } from "@mui/material";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { DataContextProvider } from "./DataContextProvider";
import DataContext from "./DataContext";
import ApolloErrorAlert from "../ApolloErrorAlert/ApolloErrorAlert";
import SuggestionSet from "./SuggestionSet/SuggestionSet";

const Page: React.FunctionComponent = () => {
  return (
    <>
      <Helmet>
        <title>{getMetaTitle([routeHomeTitle])}</title>
      </Helmet>
      <App>
        <ErrorBoundary>
          <DataContextProvider>
            <Contents />
          </DataContextProvider>
        </ErrorBoundary>
      </App>
    </>
  );
};
export default Page;

const Contents: FunctionComponent = () => {
  const { suggestionsQuery } = useContext(DataContext);

  return (
    <Grid container direction={"column"} gap={3} pt={8} component={"main"}>
      {suggestionsQuery.error ? (
        <ApolloErrorAlert error={suggestionsQuery.error} />
      ) : (
        <>
          {/*<Featured />*/}
          <Grid container direction={"column"} gap={2}>
            <SuggestionSet
              loading={suggestionsQuery.loading}
              set={suggestionsQuery.data?.content.suggestions.saved}
            />
            <SuggestionSet
              loading={suggestionsQuery.loading}
              set={suggestionsQuery.data?.content.suggestions.recent}
            />
            {/*<Promoted />*/}
            {suggestionsQuery.loading ? (
              <>
                <SuggestionSet loading />
                <SuggestionSet loading />
                <SuggestionSet loading />
              </>
            ) : (
              suggestionsQuery.data?.content.suggestions.dynamic.map(
                (set, index) => (
                  <SuggestionSet key={index} set={set} lazy={index >= 2} />
                ),
              )
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};
