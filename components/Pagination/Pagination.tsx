import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

type PageChangeEvent = {
  selected: number;
};

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) {
  const handlePageChange = (event: PageChangeEvent) => {
    setPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      className={css.pagination}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      previousLabel={"Prev"}
      nextLabel={"Next"}
      activeClassName={css.active}
      pageClassName={css.page}
      breakLabel={"..."}
    />
  );
}