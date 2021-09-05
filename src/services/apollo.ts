import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  createHttpLink,
} from "@apollo/client";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:5000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache({
  // Define merge strategies for our types and fields
  typePolicies: {
    // Top level Query fields
    Query: {
      fields: {
        // Merge our namespaces
        users: { merge: true },
      },
    },
  },
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});
