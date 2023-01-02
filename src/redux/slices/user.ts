import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, UserFirebasePayload } from "../interfaces";
import { userState } from "../initials";
import { updateNotification, hideNotification } from "./notifications";
import { ResponseParams } from "../interfaces/backend/apiHandlers";
import { CustomerState } from "../interfaces/frontend/user";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (payload: UserFirebasePayload, { dispatch }) => {
    const response = await fetch("/api/user-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    dispatch(hideNotification());
    const userDetails: ResponseParams = await response.json();
    if (userDetails.error) {
      alert(userDetails.msg);
      dispatch(
        updateNotification({
          message: userDetails.msg,
          show: true,
          status: "error",
          title: "Login Failed",
        })
      );
      return;
    } else {
      const userPayload = userDetails.payload as UserState;
      dispatch(updateFields(userPayload));
    }
  }
);

export const getCustomerDetails = createAsyncThunk(
  "user/getCustomerDetails",
  async (payload: UserFirebasePayload, { dispatch }) => {
    const response = await fetch("/api/customers/customer-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    dispatch(hideNotification());
    const userDetails: ResponseParams = await response.json();
    console.log(userDetails, "userDetails");
    if (userDetails.error) {
      dispatch(
        updateNotification({
          message: userDetails.msg,
          show: true,
          status: "error",
          title: "Login Failed",
        })
      );
      return;
    } else {
      const userPayload = userDetails.payload as CustomerState;
      dispatch(updateCustomerFields(userPayload));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    updateFields: (
      state: CustomerState | UserState,
      action: PayloadAction<UserState>
    ) => {
      state = state as UserState;
      const {
        email,
        emailVerified,
        displayName,
        isLoggedIn,
        uid,
        photoURL,
        firebaseToken,
        adminApproved,
        merchantSlug,
        user,
        isAdmin,
      } = action.payload;
      state.email = email;
      state.emailVerified = emailVerified;
      state.displayName = displayName;
      state.isLoggedIn = isLoggedIn;
      state.uid = uid;
      state.photoURL = photoURL;
      state.firebaseToken = firebaseToken;
      state.adminApproved = adminApproved;
      state.merchantSlug = merchantSlug;
      state.isAdmin = isAdmin ?? false;
      state.user = user;
    },
    updateCustomerFields: (
      state: CustomerState | UserState,
      action: PayloadAction<CustomerState>
    ) => {
      state = state as CustomerState;
      const {
        email,
        emailVerified,
        displayName,
        isLoggedIn,
        uid,
        photoURL,
        firebaseToken,
        adminApproved,
        customerSlug,
        user,
        isAdmin,
        dob,
      } = action.payload;
      state.email = email;
      state.emailVerified = emailVerified;
      state.displayName = displayName;
      state.isLoggedIn = isLoggedIn;
      state.uid = uid;
      state.photoURL = photoURL;
      state.firebaseToken = firebaseToken;
      state.adminApproved = adminApproved;
      state.customerSlug = customerSlug;
      state.dob = dob;
      state.isAdmin = isAdmin ?? false;
      state.user = user;
      console.log("redux isLoggedIn: ", state.isLoggedIn);
    },
    resetUserState: () => userState,
  },

  extraReducers: () => {},
});

export const { updateFields, resetUserState, updateCustomerFields } =
  userSlice.actions;
export default userSlice.reducer;

/*

Playing Around with Users:
  https://firebase.google.com/docs/auth/admin/manage-users#update_a_user

*/
