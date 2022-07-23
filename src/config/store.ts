import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from '../app/movieSlice';
const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
