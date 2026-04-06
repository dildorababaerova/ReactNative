import { useCreateReview } from "../../hooks/useCreateReview";
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-native";

const CreateReviewScreen = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryId, error } = await createReview(values);

    if (repositoryId) {
      navigate(`/repository/${repositoryId}`);
    }
    console.log("REPOSITORY", repositoryId);
    if (error) {
      console.error("Failed to create review", error);
    }
  };
  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReviewScreen;
