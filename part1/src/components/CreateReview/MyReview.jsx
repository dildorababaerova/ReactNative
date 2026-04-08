import { View, StyleSheet, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { ReviewItem } from "../RepositoryList/SingleRepositoryView";
import { ME } from "../../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const MyReview = () => {
  const { data, error, loading } = useQuery(ME, {
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

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReview;
