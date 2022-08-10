import { configureStore } from '@reduxjs/toolkit';
import FavoriteReducer from '../app/favoritesSlice';
import MovieReducer from '../app/movieSlice';
import UserReducer from '../app/userSlice';

const store = configureStore({
  reducer: {
    movies: MovieReducer,
    user: UserReducer,
    favoriteMovies: FavoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
