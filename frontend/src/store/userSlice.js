import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  details: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    role: null 
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken(state, { payload }) {
      state.access = payload;
    },
    updateUserDetails(state, { payload }) {
      state.details = {
        id: payload.id,
        firstName: payload.first_name,
        lastName: payload.last_name,
        email: payload.email,
        username: payload.username,
        role: payload.role 
      };
    }
  }
});

const { updateUserDetails, updateAccessToken } = userSlice.actions;

// Selectors with role checks
const selectUserDetails = (state) => ({
  user: state.user.details,
  isAuthenticated: !!state.user.details?.id,
});


const selectAccessToken = ({ user }) => user.access;

export { updateUserDetails, updateAccessToken, selectUserDetails, selectAccessToken };

export default userSlice.reducer;
