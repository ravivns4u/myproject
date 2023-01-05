import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionState } from '../interfaces';
import { subscriptionState } from '../initials/subscription';

export const subscription = createSlice({
  name: 'subscription',
  initialState: subscriptionState,
  reducers: {
    updateTermsAndCondition: (state: SubscriptionState, action: PayloadAction<{ isTermsAndCondition: boolean }>) => {
      const { isTermsAndCondition } = action.payload;
      state.isTermsAndCondition = isTermsAndCondition;
    },
    updateSubscription: (state: SubscriptionState, action: PayloadAction<{ isSubscription: boolean }>) => {
      const { isSubscription } = action.payload;
      state.isSubscription = isSubscription;
    },
    updateMerchant: (state: SubscriptionState, action: PayloadAction<{ isMerchants: boolean }>) => {
      const { isMerchants } = action.payload;
      state.isMerchants = isMerchants;
    },
  },

  extraReducers: () => {},
});

export const { updateTermsAndCondition, updateSubscription, updateMerchant } = subscription.actions;
export default subscription.reducer;
