import { type Invoice } from '../invoices/invoicesSlice';
import Pagination from './Pagination';

export default function InvoiceTable({ 
    invoices, 
    currentPage, 
    totalPages, 
    onPageChange 
} : { 
    invoices: Invoice[],
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}) {

    const formatDate = (date: string): string => {
        let d = new Date(date);
        return d.toLocaleDateString();
    }

    const handlePageChange = (page: number) => {
        console.log('[TABLE] GO TO PAGE: ', page)
        onPageChange(page);
    }

    return (
        <>
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Payee</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {invoices.map((inv: Invoice) => (
                            <tr key={inv.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{formatDate(inv.due_date)}</td>
                                <td className="px-4 py-3">{inv.vendor_name}</td>
                                <td className="px-4 py-3">{inv.description}</td>
                                <td className="px-4 py-3">{formatDate(inv.due_date)}</td>
                                <td className="px-4 py-3">${inv.amount}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${inv.paid
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {inv.paid ? 'Paid' : 'Open'}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
}