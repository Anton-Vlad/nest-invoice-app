import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import invoicesReducer from './slices/invoices/invoicesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        invoices: invoicesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;