import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  id: "",
  name: "",
  email: "",
  role: "",
  isLoggedIn: !!localStorage.getItem("jwt"),
};

// Create a slice of the Redux store
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    init: (state, action) => {
      return action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
    },
  },
});

// Export actions for use in components
export const { init, updateName, logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
