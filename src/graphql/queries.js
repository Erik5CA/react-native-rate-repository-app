import { gql } from "@apollo/client";
import { REPOSITORY_BASE_FIELDS } from "./fragments";

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            createdAt
            text
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      totalCount
      edges {
        node {
          ...repositoryBaseFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORI_BY_ID = gql`
  query getRepById($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...repositoryBaseFields
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`;
