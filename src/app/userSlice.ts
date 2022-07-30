import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
}

interface Auth {
  isLogin: boolean;
  loading: boolean;
  current: User;
}

let initialState: Auth = {
  isLogin: false,
  loading: true,
  current: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Auth>) => {
      return action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserLogOut: (state) => {
      return {
        current: {},
        isLogin: false,
        loading: false,
      };
    },
  },
});

export const { setUser, setStatus, setUserLogOut } = userSlice.actions;
export default userSlice.reducer;
