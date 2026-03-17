import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositories }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={repositories}
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
