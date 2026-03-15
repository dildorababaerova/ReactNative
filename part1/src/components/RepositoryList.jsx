import { StyleSheet, View, FlatList } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositories }) => {
  return (
    <View>
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
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
    // <SafeAreaProvider>
    //   <SafeAreaView>

    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default RepositoryList;
