import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteMovie {
  slug: string;
  name: string;
  origin_name: string;
}

const initialState: FavoriteMovie[] = [];

const MovieSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initList: (state, action: PayloadAction<FavoriteMovie[]>) => {
      return action.payload;
    },
    addMovie: (state, action: PayloadAction<FavoriteMovie>) => {
      const newState = [action.payload, ...state];
      return newState;
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      const newState = [...state];
      newState.splice(action.payload, 1);
      return newState;
    },
    removeList: () => {
      return [];
    },
  },
});

export const { initList, removeList, addMovie } = MovieSlice.actions;
export default MovieSlice.reducer;
