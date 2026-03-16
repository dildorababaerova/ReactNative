import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    backgroundColor: "#24292e",
  },
});

const AppBarTab = ({ children }) => {
  return (
    <View>
      <Text color="white">{children}</Text>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab>Repositories</AppBarTab>
    </View>
  );
};

export default AppBar;
