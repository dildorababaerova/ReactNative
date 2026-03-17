import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    backgroundColor: theme.backgroundColors.background,
  },

  backgroundColorSecondary: {
    backgroundColor: theme.backgroundColors.backgroundSecondary,
  },
  backgroundColorPrimary: {
    backgroundColor: theme.backgroundColors.backgroundPrimary,
  },
  backgroundColorDark: {
    backgroundColor: theme.backgroundColors.backgroundDark,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  backgroundColor,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "white" && styles.colorWhite,
    color === "primary" && styles.colorPrimary,
    backgroundColor === "backgroundPrimary" && styles.backgroundColorPrimary,
    backgroundColor === "backgroundDark" && styles.backgroundColorDark,
    backgroundColor === "backgroundSecondary" &&
      styles.backgroundColorSecondary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
