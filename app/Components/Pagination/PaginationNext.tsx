import { NavLink } from "@remix-run/react";
import { cn } from "~/utils/cn";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export interface PaginationNextProps {
  currentPage: number;
  lastPage: number;
  pathname: string;
}

const PaginationNext = (props: PaginationNextProps) => {
  const {currentPage, lastPage, pathname} = props;

  const isVisible = () => {
    return currentPage < lastPage;
  };

  const className = cn(
    "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    isVisible() && "text-gray-900",
  );

  return (
    <>
      {isVisible() ? (
        <NavLink
          className={className}
          to={`${pathname}?page=${currentPage + 1}`}
        ><ChevronRightIcon className="h-5 w-5"/></NavLink>
      ) : (
        <span className={className}><ChevronRightIcon className="h-5 w-5"/></span>
      )
      }
    </>
  );
};
export default PaginationNext;