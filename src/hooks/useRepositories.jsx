import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sort, searchKeyword) => {
  const options = {
    orderBy: sort === "sort1" ? "CREATED_AT" : "RATING_AVERAGE",
    orderDirection: sort === "sort1" || sort === "sort2" ? "DESC" : "ASC",
  };
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { ...options, searchKeyword, first: 4 },
  });
  const repositories = data ? data.repositories : null;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...options,
        searchKeyword,
        first: 4,
      },
    });
  };

  return { repositories, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;
