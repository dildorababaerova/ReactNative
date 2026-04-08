import { View, StyleSheet, Text, FlatList } from "react-native";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../../graphql/queries";
import ReviewItemDetail from "./ReviewItemDetail";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const RepositoryInfo = ({ repository }) => {
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

export const ReviewItem = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ReviewItemDetail
      review={review}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      showRepositoryName={true}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
    skip: !id,
  });

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges?.map((edge) => edge.node) || [];

  if (!repository) {
    return <Text></Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepositoryView;
