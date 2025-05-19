import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../api/axios';

export interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    token: null,
    status: 'idle',
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        return response.data.access_token;
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
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.token = action.payload;
                localStorage.setItem('nest_app_user_token', action.payload);
                setAuthToken(action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                console.log("RESP TOKEN VALUE", action)
            });
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;