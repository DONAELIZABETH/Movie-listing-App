

const Pagination = ({ currentPage, totalResults, setPage }) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="pagination">
      <button onClick={() => setPage(Math.max(1, currentPage - 1))}>Previous</button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={() => setPage(Math.min(totalPages, currentPage + 1))}>Next</button>
    </div>
  );
};

export default Pagination;
