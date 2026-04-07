import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { useRepositories } from "../../hooks/useRepositories";
import SortingSelector from "./SortingSelector";
// import OrderSelector from "./OrderSelector";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
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

export const RepositoryListContainer = ({
  repositories,
  sortKey,
  setSortKey,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
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
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <SortingSelector selectedValue={sortKey} onValueChange={setSortKey} />
      }
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};
const RepositoryList = () => {
  const [sortKey, setSortKey] = useState("LATEST");
  const { orderBy, orderDirection } = getOrderParams(sortKey);

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
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
