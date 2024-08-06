import React from 'react';

const Index = ({ currentPage, totalPages, setCurrent }) => {
  const itemsPerPage = 50;
  const totalPage = Math.ceil(totalPages / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrent((prevPage) => prevPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrent((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      {
        totalPages > 0 && <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPage}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPage}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Next
          </button>
        </div>
      }
    </>

  );
};

export default Index;
