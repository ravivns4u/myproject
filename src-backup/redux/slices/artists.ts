import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLoading } from './signup';
import { updateNotification } from './notifications';
import { Artists } from '../interfaces/redux/artists';
import { artistState } from '../initials/artists';


export const getArtists = createAsyncThunk(
    'artists/getArtists',
    async (payload:any, { dispatch }) => {
      dispatch(updateLoading({ loading: true }));
      const response = await fetch('/api/featured-users/get-featured-users', {
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
              title: 'Failed to get featured artists.',
            })
          );
          dispatch(updateLoading({ loading: false }));
          return;
        } else {
          const payload = data?.featuredUsers;
          dispatch(
            updateArtists({
              artists: payload,
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
            title: 'Failed to get featured artists.',
          })
        );
        dispatch(updateLoading({ loading: false }));
        return;
      }
    }
  );



  export const featureArtists = createSlice({
    name: 'featureArtists',
    initialState: artistState as any,
    reducers: {
        updateArtists: (
        state: Artists,
        action: PayloadAction<{ artists: any }>
      ) => {
        const { artists } = action.payload;
        state.artists = artists;
      },

      resetArtistState: () => artistState,
    },
  
    extraReducers: () => {},
  });


  export const {
    resetArtistState,
    updateArtists,
  } = featureArtists.actions;
  export default featureArtists.reducer;