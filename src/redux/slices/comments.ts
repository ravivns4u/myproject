import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLoading } from './signup';
import { updateNotification } from './notifications';
import { Comments } from '../interfaces/redux/comments';
import  {commentState}  from "../initials";

export const getComments = createAsyncThunk(
    'comments/getComments',
    async (payload:any, { dispatch }) => {
      dispatch(updateLoading({ loading: true }));
      const response = await fetch('/api/comments/get-comments', {
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
              title: 'Failed to get User Comment.',
            })
          );
          dispatch(updateLoading({ loading: false }));
          return;
        } else {
          const payload = data?.comments;
          dispatch(
            updateComments({
              comments: payload,
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


  export const userComments = createSlice({
    name: 'userComments',
    initialState: commentState as Comments,
    reducers: {
        updateComments: (
        state: Comments,
        action: PayloadAction<{ comments: any }>
      ) => {
        const { comments } = action.payload;
        state.comments = comments;
      },

      resetUserCommentState: () => commentState,
    },
  
    extraReducers: () => {},
  });


  export const {
    resetUserCommentState,
    updateComments,
  } = userComments.actions;
  export default userComments.reducer;