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
}

let initialState: Auth = {
  isLogin: false,
  current: {},
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
      };
    },
  },
});

export const { setUser, setUserLogOut } = userSlice.actions;
export default userSlice.reducer;
