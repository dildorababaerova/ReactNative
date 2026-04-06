import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "../Text";
import theme from "../../theme";

const validationSchema = yup.object().shape({
  user: yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(30, "Username must be at most 30 characters")
      .lowercase()
      .trim(),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be at most 50 characters")
      .trim(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("Password confirm is required"),
  }),
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

const SignUpForm = ({ onSubmit }) => {
  const initialValues = {
    user: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        username: values.user.username,
        password: values.user.password,
      });
    },
  });

  const hasError = (key) =>
    formik.touched.user?.[key] && formik.errors.user?.[key];
  return (
    <View>
      <TextInput
        style={[
          styles.inputText,
          hasError("username") && styles.inputTextError,
        ]}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.user.username}
        onChangeText={formik.handleChange("user.username")}
        onBlur={formik.handleBlur("user.username")}
      />
      {hasError("username") && (
        <Text style={styles.error}>{formik.errors.user.username}</Text>
      )}
      <TextInput
        style={[
          styles.inputText,
          hasError("password") && styles.inputTextError,
        ]}
        placeholder="Password"
        placeholderTextColor={[theme.colors.textSecondary, theme.fonts.main]}
        value={formik.values.user.password}
        onChangeText={formik.handleChange("user.password")}
        onBlur={formik.handleBlur("user.password")}
        secureTextEntry
      />
      {hasError("password") && (
        <Text style={styles.error}>{formik.errors.user.password}</Text>
      )}
      <TextInput
        style={[
          styles.inputText,
          hasError("passwordConfirm") && styles.inputTextError,
        ]}
        placeholder="Password confirmation"
        placeholderTextColor={[theme.colors.textSecondary, theme.fonts.main]}
        value={formik.values.user.passwordConfirm}
        onChangeText={formik.handleChange("user.passwordConfirm")}
        onBlur={formik.handleBlur("user.passwordConfirm")}
        secureTextEntry
      />
      {hasError("passwordConfirm") && (
        <Text style={styles.error}>{formik.errors.user.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          color="white"
          fontWeight="bold"
          fontSize="subheading"
          backgroundColor="backgroundPrimary"
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
