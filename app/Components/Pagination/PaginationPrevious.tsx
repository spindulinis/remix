import { cn } from "~/utils/cn";
import { NavLink } from "@remix-run/react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export interface PaginationPreviousProps {
  currentPage: number;
  pathname: string;
}

const PaginationPrevious = (props: PaginationPreviousProps) => {
  const {currentPage, pathname} = props;

  const isVisible = () => {
    return currentPage > 1;
  };

  const className = cn(
    "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    isVisible() && "text-gray-900",
  );

  return (
    <>
      {isVisible() ? (
        <NavLink
          className={className}
          to={`${pathname}?page=${currentPage - 1}`}
        >
          <ChevronLeftIcon className="h-5 w-5"/></NavLink>
      ) : (
        <span className={className}><ChevronLeftIcon className="h-5 w-5"/></span>
      )
      }
    </>
  );
};
export default PaginationPrevious;