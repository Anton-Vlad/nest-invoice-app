import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../../api/axios';


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
    perPage: number;
    totals: number;
}


const initialState: InvoiceState = {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totals: 0,
};

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async ({ page = 1, perPage = 10}: {  page: number, perPage: number}) => {
        const response = await api.get(`/invoices?page=${page}&limit=${perPage}`);
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
        setPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
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
                state.perPage = action.payload.pagination.limit;
                state.currentPage = action.payload.pagination.page;
                state.totals = action.payload.pagination.total;
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

export const { setPage, setPerPage } = invoicesSlice.actions;

export default invoicesSlice.reducer;