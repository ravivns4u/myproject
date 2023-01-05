import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateNotification } from './notifications';
import { updateLoading } from './signup';
import { portfolioState } from '../initials/portfolio';
import { Portfolio } from '../interfaces/redux/portfolio';

export const getPorfolios = createAsyncThunk('portfolio/getPortfolio', async (payload: any, { dispatch }) => {
  dispatch(updateLoading({ loading: true }));
  const response = await fetch('/api/featured-users/get-portfolio-by-uid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  try {
    const data = await response.json();
    if (data.error) {
      dispatch(
        updateNotification({
          message: 'Unexpected Error Happened! Either refresh the page or contact the administrator.',
          show: true,
          status: 'error',
          title: 'Failed to get approved portfolio.',
        })
      );
      dispatch(updateLoading({ loading: false }));
      return;
    } else {
      const payload = data?.portfolio;
      dispatch(
        updatePortfolio({
          portfolio: payload,
        })
      );
      dispatch(updateLoading({ loading: false }));
      return;
    }
  } catch (error) {
    dispatch(
      updateNotification({
        message: 'Unexpected Error Happened! Either refresh the page or contact the administrator.',
        show: true,
        status: 'error',
        title: 'Failed to get approved events.',
      })
    );
    dispatch(updateLoading({ loading: false }));
    return;
  }
});

export const userPortfolio = createSlice({
  name: 'userPortfolio',
  initialState: portfolioState as any,
  reducers: {
    updatePortfolio: (state: Portfolio, action: PayloadAction<{ portfolio: any }>) => {
      const { portfolio } = action.payload;
      state.portfolio = portfolio;
    },

    resetPortfolioState: () => portfolioState,
  },

  extraReducers: () => {},
});

export const { resetPortfolioState, updatePortfolio } = userPortfolio.actions;
export default userPortfolio.reducer;
