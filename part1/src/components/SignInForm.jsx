import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderColor: theme.colors.textSecondary,
  },
  inputTextError: {
    borderColor: "#d73a4a",
  },

  button: {
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  error: {
    margin: 10,
    color: "#d73a4a",
  },
});

const SignInForm = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const hasError = (key) => formik.touched[key] && formik.errors[key];
  return (
    <View>
      <TextInput
        style={[
          styles.inputText,
          hasError("username") && styles.inputTextError,
        ]}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {hasError("username") && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.inputText,
          hasError("password") && styles.inputTextError,
        ]}
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {hasError("password") && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          color="white"
          fontWeight="bold"
          fontSize="subheading"
          backgroundColor="backgroundPrimary"
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
