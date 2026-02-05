import PaginationNext from "~/Components/Pagination/PaginationNext";
import PaginationPrevious from "~/Components/Pagination/PaginationPrevious";
import PaginationPage from "~/Components/Pagination/PaginationPage";
import { useLocation } from "react-router";

export interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
}

const Pagination = (props: PaginationProps) => {
  const {total, limit, offset} = props;

  const location = useLocation();
  const pathname = location.pathname;

  const totalPages = Math.ceil(total / limit);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const lastPage = pages.at(-1) ?? 1;
  const currentPage = offset !== 0 ? offset / limit + 1 : 1;

  return (
    <div className="text-center">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs pb-8">
        <PaginationPrevious currentPage={currentPage} pathname={pathname}/>
        {pages.map(page => {
          return (
            <PaginationPage key={page} page={page} currentPage={currentPage} pathname={pathname}/>
          );
        })}
        <PaginationNext currentPage={currentPage} lastPage={lastPage} pathname={pathname}/>
      </nav>
    </div>
  );
};
export default Pagination;