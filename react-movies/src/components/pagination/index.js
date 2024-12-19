import React, { useState, useEffect } from "react";
import "../../App.css"; // 引入自定义样式

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [tempPage, setTempPage] = useState(currentPage);

  // 当 currentPage 更新时，同步更新 tempPage
  useEffect(() => {
    setTempPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    // 允许输入为空或者合法的页码
    if (value === "" || (!isNaN(value) && value >= 1 && value <= totalPages)) {
      setTempPage(value);
    }
  };

  const handleInputBlur = () => {
    // 当输入框失去焦点时验证页码
    if (tempPage === "" || Number(tempPage) < 1 || Number(tempPage) > totalPages) {
      setTempPage(currentPage); // 恢复到当前页
    } else {
      onPageChange(Number(tempPage)); // 跳转到输入的页
    }
  };

  const handleKeyDown = (event) => {
    // 当用户按下回车键时
    if (event.key === "Enter") {
      if (tempPage !== "" && Number(tempPage) >= 1 && Number(tempPage) <= totalPages) {
        onPageChange(Number(tempPage)); // 跳转到输入的页
      } else {
        setTempPage(currentPage); // 恢复到当前页
      }
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page{" "}
        <input
          type="text"
          value={tempPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown} // 监听回车键
          className="pagination-input"
        />{" "}
        of {totalPages}
      </span>
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
