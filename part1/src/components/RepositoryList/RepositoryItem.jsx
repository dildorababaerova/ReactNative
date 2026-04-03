import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";

const formatCount = (count) => {
  if (count >= 1000) return (count / 1000).toFixed(1) + "k";
  return count;
};

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  image,
  testID,
}) => {
  console.log("RepositoryItem testID:", testID);
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: image }}></Image>
        <View style={styles.info}>
          <Text fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {description}
          </Text>
          <View style={styles.languageContainer}>
            <Text color="white" backgroundColor="backgroundPrimary">
              {language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(stargazersCount)} </Text>
          <Text color="textSecondary">Star </Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(forksCount)} </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(reviewCount)} </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(ratingAverage)} </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#faf9fa",
    padding: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  header: {
    flexDirection: "row",
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  description: {
    marginVertical: 5,
  },

  languageContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
  },
});

export default RepositoryItem;

// Production options
// import { View, StyleSheet, Image } from "react-native";
// import Text from "./Text";
// import theme from "../theme";

// // ---------------- Presentational Components ----------------

// const RepositoryHeader = ({ fullName, description, image }) => (
//   <View style={styles.header}>
//     <Image style={styles.avatar} source={{ uri: image }} />
//     <View style={styles.info}>
//       <Text fontSize="subheading" fontWeight="bold">
//         {fullName}
//       </Text>
//       <Text color="textSecondary" style={styles.description}>
//         {description}
//       </Text>
//     </View>
//   </View>
// );

// const LanguageBadge = ({ language }) => (
//   <View style={styles.languageContainer}>
//     <Text style={styles.language}>{language}</Text>
//   </View>
// );

// const RepositoryStats = ({ stars, forks, reviews, rating }) => {
//   const stats = [
//     { value: stars, label: "Stars" },
//     { value: forks, label: "Forks" },
//     { value: reviews, label: "Reviews" },
//     { value: rating, label: "Rating" },
//   ];

//   const formatCount = (count) => {
//     if (count >= 1000) return (count / 1000).toFixed(1) + "k";
//     return count;
//   };

//   return (
//     <View style={styles.stats}>
//       {stats.map((item) => (
//         <View key={item.label} style={styles.statItem}>
//           <Text fontWeight="bold">{formatCount(item.value)}</Text>
//           <Text color="textSecondary">{item.label}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// // ---------------- Container Component ----------------

// const RepositoryItem = (props) => {
//   return (
//     <View style={styles.container}>
//       <RepositoryHeader
//         fullName={props.fullName}
//         description={props.description}
//         image={props.image}
//       />
//       <LanguageBadge language={props.language} />
//       <RepositoryStats
//         stars={props.stargazersCount}
//         forks={props.forksCount}
//         reviews={props.reviewCount}
//         rating={props.ratingAverage}
//       />
//     </View>
//   );
// };

// export default RepositoryItem;

// // ---------------- Styles ----------------

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: "white",
//   },

//   // Header
//   header: {
//     flexDirection: "row",
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 4,
//   },
//   info: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   description: {
//     marginVertical: 5,
//   },

//   // Language Badge
//   languageContainer: {
//     alignSelf: "flex-start",
//     backgroundColor: theme.colors.primary,
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//     marginTop: 5,
//   },
//   language: {
//     color: "white",
//   },

//   // Stats
//   stats: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 15,
//   },
//   statItem: {
//     alignItems: "center",
//   },
// });
