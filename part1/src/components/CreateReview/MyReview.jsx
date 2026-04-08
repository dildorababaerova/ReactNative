import { View, StyleSheet, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { ReviewItem } from "../RepositoryList/SingleRepositoryView";
import { ME } from "../../graphql/queries";
import Text from "../Text";
import ReviewActions from "./ReviewActions";
import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  button: {
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const MyReview = () => {
  const { data, error, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  if (reviews.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>You haven't written any reviews yet.</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <View>
      <ReviewItem review={item} showRepositoryName={true} />
      <ReviewActions
        reviewId={item.id}
        repositoryId={item.repository.id}
        refetch={refetch}
      />
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReview;
