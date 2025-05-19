import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axios';


export interface Invoice {
    id: string;
    vendor_name: string;
    amount: number;
    due_date: string;
    description: string | undefined;
    user_id: number;
    paid: boolean;
}

interface InvoiceState {
    invoices: Invoice[];
    status: 'idle' | 'loading' | 'failed';
}


const initialState = {
    invoices: [],
    status: 'idle',
};

export const fetchInvoices = createAsyncThunk(
    'invoices',
    async () => {
        const res = await api.get('/invoices');
        return res.data.data;
    }
);

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'idle';
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default invoicesSlice.reducer;