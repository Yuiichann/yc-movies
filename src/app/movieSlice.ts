import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movies {
  name: string;
  origin_name: string;
  slug: string;
  year: number;
  _id: string;
}

const initialState: Movies[] = [];

const MovieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addListMovies: (state, action: PayloadAction<Movies[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addListMovies } = MovieSlice.actions;
export default MovieSlice.reducer;
