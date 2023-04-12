import React, { useContext } from "react";
import Context from "../app/context";

const Pagination = () => {
  const { articleList, getAllArticles } = useContext(Context);
  const articlesCount = articleList.articlesCount;
  const currentPage = articleList.currentPage;
  const articlesPerPage = articleList.articlesPerPage;

  const changePageHandle = (page) => {
    getAllArticles({ page });
  };

  const pages = Array.from(
    { length: Math.ceil(articlesCount / articlesPerPage) },
    (_, number) => number
  );

  if (articlesCount <= articlesPerPage) return;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => changePageHandle(page)}
            key={page.toString()}
          >
            <button type="button" className="page-link">
              {page + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
