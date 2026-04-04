import { View, StyleSheet, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../../graphql/queries";

export const SingleRepositoryView = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  return (
    <View>
      <RepositoryItem
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
        forksCount={repository.forksCount}
        stargazersCount={repository.stargazersCount}
        ratingAverage={repository.ratingAverage}
        reviewCount={repository.reviewCount}
        image={repository.ownerAvatarUrl}
        url={repository.url}
        showGitHubButton={true}
      />
    </View>
  );
};

export default SingleRepositoryView;
