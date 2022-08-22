import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteMovie {
  slug: string;
  name: string;
  origin_name: string;
  id?: string;
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
    removeMovie: (state, action: PayloadAction<string>) => {
      const newState = [...state];
      const index = state.findIndex((item) => item.id === action.payload);
      newState.splice(index, 1);
      return newState;
    },
    removeList: () => {
      return [];
    },
  },
});

export const { initList, removeList, addMovie, removeMovie } = MovieSlice.actions;
export default MovieSlice.reducer;
