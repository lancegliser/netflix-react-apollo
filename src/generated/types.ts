import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type AccessRecord = {
  __typename?: "AccessRecord";
  accessorId: Scalars["String"]["output"];
  /** A UUID */
  id: Scalars["ID"]["output"];
  objectId: Scalars["String"]["output"];
  objectType: Scalars["String"]["output"];
  operation: Scalars["String"]["output"];
  /** ISO Format */
  timestamp: Scalars["String"]["output"];
};

/** A base definition authentication actors. Customized from the auth-api generated types. */
export type AuthenticationIdentity = ICreated &
  IDisplayImage &
  IDisplayName &
  IId &
  IUpdated & {
    __typename?: "AuthenticationIdentity";
    /**
     * True if the Identity is active. False if the User has been deactivated.
     * Deactivated Users will not be able to login. Entities will always be active.
     */
    active: Scalars["Boolean"]["output"];
    /** ISO date time string for the time this resource was created */
    createdAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    createdBy?: Maybe<Scalars["String"]["output"]>;
    /** A public url name safe to display in any HTML context */
    displayImageUrl?: Maybe<Scalars["String"]["output"]>;
    /** A preformatted name safe to display in any HTML context */
    displayName: Scalars["String"]["output"];
    /** Email address. Users will have emails, entities will not. */
    email?: Maybe<Scalars["String"]["output"]>;
    /** The primary id for this type. Typically a namespaced chain of methods, providers, and unique ids. */
    id: Scalars["ID"]["output"];
    /** The string will be in an IANA time zone format. https://www.iana.org/time-zones */
    timezone?: Maybe<Scalars["String"]["output"]>;
    /** ISO date time string for the time this resource was created */
    updatedAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    updatedBy?: Maybe<Scalars["String"]["output"]>;
  };

export enum AuthenticationRole {
  Anonymous = "Anonymous",
  Authenticated = "Authenticated",
}

export type Content = {
  __typename?: "Content";
  /** Return a single item by id */
  item: ContentItem;
  /** Return many items by ids */
  items: Array<ContentItem>;
  /** Returns items a user should consider viewing */
  suggestions: ContentSuggestions;
};

export type ContentItemArgs = {
  id: Scalars["ID"]["input"];
};

export type ContentItemsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type ContentSuggestionsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  preload?: InputMaybe<Scalars["Int"]["input"]>;
  preloadLast?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum ContentAccessOperation {
  Read = "Read",
  Write = "Write",
}

export type ContentItem = ICached &
  IDisplayImage &
  IDisplayName &
  IId & {
    __typename?: "ContentItem";
    /** ISO date time string for the time this resource was created */
    cachedAt?: Maybe<Scalars["String"]["output"]>;
    /**
     * A value that can be included into <img src /> properties.
     * In some environments, this may be a base64 encoded data URL.
     * Do *not* request in mass across an entire search result.
     */
    displayImageUrl?: Maybe<Scalars["String"]["output"]>;
    /** A preformatted display name safe to display in HTML context */
    displayName: Scalars["String"]["output"];
    format: ContentItemFormat;
    genres?: Maybe<Array<Scalars["String"]["output"]>>;
    /** The primary id for this type. Typically in the form of Contract/12887867. */
    id: Scalars["ID"]["output"];
    /** A value between 0 and 1 representing the average rating across all users. */
    rating?: Maybe<Scalars["Float"]["output"]>;
    /** Defines if the current user has saved this item or not as stored by in the application layer */
    saved?: Maybe<SavedRecord>;
    summary?: Maybe<Scalars["String"]["output"]>;
  };

export enum ContentItemFormat {
  Movie = "Movie",
  Series = "Series",
}

export type ContentMutations = {
  __typename?: "ContentMutations";
  /** Saves an object for the user to return to later. */
  addSavedItem: SavedRecord;
  /** Deletes a saved object for the user and returns it it existed */
  deleteSavedObject?: Maybe<SavedRecord>;
  /**
   * A place holder allowing extension in other files
   * @deprecated No longer supported
   */
  noop?: Maybe<Scalars["Boolean"]["output"]>;
  /** Updates the access records for the current user and the identified object. */
  trackItemAccess: AccessRecord;
};

export type ContentMutationsAddSavedItemArgs = {
  objectId: Scalars["String"]["input"];
};

export type ContentMutationsDeleteSavedObjectArgs = {
  id: Scalars["ID"]["input"];
};

export type ContentMutationsTrackItemAccessArgs = {
  objectId: Scalars["String"]["input"];
  operation: ContentAccessOperation;
};

export type ContentSuggestions = {
  __typename?: "ContentSuggestions";
  /**
   * Suggestion groups organized by specific scores for against a measurement inside a single source.
   * Visual priority: 4
   */
  dynamic: Array<ContentSuggestionsSet>;
  /**
   * A hand curated selection of items for promotion in specialized display.
   * Items will be intermixed between sources.
   * Visual priority: 1
   */
  featured: ContentSuggestionsSet;
  /**
   * A hand curated selection of items for promotion in specialized display.
   * Items will be intermixed between sources.
   * Visual priority: 3
   */
  promoted: ContentSuggestionsSet;
  /**
   * A user specific select based on recent access.
   * Items will be intermixed between sources.
   * Visual priority: 2
   */
  recent: ContentSuggestionsSet;
  /**
   * A user specific selection of items.
   * Items will be intermixed between sources.
   * Visual priority: 2
   */
  saved: ContentSuggestionsSet;
};

export type ContentSuggestionsItem = IDisplayImage & {
  __typename?: "ContentSuggestionsItem";
  /**
   * A public url name safe to display in any HTML context
   * A display image url may be supplied for some items in suggestions to provide a faster initial page load.
   * This will be based on the input parameters.
   */
  displayImageUrl?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  /** If this item's fields were preloaded due to the query's initialDisplay argument */
  preloaded: Scalars["Boolean"]["output"];
  primary: Scalars["String"]["output"];
  secondary?: Maybe<Scalars["String"]["output"]>;
};

export type ContentSuggestionsSet = IDisplayName & {
  __typename?: "ContentSuggestionsSet";
  /** A preformatted display name safe to display in HTML context */
  displayName?: Maybe<Scalars["String"]["output"]>;
  items: Array<ContentSuggestionsItem>;
};

export type ICached = {
  /** ISO date time string for the time this resource was created */
  cachedAt?: Maybe<Scalars["String"]["output"]>;
};

export type ICreated = {
  /** ISO date time string for the time this resource was created */
  createdAt?: Maybe<Scalars["String"]["output"]>;
  /** Unique identifier for users that created this resource */
  createdBy?: Maybe<Scalars["String"]["output"]>;
};

export type IDisplayImage = {
  /** A public url name safe to display in any HTML context */
  displayImageUrl?: Maybe<Scalars["String"]["output"]>;
};

export type IDisplayName = {
  /** A preformatted display name safe to display in HTML context */
  displayName?: Maybe<Scalars["String"]["output"]>;
};

export type IId = {
  /** The primary id for this type. Typically a namespaced chain of methods, providers, and unique ids. */
  id: Scalars["ID"]["output"];
};

/** Provides the required attributes to support automatic .fetchMore() offset pagination merge strategies */
export type IOffsetPaging = {
  /** The number of records in this set */
  limit: Scalars["Int"]["output"];
  /** The index of the first item in this result set from the larger collection */
  offset: Scalars["Int"]["output"];
  /** The total number of records available in the larger collection */
  total: Scalars["Int"]["output"];
};

export type IUpdated = {
  /** ISO date time string for the time this resource was created */
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  /** Unique identifier for users that created this resource */
  updatedBy?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  content: ContentMutations;
  /** Provides name spaced users functionality */
  users: UsersMutations;
};

export type Query = {
  __typename?: "Query";
  content: Content;
  /** A base definition authentication actors */
  self?: Maybe<AuthenticationIdentity>;
  system: System;
  /** Provides name spaced users functionality */
  users: UsersQuery;
};

export type SavedRecord = ICreated &
  IId & {
    __typename?: "SavedRecord";
    /** ISO date time string for the time this resource was created */
    createdAt: Scalars["String"]["output"];
    /** Unique identifier for users that created this resource */
    createdBy: Scalars["String"]["output"];
    /** The primary id for this type. Typically a UUID. */
    id: Scalars["ID"]["output"];
    objectId: Scalars["String"]["output"];
    objectType: Scalars["String"]["output"];
  };

export enum SortDirection {
  Ascending = "Ascending",
  Descending = "Descending",
}

export type System = {
  __typename?: "System";
  /** Returns configurations applicable to the application for the current environment */
  config: SystemConfig;
  /** Provides a list of environmental variables */
  environment: Scalars["JSON"]["output"];
};

/** Provides environment user agnostic system configurations */
export type SystemConfig = {
  __typename?: "SystemConfig";
  loginUrl: Scalars["String"]["output"];
  logoutUrl: Scalars["String"]["output"];
  /** The current time. A mock field likely to be replaced in application specific implementations. */
  timestamp: Scalars["String"]["output"];
};

export type User = ICreated &
  IDisplayName &
  IUpdated & {
    __typename?: "User";
    /** ISO date time string for the time this resource was created */
    createdAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    createdBy?: Maybe<Scalars["String"]["output"]>;
    /** A preformatted name safe to display in any HTML context */
    displayName?: Maybe<Scalars["String"]["output"]>;
    /** Email addresses */
    email?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for the resource across all collections */
    id: Scalars["ID"]["output"];
    /** Determines if a users is a service account supporting applications */
    isServiceAccount?: Maybe<Scalars["Boolean"]["output"]>;
    /** ISO date time string for the time this resource was created */
    updatedAt?: Maybe<Scalars["String"]["output"]>;
    /** Unique identifier for users that created this resource */
    updatedBy?: Maybe<Scalars["String"]["output"]>;
  };

export type UserInput = {
  /** A preformatted name safe to display in any HTML context */
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  /** Email addresses */
  email?: InputMaybe<Scalars["String"]["input"]>;
  /** Unique identifier for the resource across all collections */
  id: Scalars["ID"]["input"];
};

/** Provides name spaced users functionality */
export type UsersMutations = {
  __typename?: "UsersMutations";
  /** Saves the user and returns the updated copy */
  saveUser?: Maybe<User>;
};

/** Provides name spaced users functionality */
export type UsersMutationsSaveUserArgs = {
  user: UserInput;
};

/** Provides name spaced users functionality */
export type UsersQuery = {
  __typename?: "UsersQuery";
  /** Returns the user record matching the provided id */
  getById?: Maybe<User>;
  search: UsersSearchPagedResponse;
};

/** Provides name spaced users functionality */
export type UsersQueryGetByIdArgs = {
  id: Scalars["ID"]["input"];
};

/** Provides name spaced users functionality */
export type UsersQuerySearchArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<UsersSearchOrdering>;
};

export type UsersSearchOrdering = {
  /** Default: Asc */
  direction?: InputMaybe<SortDirection>;
  /** One or more fields to be used in sort direction */
  method?: InputMaybe<UsersSearchOrderMethod>;
};

export enum UsersSearchOrderMethod {
  CreatedAt = "CreatedAt",
  DisplayName = "DisplayName",
  Id = "Id",
}

export type UsersSearchPagedResponse = IOffsetPaging & {
  __typename?: "UsersSearchPagedResponse";
  items: Array<User>;
  /** The number of records in this set. Default: 50. */
  limit: Scalars["Int"]["output"];
  /** The index of the first item in this result set from the larger collection. Default: 0. */
  offset: Scalars["Int"]["output"];
  /** The total number of records available in the larger collection */
  total: Scalars["Int"]["output"];
};

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: "Query";
  self?: {
    __typename?: "AuthenticationIdentity";
    id: string;
    displayName: string;
  } | null;
};

export type ContentSuggestionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  preload?: InputMaybe<Scalars["Int"]["input"]>;
  preloadLast?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type ContentSuggestionsQuery = {
  __typename?: "Query";
  content: {
    __typename?: "Content";
    suggestions: {
      __typename?: "ContentSuggestions";
      dynamic: Array<{
        __typename?: "ContentSuggestionsSet";
        displayName?: string | null;
        items: Array<{
          __typename?: "ContentSuggestionsItem";
          displayImageUrl?: string | null;
          id: string;
          primary: string;
          secondary?: string | null;
        }>;
      }>;
      recent: {
        __typename?: "ContentSuggestionsSet";
        displayName?: string | null;
        items: Array<{
          __typename?: "ContentSuggestionsItem";
          displayImageUrl?: string | null;
          id: string;
          primary: string;
          secondary?: string | null;
        }>;
      };
      saved: {
        __typename?: "ContentSuggestionsSet";
        displayName?: string | null;
        items: Array<{
          __typename?: "ContentSuggestionsItem";
          displayImageUrl?: string | null;
          id: string;
          primary: string;
          secondary?: string | null;
        }>;
      };
    };
  };
};

export type ContentSuggestionsFieldsFragment = {
  __typename?: "ContentSuggestions";
  dynamic: Array<{
    __typename?: "ContentSuggestionsSet";
    displayName?: string | null;
    items: Array<{
      __typename?: "ContentSuggestionsItem";
      displayImageUrl?: string | null;
      id: string;
      primary: string;
      secondary?: string | null;
    }>;
  }>;
  recent: {
    __typename?: "ContentSuggestionsSet";
    displayName?: string | null;
    items: Array<{
      __typename?: "ContentSuggestionsItem";
      displayImageUrl?: string | null;
      id: string;
      primary: string;
      secondary?: string | null;
    }>;
  };
  saved: {
    __typename?: "ContentSuggestionsSet";
    displayName?: string | null;
    items: Array<{
      __typename?: "ContentSuggestionsItem";
      displayImageUrl?: string | null;
      id: string;
      primary: string;
      secondary?: string | null;
    }>;
  };
};

export type ContentSuggestionsSetFieldsFragment = {
  __typename?: "ContentSuggestionsSet";
  displayName?: string | null;
  items: Array<{
    __typename?: "ContentSuggestionsItem";
    displayImageUrl?: string | null;
    id: string;
    primary: string;
    secondary?: string | null;
  }>;
};

export type ContentSuggestionsSetItemFieldsFragment = {
  __typename?: "ContentSuggestionsItem";
  displayImageUrl?: string | null;
  id: string;
  primary: string;
  secondary?: string | null;
};

export type ContentItemDisplayImageUrlQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ContentItemDisplayImageUrlQuery = {
  __typename?: "Query";
  content: {
    __typename?: "Content";
    item: {
      __typename?: "ContentItem";
      id: string;
      displayImageUrl?: string | null;
    };
  };
};

export type ContentItemQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ContentItemQuery = {
  __typename?: "Query";
  content: {
    __typename?: "Content";
    item: {
      __typename?: "ContentItem";
      displayImageUrl?: string | null;
      id: string;
      displayName: string;
      format: ContentItemFormat;
      genres?: Array<string> | null;
      rating?: number | null;
      saved?: {
        __typename?: "SavedRecord";
        id: string;
        objectType: string;
        objectId: string;
      } | null;
    };
  };
};

export type ContentItemsQueryVariables = Exact<{
  ids: Array<Scalars["ID"]["input"]> | Scalars["ID"]["input"];
}>;

export type ContentItemsQuery = {
  __typename?: "Query";
  content: {
    __typename?: "Content";
    items: Array<{
      __typename?: "ContentItem";
      displayImageUrl?: string | null;
      id: string;
      displayName: string;
      format: ContentItemFormat;
      genres?: Array<string> | null;
      rating?: number | null;
      saved?: {
        __typename?: "SavedRecord";
        id: string;
        objectType: string;
        objectId: string;
      } | null;
    }>;
  };
};

export type ContentItemFieldsFragment = {
  __typename?: "ContentItem";
  displayImageUrl?: string | null;
  id: string;
  displayName: string;
  format: ContentItemFormat;
  genres?: Array<string> | null;
  rating?: number | null;
  saved?: {
    __typename?: "SavedRecord";
    id: string;
    objectType: string;
    objectId: string;
  } | null;
};

export type ContentAccessRecordFieldsFragment = {
  __typename?: "AccessRecord";
  objectType: string;
  objectId: string;
  timestamp: string;
};

export type ContentAddSavedObjectMutationVariables = Exact<{
  objectId: Scalars["String"]["input"];
}>;

export type ContentAddSavedObjectMutation = {
  __typename?: "Mutation";
  content: {
    __typename?: "ContentMutations";
    addSavedItem: {
      __typename?: "SavedRecord";
      id: string;
      objectType: string;
      objectId: string;
    };
  };
};

export type ContentDeleteSavedObjectMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ContentDeleteSavedObjectMutation = {
  __typename?: "Mutation";
  content: {
    __typename?: "ContentMutations";
    deleteSavedObject?: {
      __typename?: "SavedRecord";
      id: string;
      objectType: string;
      objectId: string;
    } | null;
  };
};

export type SavedRecordFieldsFragment = {
  __typename?: "SavedRecord";
  id: string;
  objectType: string;
  objectId: string;
};

export type UsersSearchQueryVariables = Exact<{
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  orderMethod?: InputMaybe<UsersSearchOrderMethod>;
  orderDirection?: InputMaybe<SortDirection>;
}>;

export type UsersSearchQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UsersQuery";
    search: {
      __typename?: "UsersSearchPagedResponse";
      limit: number;
      offset: number;
      total: number;
      items: Array<{
        __typename?: "User";
        createdAt?: string | null;
        displayName?: string | null;
        email?: string | null;
        id: string;
        isServiceAccount?: boolean | null;
      }>;
    };
  };
};

export type UserByIdQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type UserByIdQuery = {
  __typename?: "Query";
  users: {
    __typename?: "UsersQuery";
    getById?: {
      __typename?: "User";
      createdAt?: string | null;
      displayName?: string | null;
      email?: string | null;
      id: string;
      isServiceAccount?: boolean | null;
    } | null;
  };
};

export type SaveUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type SaveUserMutation = {
  __typename?: "Mutation";
  users: {
    __typename?: "UsersMutations";
    saveUser?: {
      __typename?: "User";
      createdAt?: string | null;
      displayName?: string | null;
      email?: string | null;
      id: string;
      isServiceAccount?: boolean | null;
    } | null;
  };
};

export type UserFieldsFragment = {
  __typename?: "User";
  createdAt?: string | null;
  displayName?: string | null;
  email?: string | null;
  id: string;
  isServiceAccount?: boolean | null;
};

export const ContentSuggestionsSetItemFieldsFragmentDoc = gql`
  fragment ContentSuggestionsSetItemFields on ContentSuggestionsItem {
    displayImageUrl
    id
    primary
    secondary
  }
`;
export const ContentSuggestionsSetFieldsFragmentDoc = gql`
  fragment ContentSuggestionsSetFields on ContentSuggestionsSet {
    displayName
    items {
      ...ContentSuggestionsSetItemFields
    }
  }
  ${ContentSuggestionsSetItemFieldsFragmentDoc}
`;
export const ContentSuggestionsFieldsFragmentDoc = gql`
  fragment ContentSuggestionsFields on ContentSuggestions {
    dynamic {
      ...ContentSuggestionsSetFields
    }
    recent {
      ...ContentSuggestionsSetFields
    }
    saved {
      ...ContentSuggestionsSetFields
    }
  }
  ${ContentSuggestionsSetFieldsFragmentDoc}
`;
export const SavedRecordFieldsFragmentDoc = gql`
  fragment SavedRecordFields on SavedRecord {
    id
    objectType
    objectId
  }
`;
export const ContentItemFieldsFragmentDoc = gql`
  fragment ContentItemFields on ContentItem {
    displayImageUrl
    id
    displayName
    format
    genres
    rating
    saved {
      ...SavedRecordFields
    }
  }
  ${SavedRecordFieldsFragmentDoc}
`;
export const ContentAccessRecordFieldsFragmentDoc = gql`
  fragment ContentAccessRecordFields on AccessRecord {
    objectType
    objectId
    timestamp
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    createdAt
    displayName
    email
    id
    isServiceAccount
  }
`;
export const SelfDocument = gql`
  query Self {
    self {
      id
      displayName
    }
  }
`;

/**
 * __useSelfQuery__
 *
 * To run a query within a React component, call `useSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfQuery(
  baseOptions?: Apollo.QueryHookOptions<SelfQuery, SelfQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, options);
}
export function useSelfLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SelfQuery, SelfQueryVariables>(
    SelfDocument,
    options,
  );
}
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
export type SelfQueryResult = Apollo.QueryResult<SelfQuery, SelfQueryVariables>;
export const ContentSuggestionsDocument = gql`
  query ContentSuggestions($limit: Int, $preload: Int, $preloadLast: Boolean) {
    content {
      suggestions(limit: $limit, preload: $preload, preloadLast: $preloadLast) {
        ...ContentSuggestionsFields
      }
    }
  }
  ${ContentSuggestionsFieldsFragmentDoc}
`;

/**
 * __useContentSuggestionsQuery__
 *
 * To run a query within a React component, call `useContentSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentSuggestionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      preload: // value for 'preload'
 *      preloadLast: // value for 'preloadLast'
 *   },
 * });
 */
export function useContentSuggestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ContentSuggestionsQuery,
    ContentSuggestionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ContentSuggestionsQuery,
    ContentSuggestionsQueryVariables
  >(ContentSuggestionsDocument, options);
}
export function useContentSuggestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContentSuggestionsQuery,
    ContentSuggestionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ContentSuggestionsQuery,
    ContentSuggestionsQueryVariables
  >(ContentSuggestionsDocument, options);
}
export type ContentSuggestionsQueryHookResult = ReturnType<
  typeof useContentSuggestionsQuery
>;
export type ContentSuggestionsLazyQueryHookResult = ReturnType<
  typeof useContentSuggestionsLazyQuery
>;
export type ContentSuggestionsQueryResult = Apollo.QueryResult<
  ContentSuggestionsQuery,
  ContentSuggestionsQueryVariables
>;
export const ContentItemDisplayImageUrlDocument = gql`
  query ContentItemDisplayImageUrl($id: ID!) {
    content {
      item(id: $id) {
        id
        displayImageUrl
      }
    }
  }
`;

/**
 * __useContentItemDisplayImageUrlQuery__
 *
 * To run a query within a React component, call `useContentItemDisplayImageUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentItemDisplayImageUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentItemDisplayImageUrlQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentItemDisplayImageUrlQuery(
  baseOptions: Apollo.QueryHookOptions<
    ContentItemDisplayImageUrlQuery,
    ContentItemDisplayImageUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ContentItemDisplayImageUrlQuery,
    ContentItemDisplayImageUrlQueryVariables
  >(ContentItemDisplayImageUrlDocument, options);
}
export function useContentItemDisplayImageUrlLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContentItemDisplayImageUrlQuery,
    ContentItemDisplayImageUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ContentItemDisplayImageUrlQuery,
    ContentItemDisplayImageUrlQueryVariables
  >(ContentItemDisplayImageUrlDocument, options);
}
export type ContentItemDisplayImageUrlQueryHookResult = ReturnType<
  typeof useContentItemDisplayImageUrlQuery
>;
export type ContentItemDisplayImageUrlLazyQueryHookResult = ReturnType<
  typeof useContentItemDisplayImageUrlLazyQuery
>;
export type ContentItemDisplayImageUrlQueryResult = Apollo.QueryResult<
  ContentItemDisplayImageUrlQuery,
  ContentItemDisplayImageUrlQueryVariables
>;
export const ContentItemDocument = gql`
  query ContentItem($id: ID!) {
    content {
      item(id: $id) {
        ...ContentItemFields
      }
    }
  }
  ${ContentItemFieldsFragmentDoc}
`;

/**
 * __useContentItemQuery__
 *
 * To run a query within a React component, call `useContentItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentItemQuery(
  baseOptions: Apollo.QueryHookOptions<
    ContentItemQuery,
    ContentItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContentItemQuery, ContentItemQueryVariables>(
    ContentItemDocument,
    options,
  );
}
export function useContentItemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContentItemQuery,
    ContentItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContentItemQuery, ContentItemQueryVariables>(
    ContentItemDocument,
    options,
  );
}
export type ContentItemQueryHookResult = ReturnType<typeof useContentItemQuery>;
export type ContentItemLazyQueryHookResult = ReturnType<
  typeof useContentItemLazyQuery
>;
export type ContentItemQueryResult = Apollo.QueryResult<
  ContentItemQuery,
  ContentItemQueryVariables
>;
export const ContentItemsDocument = gql`
  query ContentItems($ids: [ID!]!) {
    content {
      items(ids: $ids) {
        ...ContentItemFields
      }
    }
  }
  ${ContentItemFieldsFragmentDoc}
`;

/**
 * __useContentItemsQuery__
 *
 * To run a query within a React component, call `useContentItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentItemsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useContentItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ContentItemsQuery,
    ContentItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ContentItemsQuery, ContentItemsQueryVariables>(
    ContentItemsDocument,
    options,
  );
}
export function useContentItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ContentItemsQuery,
    ContentItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ContentItemsQuery, ContentItemsQueryVariables>(
    ContentItemsDocument,
    options,
  );
}
export type ContentItemsQueryHookResult = ReturnType<
  typeof useContentItemsQuery
>;
export type ContentItemsLazyQueryHookResult = ReturnType<
  typeof useContentItemsLazyQuery
>;
export type ContentItemsQueryResult = Apollo.QueryResult<
  ContentItemsQuery,
  ContentItemsQueryVariables
>;
export const ContentAddSavedObjectDocument = gql`
  mutation ContentAddSavedObject($objectId: String!) {
    content {
      addSavedItem(objectId: $objectId) {
        ...SavedRecordFields
      }
    }
  }
  ${SavedRecordFieldsFragmentDoc}
`;
export type ContentAddSavedObjectMutationFn = Apollo.MutationFunction<
  ContentAddSavedObjectMutation,
  ContentAddSavedObjectMutationVariables
>;

/**
 * __useContentAddSavedObjectMutation__
 *
 * To run a mutation, you first call `useContentAddSavedObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContentAddSavedObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contentAddSavedObjectMutation, { data, loading, error }] = useContentAddSavedObjectMutation({
 *   variables: {
 *      objectId: // value for 'objectId'
 *   },
 * });
 */
export function useContentAddSavedObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ContentAddSavedObjectMutation,
    ContentAddSavedObjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ContentAddSavedObjectMutation,
    ContentAddSavedObjectMutationVariables
  >(ContentAddSavedObjectDocument, options);
}
export type ContentAddSavedObjectMutationHookResult = ReturnType<
  typeof useContentAddSavedObjectMutation
>;
export type ContentAddSavedObjectMutationResult =
  Apollo.MutationResult<ContentAddSavedObjectMutation>;
export type ContentAddSavedObjectMutationOptions = Apollo.BaseMutationOptions<
  ContentAddSavedObjectMutation,
  ContentAddSavedObjectMutationVariables
>;
export const ContentDeleteSavedObjectDocument = gql`
  mutation ContentDeleteSavedObject($id: ID!) {
    content {
      deleteSavedObject(id: $id) {
        ...SavedRecordFields
      }
    }
  }
  ${SavedRecordFieldsFragmentDoc}
`;
export type ContentDeleteSavedObjectMutationFn = Apollo.MutationFunction<
  ContentDeleteSavedObjectMutation,
  ContentDeleteSavedObjectMutationVariables
>;

/**
 * __useContentDeleteSavedObjectMutation__
 *
 * To run a mutation, you first call `useContentDeleteSavedObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContentDeleteSavedObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contentDeleteSavedObjectMutation, { data, loading, error }] = useContentDeleteSavedObjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentDeleteSavedObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ContentDeleteSavedObjectMutation,
    ContentDeleteSavedObjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ContentDeleteSavedObjectMutation,
    ContentDeleteSavedObjectMutationVariables
  >(ContentDeleteSavedObjectDocument, options);
}
export type ContentDeleteSavedObjectMutationHookResult = ReturnType<
  typeof useContentDeleteSavedObjectMutation
>;
export type ContentDeleteSavedObjectMutationResult =
  Apollo.MutationResult<ContentDeleteSavedObjectMutation>;
export type ContentDeleteSavedObjectMutationOptions =
  Apollo.BaseMutationOptions<
    ContentDeleteSavedObjectMutation,
    ContentDeleteSavedObjectMutationVariables
  >;
export const UsersSearchDocument = gql`
  query UsersSearch(
    $limit: Int
    $offset: Int
    $orderMethod: UsersSearchOrderMethod
    $orderDirection: SortDirection
  ) {
    users {
      search(
        limit: $limit
        offset: $offset
        order: { method: $orderMethod, direction: $orderDirection }
      ) {
        limit
        offset
        total
        items {
          ...UserFields
        }
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUsersSearchQuery__
 *
 * To run a query within a React component, call `useUsersSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSearchQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderMethod: // value for 'orderMethod'
 *      orderDirection: // value for 'orderDirection'
 *   },
 * });
 */
export function useUsersSearchQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UsersSearchQuery,
    UsersSearchQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    options,
  );
}
export function useUsersSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersSearchQuery,
    UsersSearchQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    options,
  );
}
export type UsersSearchQueryHookResult = ReturnType<typeof useUsersSearchQuery>;
export type UsersSearchLazyQueryHookResult = ReturnType<
  typeof useUsersSearchLazyQuery
>;
export type UsersSearchQueryResult = Apollo.QueryResult<
  UsersSearchQuery,
  UsersSearchQueryVariables
>;
export const UserByIdDocument = gql`
  query UserById($id: ID!) {
    users {
      getById(id: $id) {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options,
  );
}
export function useUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserByIdQuery,
    UserByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    options,
  );
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<
  typeof useUserByIdLazyQuery
>;
export type UserByIdQueryResult = Apollo.QueryResult<
  UserByIdQuery,
  UserByIdQueryVariables
>;
export const SaveUserDocument = gql`
  mutation SaveUser($user: UserInput!) {
    users {
      saveUser(user: $user) {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type SaveUserMutationFn = Apollo.MutationFunction<
  SaveUserMutation,
  SaveUserMutationVariables
>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSaveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveUserMutation,
    SaveUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(
    SaveUserDocument,
    options,
  );
}
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<
  SaveUserMutation,
  SaveUserMutationVariables
>;
