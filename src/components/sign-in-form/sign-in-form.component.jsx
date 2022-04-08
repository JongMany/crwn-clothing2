import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer, SignUpContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      //성공적으로 로그인하면 전체 초기화
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log("sign in encountered an error", error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          labelFor="sign-in-email"
          type="email"
          id="sign-in-email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          labelFor="sign-in-password"
          type="password"
          id="sign-in-password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
