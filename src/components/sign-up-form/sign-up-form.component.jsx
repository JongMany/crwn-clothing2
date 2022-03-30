import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";

import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from "../sign-in-form/sign-in-form.styles";


const defaultFormFields = {
  displayName: "",  
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  
  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password!==confirmPassword) {
      alert('passwords do not match'); //모달창이면 더 좋을 듯
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      //성공적으로 등록하면 전체 초기화
      resetFormField();
    }catch(error) {
      //이미 user가 존재하는 경우
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
        console.log(error.code);
      } else {
        console.log('sign up encountered an error', error);
      } 
    }
    
  };
  return (
    //길이검사 추가하면 좋을 듯
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          label='DisplayName'
          labelFor='displayName'
          type="text"
          id="displayName"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label='Email'
          labelFor='sign-up-email'
          type="email"
          id="sign-up-email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label='Password'
          labelFor='sign-up-password'
          type="password"
          id="sign-up-password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label='Confirm Password'
          labelFor='confirm-password'
          type="password"
          id="confirm-password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
