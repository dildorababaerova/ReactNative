import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "../src/components/RepositoryItem";
import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <SafeAreaProvider>
      <SafeAreaView>
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
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RepositoryList;
