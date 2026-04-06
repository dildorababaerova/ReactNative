import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "../Text";
import theme from "../../theme";

const validationSchema = yup.object().shape({
  review: yup.object().shape({
    repositoryName: yup
      .string()
      .required("Repository name is required")
      .lowercase()
      .trim(),
    ownerName: yup
      .string()
      .required("Repository owner name is required")
      .lowercase()
      .trim(),
    rating: yup
      .number()
      .integer("Rating must be an integer")
      .min(0, "Rating must be at least 0")
      .max(100, "Rating cannot exceed 100")
      .required("Rating is required (0-100)"),
    text: yup
      .string()
      .max(2000, "Review text must be at most 2000 characters")
      .trim(),
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

const ReviewForm = ({ onSubmit }) => {
  const initialValues = {
    review: {
      ownerName: "",
      repositoryName: "",
      text: "",
      rating: null,
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values.review);
    },
  });

  const hasError = (key) =>
    formik.touched.review?.[key] && formik.errors.review?.[key];

  // const getError = (key) => formik.errors.review?.[key];

  return (
    <View>
      <TextInput
        style={[
          styles.inputText,
          hasError("ownerName") && styles.inputTextError,
        ]}
        placeholder="OwnerName"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.review.ownerName}
        onChangeText={formik.handleChange("review.ownerName")}
        onBlur={formik.handleBlur("review.ownerName")}
      />
      {hasError("ownerName") && (
        <Text style={styles.error}>{formik.errors.review.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.inputText,
          hasError("repositoryName") && styles.inputTextError,
        ]}
        placeholder="RepositoryName"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.review.repositoryName}
        onChangeText={formik.handleChange("review.repositoryName")}
        onBlur={formik.handleBlur("review.repositoryName")}
      />
      {hasError("repositoryName") && (
        <Text style={styles.error}>{formik.errors.review.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.inputText, hasError("text") && styles.inputTextError]}
        placeholder="Text"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.review.text}
        onChangeText={formik.handleChange("review.text")}
        onBlur={formik.handleBlur("review.text")}
      />
      {hasError("text") && (
        <Text style={styles.error}>{formik.errors.review.text}</Text>
      )}
      <TextInput
        style={[styles.inputText, hasError("rating") && styles.inputTextError]}
        placeholder="Rating"
        placeholderTextColor={theme.colors.textSecondary}
        value={
          formik.values.review.rating !== null
            ? String(formik.values.review.rating)
            : ""
        }
        onChangeText={(text) => {
          const numeric = text === "" ? null : parseInt(text, 10);
          formik.setFieldValue("review.rating", numeric);
        }}
        onBlur={formik.handleBlur("review.rating")}
        keyboardType="number-pad"
      />
      {hasError("rating") && (
        <Text style={styles.error}>{formik.errors.review.rating}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
