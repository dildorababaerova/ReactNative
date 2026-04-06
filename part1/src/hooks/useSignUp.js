import { useApolloClient } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import { useSignIn } from "./useSignIn";

export const useSignUp = () => {
  const [signIn] = useSignIn();
  const [createUser, result] = useMutation(SIGN_UP);
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    try {
      const { data, error } = await createUser({
        variables: { user: { username, password } },
      });
      if (error) throw error;
      if (!data?.createUser) throw new Error("User creation failed");

      const { token, error: signInError } = await signIn({
        username,
        password,
      });
      if (signInError) throw new Error(signInError);
      if (!token) {
        throw new Error("Login failed: no token received");
      }
      await apolloClient.resetStore();
      return { token };
    } catch (error) {
      return { error: error.message };
    }
  };

  return [signUp, result];
};
