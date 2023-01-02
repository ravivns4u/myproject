import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLoading } from './signup';
import { updateNotification } from './notifications';
import { Notify } from '../interfaces/redux/feedNotifications';
import { notifyState } from '../initials/feednotifications';


export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    async (payload:any, { dispatch }) => {
      dispatch(updateLoading({ loading: true }));
      const response = await fetch('/api/notifications/get-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      try {
        const data = (await response.json());
        if (data.error) {
          dispatch(
            updateNotification({
              message:
                'Unexpected Error Happened! Either refresh the page or contact the administrator.',
              show: true,
              status: 'error',
              title: 'Failed to get Notifications.',
            })
          );
          dispatch(updateLoading({ loading: false }));
          return;
        } else {
          const payload = data?.notify;
          dispatch(
            updateNotify({
              notify: payload,
            })
          );
          dispatch(updateLoading({ loading: false }));
          return;
        }
      } catch (error) {
        dispatch(
          updateNotification({
            message:
              'Unexpected Error Happened! Either refresh the page or contact the administrator.',
            show: true,
            status: 'error',
            title: 'Failed to get User Profile.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      }
    }
  );


  export const userNotify = createSlice({
    name: 'userNotify',
    initialState: notifyState as any,
    reducers: {
        updateNotify: (
        state: Notify,
        action: PayloadAction<{ notify: any }>
      ) => {
        const { notify } = action.payload;
        state.notify = notify;
      },
      setFeedId: (
        state: Notify,
        action: PayloadAction<{ feedUid: any }>
      ) => {
        const { feedUid } = action.payload;
        state.feed_uid = feedUid;
      },

      resetNotificationState: () => notifyState,
    },
  
    extraReducers: () => {},
  });


  export const {
    resetNotificationState,
    updateNotify,
    setFeedId
  } = userNotify.actions;
  export default userNotify.reducer;