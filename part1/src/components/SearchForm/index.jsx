import { TextInput, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "../Text";
import theme from "../../theme";

const validationSchema = yup.object({
  ownerName: yup.string().trim(),
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

const SearchForm = ({ onSearch }) => {
  const initialValues = {
    searchKeyword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSearch,
  });

  const hasError = (key) => formik.touched[key] && formik.errors[key];
  return (
    <View>
      <TextInput
        style={[
          styles.inputText,
          hasError("searchKeyword") && styles.inputTextError,
        ]}
        placeholder="SearchKeyword"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.searchKeyword}
        onChangeText={formik.handleChange("searchKeyword")}
        onBlur={formik.handleBlur("searchKeyword")}
      />
      {hasError("searchKeyword") && (
        <Text style={styles.error}>{formik.errors.searchKeyword}</Text>
      )}
    </View>
  );
};

export default SearchForm;
