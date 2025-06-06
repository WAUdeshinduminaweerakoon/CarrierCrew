import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col items-center justify-between mt-6 gap-25 sm:flex-row">
      <div className="flex items-center gap-20">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoBack}
          className="px-4 py-2 text-sm text-white bg-green-700 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="self-center text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="px-4 py-2 text-sm text-white bg-green-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
