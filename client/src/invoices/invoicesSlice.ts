import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
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

interface RejectPayload {
    message: string;
    status?: number;
}

interface InvoiceState {
    items: Invoice[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    currentPage: number;
    totalPages: number;
}


const initialState: InvoiceState = {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
};

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async (page: number = 1) => {
        const response = await api.get(`/invoices?page=${page}`);
        return response.data;
    }
);

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload.data;
                state.totalPages = action.payload.pagination.pageCount;
                state.currentPage = action.payload.pagination.page;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = 'failed';

                const payload = action.error as RejectPayload;

                if (payload?.message === "Request failed with status code 401") {
                    state.error = 'Unauthorized';
                } else {
                    state.error = payload?.message || 'Failed to fetch invoices';
                }
            });
    },
});

export const { setPage } = invoicesSlice.actions;

export default invoicesSlice.reducer;