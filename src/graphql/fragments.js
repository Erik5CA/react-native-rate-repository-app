import { gql } from "@apollo/client";

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
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
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Repository {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
