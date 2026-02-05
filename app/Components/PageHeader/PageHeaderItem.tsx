import { NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn";

interface PageHeaderItemProps {
  to: string;
  children?: ReactNode;
}

const PageHeaderItem = (props: PageHeaderItemProps) => {
  const {to} = props;
  const className = (isActive: boolean) => cn(
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent",
    isActive && "text-indigo-600 md:p-0",
  );

  return (
    <>
      <NavLink
        className={({isActive}) => className(isActive)}
        to={to}
      >
        {props.children}
      </NavLink>
    </>
  );
};
export default PageHeaderItem;