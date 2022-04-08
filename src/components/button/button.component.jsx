import "./button.styles";
import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPES_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
  /*
    buttonType에 따른 button 컴포넌트를 mapping한 객체를 정의함과 동시에
    들어온 buttonType에 따라 해당 컴포넌트를 반환
  */
  ({
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disable={isLoading} {...otherProps} >
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
