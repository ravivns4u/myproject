import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLoading } from './signup';
import { updateNotification } from './notifications';
import { Events } from '../interfaces/redux/events';
import { eventState } from '../initials';

export const getEvents = createAsyncThunk(
    'events/getEvents',
    async (payload:any, { dispatch }) => {
      dispatch(updateLoading({ loading: true }));
      const response = await fetch('/api/events/get-approved-events', {
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
              title: 'Failed to get approved events.',
            })
          );
          dispatch(updateLoading({ loading: false }));
          return;
        } else {
          const payload = data?.events;
          dispatch(
            updateEvents({
              events: payload,
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
            title: 'Failed to get approved events.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      }
    }
  );


  export const userEvents = createSlice({
    name: 'userEvents',
    initialState: eventState as any,
    reducers: {
        updateEvents: (
        state: Events,
        action: PayloadAction<{ events: any }>
      ) => {
        const { events } = action.payload;
        state.events = events;
      },

      resetEventState: () => eventState,
    },
  
    extraReducers: () => {},
  });


  export const {
    resetEventState,
    updateEvents,
  } = userEvents.actions;
  export default userEvents.reducer;