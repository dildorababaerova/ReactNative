import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "./index";

describe("SignInForm", () => {
  it("calls onSubmit prop after pressing the submit button", async () => {
    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    // Изменяем значения полей
    fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");

    // Нажимаем кнопку
    fireEvent.press(screen.getByText("Sign in"));

    // Ждём, пока onSubmit реально вызовется
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        username: "kalle",
        password: "password",
      });
    });
  });
});
