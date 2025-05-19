import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { type RootState } from '../app/store';
import { fetchInvoices, setPage } from '../invoices/invoicesSlice';
import Navbar from '../components/Navbar';
import InvoiceTable from '../components/InvoiceTable';
import { logout } from '../auth/authSlice';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const invoices = useAppSelector((state: RootState) => state.invoices.items);
    const error = useAppSelector((state) => state.invoices.error);
    const page = useAppSelector((state: RootState) => state.invoices.currentPage);
    const totalPages = useAppSelector((state: RootState) => state.invoices.totalPages);

    useEffect(() => {
        dispatch(fetchInvoices(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (error === 'Unauthorized') {
            dispatch(logout());
            navigate('/');
        }
    }, [error]);

    const handlePageChange = (newPage: number) => {
        console.log('[DASHBOARD] GO TO PAGE: ', newPage)
        dispatch(setPage(newPage));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Invoices</h2>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (invoices && invoices.length ? <InvoiceTable invoices={invoices} currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                    : "No invoces for the current user."
                )}
            </div>
        </div>
    );
}