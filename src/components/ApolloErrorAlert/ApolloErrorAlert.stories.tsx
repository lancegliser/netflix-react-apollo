import ApolloErrorAlert from "./ApolloErrorAlert";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { Meta } from "@storybook/react";

export default {
  title: "ApolloErrorAlert",
  component: ApolloErrorAlert,
  args: {
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("I am a GraphQL error")],
      errorMessage: "I am an error message",
    }),
  },
} satisfies Meta<typeof ApolloErrorAlert>;

export const Default = {};
