// import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignInForm from "./SignInForm";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
  mainWrapper: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const SignUp = () => {
    const onSubmit = (values) => {
      if (values.username !== "" && values.password !== "") {
        console.log(values);
      }
    };
    return <SignInForm onSubmit={onSubmit} />;
  };
  return (
    <View style={styles.mainWrapper}>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
