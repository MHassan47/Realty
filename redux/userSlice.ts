import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface UserSlice {
  user: User;
}
interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

// Define the initial state using that type
const initialState: UserSlice = {
  user: { id: null, name: null, email: null },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
