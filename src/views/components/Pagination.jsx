import React from 'react';
import { ChevronDown } from 'lucide-react';

const Pagination = ({ currentPage, setCurrentPage, totalPages, prevButtonText, nextButtonText, isRtl, itemsPerPage, setItemsPerPage, t }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 7;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);

            if (endPage === totalPages) {
                startPage = Math.max(1, endPage - 4);
            }

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    const handleItemsPerPageChange = (e) => {
        const value = e.target.value === 'all' ? 'all' : Number(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing page size
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 sm:p-6 bg-white/40 backdrop-blur-sm border-t border-slate-200/50 rounded-b-2xl">
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 w-full">
                    <button
                        className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm shadow-sm flex-1 sm:flex-none min-w-[100px]"
                        onClick={() => {
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        style={{ order: isRtl ? 3 : 1 }}
                    >
                        {prevButtonText}
                    </button>

                    <div className="flex flex-wrap items-center gap-1.5" style={{ order: 2 }}>
                        {getPageNumbers().map((number, index) => (
                            <button
                                key={index}
                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all shadow-sm
                                ${currentPage === number
                                        ? 'bg-indigo-600 text-white border-transparent shadow-[0_4px_10px_rgba(79,70,229,0.3)]'
                                        : number === '...'
                                            ? 'bg-transparent border-none shadow-none text-slate-400 cursor-default'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 hover:-translate-y-0.5'
                                    }`}
                                onClick={() => {
                                    if (typeof number === 'number') {
                                        setCurrentPage(number);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                disabled={number === '...'}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    <button
                        className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm shadow-sm flex-1 sm:flex-none min-w-[100px]"
                        onClick={() => {
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        style={{ order: isRtl ? 1 : 3 }}
                    >
                        {nextButtonText}
                    </button>
                </div>
            )}

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0 text-sm font-medium text-slate-600">
                <span>{t.itemsPerPage}:</span>
                <div className="relative">
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className={`appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer ${isRtl ? 'pl-8 pr-3' : 'pr-8 pl-3'}`}
                    >
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={500}>500</option>
                        <option value="all">{t.all}</option>
                    </select>
                    <ChevronDown size={14} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-2.5' : 'right-2.5'}`} />
                </div>
            </div>

        </div>
    );
};

export default Pagination;
