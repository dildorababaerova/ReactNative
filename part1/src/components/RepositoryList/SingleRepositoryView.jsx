import { View, StyleSheet, Text, FlatList } from "react-native";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import { GET_REPOSITORY } from "../../graphql/queries";
import ReviewItemDetail from "./ReviewItemDetail";
import { useRepositoryReviews } from "../../hooks/useRepositoryReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
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

  const { repository, reviews, fetchMoreReviews, loading, error } =
    useRepositoryReviews(id);

  if (loading && !repository) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  const handleEndReached = () => {
    if (!loading) {
      fetchMoreReviews();
    }
  };
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <Text>Loading more reviews...</Text> : null
      }
    />
  );
};

export default SingleRepositoryView;
