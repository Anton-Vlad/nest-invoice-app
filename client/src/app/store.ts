import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice';
import invoicesReducer from '../invoices/invoicesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        invoices: invoicesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;