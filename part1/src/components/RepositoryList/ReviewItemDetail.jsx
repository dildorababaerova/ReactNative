import { View, StyleSheet, Pressable } from "react-native";
import Text from "../Text";
import { format } from "date-fns";

const ReviewItemDetail = ({ review, onPress, expanded }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.circle}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>
          <View style={styles.info}>
            <Text fontSize="subheading" fontWeight="bold">
              {review.user.username}
            </Text>
            <Text color="textSecondary" style={styles.description}>
              {formattedDate}
            </Text>
            <Text>
              {expanded
                ? review.text
                : review.text?.length > 100
                  ? `${review.text.substring(0, 100)}...`
                  : review.text}
            </Text>

            {review.text?.length > 100 && (
              <Text style={styles.readMore}>
                {expanded ? "Hide ▼" : "Read more ▲"}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#faf9fa",
    padding: 15,
  },

  header: {
    flexDirection: "row",
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  description: {
    marginVertical: 5,
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0e70ad",
    backgroundColor: "#faf9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: "#0e70ad",
    fontSize: 18,
    fontWeight: "bold",
  },
  readMore: {
    marginTop: 8,
    color: "#2b95d6",
    fontWeight: "bold",
  },
});

export default ReviewItemDetail;
