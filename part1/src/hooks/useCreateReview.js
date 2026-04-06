import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);
  const createNewReview = async ({
    repositoryName,
    ownerName,
    text,
    rating,
  }) => {
    try {
      const response = await createReview({
        variables: {
          review: {
            repositoryName,
            ownerName,
            text,
            rating: parseInt(rating, 10),
          },
        },
      });
      const repositoryId = response?.data?.createReview.repositoryId;
      console.log("HookRepositoryID", repositoryId);

      if (!repositoryId) {
        throw new Error("Creating failed: something went wrong");
      }
      return { repositoryId };
    } catch (error) {
      return { error: error.message };
    }
  };

  return [createNewReview, result];
};
