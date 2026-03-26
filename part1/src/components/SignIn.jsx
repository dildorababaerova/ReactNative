import { useSignIn } from "../hooks/useSignIn";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-native";
import AuthStorage from "../utils/authStorage";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const authStorage = new AuthStorage();

  const onSubmit = async ({ username, password }) => {
    const { token, error } = await signIn({ username, password });
    if (token) {
      await authStorage.setAccessToken(token);
      navigate("/");
    }
    if (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div>
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignIn;
