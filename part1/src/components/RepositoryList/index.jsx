import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { useRepositories } from "../../hooks/useRepositories";
import SortingSelector from "./SortingSelector";
import { useDebounce } from "use-debounce";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  search: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "white",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const getOrderParams = (sortKey) => {
  switch (sortKey) {
    case "HIGHEST_RATED": {
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    }
    case "LOWEST_RATED": {
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    }
    default: {
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  }
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, sortKey, setSortKey } = this.props;
    return (
      <View>
        <Searchbar
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={styles.search}
        />
        <SortingSelector selectedValue={sortKey} onValueChange={setSortKey} />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props;
    return (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
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
      </Pressable>
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories ? repositories : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}
const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("LATEST");
  const { orderBy, orderDirection } = getOrderParams(sortKey);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedKeyword,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log("RepositoriesLIST", repositories);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <RepositoryListContainer
          repositories={repositories}
          sortKey={sortKey}
          setSortKey={setSortKey}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          navigate={navigate}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RepositoryList;

// DEEPSEEK option
// import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
// import { useState } from "react";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import RepositoryItem from "./RepositoryItem";
// import { useNavigate } from "react-router-native";
// import { useRepositories } from "../../hooks/useRepositories";
// import SortingSelector from "./SortingSelector";

// const styles = StyleSheet.create({
//   separator: {
//     height: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     flex: 1,
//   },
// });

// const getOrderParams = (sortKey) => {
//   switch (sortKey) {
//     case "HIGHEST_RATED": {
//       return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
//     }
//     case "LOWEST_RATED": {
//       return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
//     }
//     default: {
//       return { orderBy: "CREATED_AT", orderDirection: "DESC" };
//     }
//   }
// };

// const ItemSeparator = () => <View style={styles.separator} />;

// export const RepositoryListContainer = ({
//   repositories,
//   sortKey,
//   setSortKey,
//   onEndReach,
// }) => {
//   const navigate = useNavigate();
//   const repositoryNodes = repositories ? repositories : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       renderItem={({ item }) => (
//         <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
//           <RepositoryItem
//             fullName={item.fullName}
//             description={item.description}
//             language={item.language}
//             forksCount={item.forksCount}
//             stargazersCount={item.stargazersCount}
//             ratingAverage={item.ratingAverage}
//             reviewCount={item.reviewCount}
//             image={item.ownerAvatarUrl}
//             testID="repositoryItem"
//           />
//         </Pressable>
//       )}
//       keyExtractor={(item) => item.id}
//       ListHeaderComponent={
//         <SortingSelector selectedValue={sortKey} onValueChange={setSortKey} />
//       }
//       onEndReached={onEndReach}
//        onEndReachedThreshold={0.5}
//       ItemSeparatorComponent={ItemSeparator}
//     />
//   );
// };
// const RepositoryList = () => {
//   const [sortKey, setSortKey] = useState("LATEST");
//   const { orderBy, orderDirection } = getOrderParams(sortKey);

//   const { repositories, loading, fetchMore, error } = useRepositories({
//     first: 8,
//     orderBy,
//     orderDirection,
//   });

//   const onEndReach = () => {
//     fetchMore();
//   };

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error.message}</Text>;

//   console.log("RepositoriesLIST", repositories);

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView>
//         <RepositoryListContainer
//           repositories={repositories}
//           sortKey={sortKey}
//           setSortKey={setSortKey}
//           onEndReach={onEndReach}
//         />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// export default RepositoryList;
