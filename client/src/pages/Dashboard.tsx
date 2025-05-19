import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchInvoices, type Invoice } from '../invoices/invoicesSlice';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { invoices, status } = useAppSelector((state) => state.invoices);

    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Invoices</h2>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (invoices ? (
                    <table className="min-w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Customer</th>
                                <th className="border px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv: Invoice) => (
                                <tr key={inv.id}>
                                    <td className="border px-4 py-2">{inv.id}</td>
                                    <td className="border px-4 py-2">{inv.vendor_name}</td>
                                    <td className="border px-4 py-2">${inv.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> ) : "No invoces"
                )}
            </div>
        </div>
    );
}