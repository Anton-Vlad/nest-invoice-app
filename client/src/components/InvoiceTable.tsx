import { type Invoice } from '../app/slices/invoices/invoicesSlice';
import { useState } from 'react';
import Pagination from './Pagination';
import Modal from './Modal';

export default function InvoiceTable({
    invoices,
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    onPerPageChange
}: {
    invoices: Invoice[],
    currentPage: number,
    totalPages: number,
    perPage: number,
    onPageChange: (page: number) => void,
    onPerPageChange: (page: number) => void
}) {

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (date: string): string => {
        let d = new Date(date);
        return d.toLocaleDateString();
    }

    const handlePageChange = (page: number) => {
        onPageChange(page);
    }

    const handlePerPageChange = (page: number) => {
        onPerPageChange(page);
    }

    const handleOpen = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Number</th>
                            <th className="px-4 py-3">Payee</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {invoices.map((inv: Invoice) => (
                            <tr key={inv.id} className="hover:bg-gray-200">
                                <td className="px-4 py-3">#{inv.id}</td>
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

                                <td>
                                    <div className="flex justify-end aling-center pe-4">
                                        <button className="bg-blue-500 px-3 py-1 rounded text-white rounded hover:bg-blue-600"
                                            onClick={() => handleOpen(inv)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} perPage={perPage}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedInvoice ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Invoice #{selectedInvoice.id} <span className="text-gray-500">details</span></h2>
                        <p className="mb-1"><strong>Customer:</strong> {selectedInvoice.vendor_name}</p>
                        <p className="mb-1"><strong>Description:</strong> {selectedInvoice.description}</p>
                        <p className="mb-1"><strong>Amount:</strong> ${selectedInvoice.amount}</p>
                        <p className="mb-1">
                            <strong className="pe-3">Status:</strong>
                            <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${selectedInvoice.paid
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {selectedInvoice.paid ? 'Paid' : 'Open'}
                            </span>
                        </p>
                        <p>
                            <strong>DueDate:</strong> {formatDate(selectedInvoice.due_date)}
                        </p>

                        <div className="flex justify-end">
                            <button className="bg-blue-500 px-3 py-1 pb-2 rounded text-white rounded hover:bg-blue-600"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Ok, got it
                            </button>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </>
    );
}