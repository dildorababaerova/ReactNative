import { useSignIn } from "../../hooks/useSignIn";
import SignInForm from "../SignForm";
import { useNavigate } from "react-router-native";

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    const { token, error } = await signIn({ username, password });
    if (token) {
      navigate("/");
    }
    if (error) {
      console.error("Something went wrong", error);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
