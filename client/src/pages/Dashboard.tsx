import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { type RootState } from '../app/store';
import { fetchInvoices, setPage, setPerPage } from '../app/slices/invoices/invoicesSlice';
import Navbar from '../components/Navbar';
import InvoiceTable from '../components/InvoiceTable';
import { logout } from '../app/slices/auth/authSlice';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const invoices = useAppSelector((state: RootState) => state.invoices.items);
    const error = useAppSelector((state) => state.invoices.error);
    const page = useAppSelector((state: RootState) => state.invoices.currentPage);
    const totalPages = useAppSelector((state: RootState) => state.invoices.totalPages);
    const perPage = useAppSelector((state: RootState) => state.invoices.perPage);
    const totals = useAppSelector((state: RootState) => state.invoices.totals);

    const authUser = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchInvoices({ page, perPage }));
    }, [dispatch, page, perPage]);

    useEffect(() => {
        if (error === 'Unauthorized') {
            dispatch(logout());
            navigate('/');
        }
    }, [error]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handlePerPageChange = (newPerPage: number) => {
        dispatch(setPerPage(newPerPage));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">

                {(authUser) ? (
                    <p className="py-2 px-4 mb-5 bg-green-200 border border-green-500 text-green-500 inline-block rounded">
                        Welcome back, {authUser.name}
                    </p>
                ) : null}

                <h2 className="text-2xl font-bold mb-4">{totals} Invoices</h2>

                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (invoices && invoices.length ? <InvoiceTable invoices={invoices} currentPage={page} totalPages={totalPages} perPage={perPage} onPageChange={handlePageChange} onPerPageChange={handlePerPageChange} />
                    : "No invoces for the current user."
                )}
            </div>
        </div>
    );
}