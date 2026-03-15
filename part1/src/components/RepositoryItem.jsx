import { View, StyleSheet, Text } from "react-native";

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => (
  <View style={styles.item}>
    <Text style={styles.repo}>Full name:{fullName}</Text>
    <Text>Description: {description}</Text>
    <Text>Language: {language}</Text>
    <Text>Forks: {forksCount}</Text>
    <Text>Stars: {stargazersCount}</Text>
    <Text>Reviews: {reviewCount}</Text>
    <Text>Rating: {ratingAverage}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  repo: {
    color: "blue",
    fontSize: 24,
    fontWeight: "700",
  },
});

export default RepositoryItem;
