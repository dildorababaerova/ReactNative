import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";

export const useSignIn = () => {
  const [authenticate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    try {
      const response = await authenticate({
        variables: { credentials: { username, password } },
      });
      const token = response.data?.authenticate.accessToken;
      console.log("TOKEN FROM BACKEND", token);
      if (!token) {
        throw new Error("Login failed: no token received");
      }
      return { token };
    } catch (error) {
      return { error: error.message };
    }
  };

  return [signIn, result];
};
