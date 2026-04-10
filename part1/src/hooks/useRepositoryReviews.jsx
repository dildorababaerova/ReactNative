import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const REVIEWS_PER_PAGE = 5; // start small for testing

export const useRepositoryReviews = (repositoryId) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(
    GET_REPOSITORY,
    {
      variables: {
        id: repositoryId,
        first: REVIEWS_PER_PAGE,
      },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true, // чтобы loading обновлялся при fetchMore
      skip: !repositoryId,
    },
  );

  const handleFetchMore = () => {
    const pageInfo = data?.repository?.reviews?.pageInfo;
    if (!pageInfo?.hasNextPage || loading) return;

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
        // 'id' and 'first' are automatically carried over from the original variables
      },
    });
  };

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges?.map((edge) => edge.node) ?? [];

  return {
    repository,
    reviews,
    fetchMoreReviews: handleFetchMore,
    loading,
    error,
    ...result,
  };
};
