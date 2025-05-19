// src/components/Pagination.tsx

const Pagination = ({
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    onPerPageChange
}: {
    currentPage: number;
    totalPages: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (page: number) => void;
}) => {
    const perPageOptions = [5, 10, 25, 50];

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
                        ? 'bg-blue-500 text-white rounded hover:bg-blue-600'
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

            <div className="flex items-center ms-4">
                <select name="perPage" 
                    id="perPageSelect" 
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                >
                    { perPageOptions.map((opt:number) => (
                    <option key={'page-'+opt} value={opt}>
                        {opt}
                    </option>
                    )) }
                </select>
                <label htmlFor="perPageSelect" className="ps-1">per page</label>
            </div>
        </div>
    );
};

export default Pagination;
