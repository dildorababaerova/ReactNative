// import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateReviewScreen from "./CreateReview";
import SingleRepositoryView from "./RepositoryList/SingleRepositoryView";
import theme from "../theme";
import MyReview from "./CreateReview/MyReview";

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
  return (
    <View style={styles.mainWrapper}>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/repository/:id" element={<SingleRepositoryView />} />
          <Route path="/create-review" element={<CreateReviewScreen />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/myReview" element={<MyReview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
