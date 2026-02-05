import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";

export interface PaginationPageProps {
  page: number;
  currentPage: number;
  pathname: string;
}

const PaginationPage = (props: PaginationPageProps) => {
  const {page, currentPage, pathname} = props;

  const className = cn(
    "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    page === currentPage && "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  );

  return (
    <>
      <NavLink
        className={className}
        key={page}
        to={`${pathname}?page=${page}`}
      >{page}</NavLink>
    </>
  );
};
export default PaginationPage;