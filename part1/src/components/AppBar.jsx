import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#24292e",
  },
  tab: {
    marginRight: 15,
  },
});

const AppBarTab = ({ children }) => {
  return (
    <View style={styles.tab}>
      <Text color="white">{children}</Text>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab>Repositories</AppBarTab>
        </Link>
        <Link to="/signIn">
          <AppBarTab>Sign In</AppBarTab>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
