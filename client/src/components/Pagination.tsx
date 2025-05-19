// src/components/Pagination.tsx

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    return (
        <div className="flex justify-center mt-6 space-x-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
