import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  photoUrl?: string;
}

interface Auth {
  isLogin: boolean;
  current: User;
  isLoading: boolean;
}

let initialState: Auth = {
  isLogin: false,
  current: {},
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Auth>) => {
      return action.payload;
    },
    setUserLogOut: () => {
      return {
        current: {},
        isLogin: false,
        isLoading: false,
      };
    },
  },
});

export const { setUser, setUserLogOut } = userSlice.actions;
export default userSlice.reducer;
