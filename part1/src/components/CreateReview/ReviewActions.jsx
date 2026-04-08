import { Alert, View, StyleSheet, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../../graphql/mutations";
import Text from "../Text";

const ReviewActions = ({ repositoryId, reviewId, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              await refetch();
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  };
  return (
    <View style={styles.actionsContainer}>
      <Pressable onPress={handleViewRepository} style={styles.actionButton}>
        <Text>View repository</Text>
      </Pressable>
      <Pressable onPress={handleDelete} style={styles.actionButton}>
        <Text style={[styles.actionText, styles.deleteText]}>
          {" "}
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#e1e4e8",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  actionText: {
    fontWeight: "bold",
  },
  deleteText: {
    color: "#d73a4a",
  },
});

export default ReviewActions;
