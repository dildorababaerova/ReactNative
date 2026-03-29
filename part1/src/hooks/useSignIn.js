import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

export const useSignIn = () => {
  const [authenticate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const response = await authenticate({
        variables: { credentials: { username, password } },
      });
      const token = response.data?.authenticate.accessToken;
      await authStorage.setAccessToken(token);
      await apolloClient.resetStore();
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
