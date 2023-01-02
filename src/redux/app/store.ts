import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import notification from '../slices/notifications';
import signup from '../slices/signup';
import user from '../slices/user';
import profile from '../slices/profile';
import comments from '../slices/comments';
import events from '../slices/events';
import artists from '../slices/artists';
import portfolio from '../slices/portfolio';
import subscription from '../slices/subscription';
import notify from '../slices/feedsNotification'

export function makeStore() {
  return configureStore({
    reducer: { notification, signup, user, profile, comments, events, artists, portfolio, subscription,notify },
    devTools: process.env.NODE_ENV !== 'production',
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
