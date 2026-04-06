import { useSignUp } from "../../hooks/useSignUp";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-native";

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    const { token, error } = await signUp({ username, password });
    if (token) {
      navigate("/");
    }
    if (error) {
      console.error("Something went wrong", error);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
