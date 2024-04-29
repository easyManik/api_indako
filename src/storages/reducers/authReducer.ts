/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  email: string;
  role: 'kasir' | 'owner' | '';
}

const initialState: AuthState = {
  email: '',
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const {setEmail, setRole} = authSlice.actions;
export default authSlice.reducer;
