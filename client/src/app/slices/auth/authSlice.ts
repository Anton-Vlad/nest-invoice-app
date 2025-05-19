import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../../api/axios';

export interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    user: {
        email: string,
        name: string
    } | null
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
    error: null,
    user: null
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('nest_app_user_token');  
            setAuthToken(null); 
        },
        setToken: (state, action: PayloadAction<string>) => {
           state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.user = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                localStorage.setItem('nest_app_user_token', action.payload.access_token);
                setAuthToken(state.token);
            })
            .addCase(loginUser.rejected, (state, ) => {
                state.status = 'failed';
                state.error = 'Email or password are incorrect.';
            });
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;