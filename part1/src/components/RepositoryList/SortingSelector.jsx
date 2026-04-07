import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import theme from "../../theme";

const SortingSelector = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated" value="HIGHEST_RATED" />
        <Picker.Item label="Lowest rated" value="LOWEST_RATED" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
    paddingVertical: 8,
  },
  picker: {
    color: theme.colors.textPrimary,
  },
});

export default SortingSelector;
