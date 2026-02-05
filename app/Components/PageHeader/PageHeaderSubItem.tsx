import { NavLink } from "@remix-run/react";
import { ReactNode } from "react";
import { cn } from "~/utils/cn";

interface PageHeaderItemSubItemProps {
  to: string;
  children?: ReactNode;
}

const PageHeaderSubItem = (props: PageHeaderItemSubItemProps) => {
  const {to} = props;
  const className = (isActive: boolean) => cn(
    "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
    isActive && "text-black",
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
export default PageHeaderSubItem;