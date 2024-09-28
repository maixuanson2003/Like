const Pagination = ({
  currentPage,
  pageSize,
  totalRow,
  onPageChange,
  onSizeChange,
  onIndexChange,
}) => {
  const totalPage = Math.ceil(totalRow / pageSize); // Tổng số trang

  const handleChangePage = (page) => {
    onPageChange(page);
  };

  const handleChangeSize = (size) => {
    onSizeChange(size);
  };
  const handleChangeindex = (index) => {
    onIndexChange(index);
  };

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  const goNextPage = () => {
    // Nếu trang hiện tại bằng tổng số trang  thì không tăng thêm
    if (currentPage === totalPage) return;
    handleChangePage(currentPage + 1);
  };

  const goPrevPage = () => {
    // Nếu số trang bẳng 1 thì không giảm nữa
    if (currentPage <= 1) return;
    handleChangePage(currentPage - 1);
  };

  const goFirstPage = () => {
    onPageChange(currentPage);
  };

  const goLastPage = () => {
    onPageChange(totalPage);
  };

  return (
    <>
      {totalPage > 0 && (
        <div className="flex items-center gap-x-2">
          <button
            className="border p-2 py-1 text-blue-500 rounded"
            onClick={() => goPrevPage()}
          >
            ＜
          </button>
          {pages.map((number, index) => (
            <button
              onClick={() => {
                console.log(number);
                handleChangePage(number);
              }}
              key={number}
              className={`border px-2 py-1 rounded text-blue-500 ${
                number === currentPage ? "border-blue-500  block" : ""
              } ${
                number === 1 ||
                number === totalPage ||
                number <= currentPage ||
                number == currentPage + 1
                  ? "block"
                  : " hidden"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            className="border px-2 py-1 text-blue-500 rounded"
            onClick={() => goNextPage()}
          >
            ＞
          </button>
          <div>
            <select
              className="border p-2 rounded bg-transparent"
              onChange={(e) => {
                handleChangeSize(e.target.value);
              }}
              value={pageSize}
            >
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={30}>30 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
