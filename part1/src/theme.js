import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    white: "#eff2f7",
    mainBackground: "#e1e4e8",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "sans-serif",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  backgroundColors: {
    background: "#0365d600",
    backgroundPrimary: "#0366d6",
    backgroundSecondary: "#586069",
    backgroundDark: "#24292e",
  },
};

export default theme;
