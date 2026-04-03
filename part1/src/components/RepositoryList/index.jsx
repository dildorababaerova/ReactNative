import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories ? repositories : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <RepositoryItem
          fullName={item.fullName}
          description={item.description}
          language={item.language}
          forksCount={item.forksCount}
          stargazersCount={item.stargazersCount}
          ratingAverage={item.ratingAverage}
          reviewCount={item.reviewCount}
          image={item.ownerAvatarUrl}
          testID="repositoryItem"
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  console.log(
    "Repositories",
    data.repositories.edges.map((d) => d.node.id),
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <RepositoryListContainer repositories={repositoryNodes} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RepositoryList;
