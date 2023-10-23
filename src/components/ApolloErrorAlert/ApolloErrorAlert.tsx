import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { ApolloError } from "@apollo/client";

export interface ApolloErrorAlertProps {
  error?: ApolloError | undefined;
  isProduction?: boolean;
}
const ApolloErrorAlert: React.FunctionComponent<ApolloErrorAlertProps> = (
  props,
) => {
  const { error, isProduction = false } = props;
  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>{error.message}</AlertTitle>
          {!isProduction && JSON.stringify(error.graphQLErrors)}
        </Alert>
      )}
    </>
  );
};
export default ApolloErrorAlert;
