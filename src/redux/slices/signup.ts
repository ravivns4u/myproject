import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpPayload, SignupState, SignupFormError } from '../interfaces';
import { signUpState } from '../initials';

export const signupForm = createSlice({
  name: 'signup',
  initialState: signUpState,
  reducers: {
    updateTextFields: (
      state: SignupState,
      action: PayloadAction<SignUpPayload>
    ) => {
      const { key, value } = action.payload;
      state.required[key] = value;
    },
    updateErrors: (
      state: SignupState,
      action: PayloadAction<SignupFormError>
    ) => {
      const { error, message } = action.payload;
      state.errors.error = error;
      state.errors.message = message;
    },
    updateLoading: (
      state: SignupState,
      action: PayloadAction<{ loading: boolean }>
    ) => {
      const { loading } = action.payload;
      state.loading = loading;
    },
  },

  extraReducers: () => {},
});

export const { updateTextFields, updateErrors, updateLoading } =
  signupForm.actions;
export default signupForm.reducer;

/*

Playing Around with Users:
  https://firebase.google.com/docs/auth/admin/manage-users#update_a_user

*/
