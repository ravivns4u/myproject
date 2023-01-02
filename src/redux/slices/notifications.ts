import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from '../initials';
import { NotificationProps } from '../interfaces';

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: NotificationState,
  reducers: {
    updateNotification: (
      state: NotificationProps,
      action: PayloadAction<NotificationProps>
    ) => {
      const { payload } = action;
      state.show = payload.show;
      state.message = payload.message;
      state.timeout = payload.timeout || 3000;
      state.title = payload.title;
      state.status = payload.status;
    },
    hideNotification: (state: NotificationProps) => {
      state.show = false;
    },
  },

  extraReducers: () => {},
});

export const { hideNotification, updateNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
