import { gql } from "@apollo/client";

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          forksCount
          id
          language
          ratingAverage
          reviewCount
          description
          ownerAvatarUrl
          stargazersCount
        }
      }
    }
  }
`;
