import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-native";
import Text from "../Text";
import useSignOut from "../../hooks/useSignOut";
import { ME } from "../../graphql/queries";

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

const AppBarTab = ({ children, onPress }) => {
  return (
    <View style={styles.tab}>
      <Text color="white" onPress={onPress}>
        {children}
      </Text>
    </View>
  );
};

const AppBar = () => {
  const signOut = useSignOut();

  const { data } = useQuery(ME);
  const user = data?.me;
  const username = user?.username || null;

  const handleLogOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab>Repositories</AppBarTab>
        </Link>
        {username ? (
          <>
            <Link to="/create-review">
              <AppBarTab>Create review</AppBarTab>
            </Link>
            <View>
              <Text color="white">{username} logged in </Text>
            </View>
            <View>
              <AppBarTab onPress={handleLogOut}> Sign out </AppBarTab>
            </View>
          </>
        ) : (
          <>
            <Link to="/signIn">
              <AppBarTab>Sign In</AppBarTab>
            </Link>
            <Link to="/signUp">
              <AppBarTab>Sign Up</AppBarTab>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
