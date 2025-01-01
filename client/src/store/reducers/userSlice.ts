import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  login,
  logout,
  registration,
  checkAuth,
} from "./ActionCreators/UserAC";
import { AuthResponse, KnownError } from "@src/types/main";
import { UserState } from "@src/types/storeTypes";

const initialState: UserState = {
  isAuth: false,
  user: null,
  error: null,
  isLoading: false,
};

const handleAuthSuccess = (
  state: UserState,
  action: PayloadAction<AuthResponse>
) => {
  state.user = action.payload.user;
  localStorage.setItem("token", action.payload.accessToken);
  state.isLoading = false;
  state.isAuth = true;
};

const handleAuthError = (
  state: UserState,
  action: PayloadAction<KnownError>
) => {
  state.error = action.payload;
  state.isLoading = false;
  console.error(action.payload);
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, handleAuthSuccess)
      .addCase(login.rejected, handleAuthError)
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, handleAuthSuccess)
      .addCase(registration.rejected, handleAuthError)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("token");
        state.isAuth = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, handleAuthSuccess);
  },
});

export const { toggleAuth, setError } = userSlice.actions;

export default userSlice.reducer;
