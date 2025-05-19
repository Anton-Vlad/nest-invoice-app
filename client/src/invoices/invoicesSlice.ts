import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoicesArray: [],
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        appendInvoices: (state) => {
            state.invoicesArray = [];
        }
    },
});

export const { appendInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;