import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typedStorage } from '@libs/storage';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSuccess: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearSession: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      typedStorage.delete('user_session');
    },
  },
});

export const { setAuthSuccess, clearSession } = authSlice.actions;
export default authSlice.reducer;