import { AuthenticationDto } from "~/dtos/authentication.dto";
import { useOpenState } from "~/hooks/useOpenState";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PageHeaderSubItem from "~/Components/PageHeader/PageHeaderSubItem";

interface UserMenuProps {
  authentication: AuthenticationDto;
}

const UserMenu = (props: UserMenuProps) => {
  const { authentication } = props;
  const { isOpen, setIsOpen, ref: menuRef } = useOpenState();
  return (
    authentication && <>
        <button
            className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            onClick={() => setIsOpen(true)}>
          {authentication.user.firstName} {authentication.user.lastName}
            <ChevronDownIcon className="h-5 w-5"/>
        </button>
        <div
            className={
              `z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 
                        ${isOpen ? "block absolute -ml-4" : "hidden"}`
            }
            ref={menuRef}>
            <ul className="text-sm text-gray-700 dark:text-gray-400">
                <li>
                    <PageHeaderSubItem to={`admin/products`}>Products</PageHeaderSubItem>
                </li>
                <li>
                    <PageHeaderSubItem to={`admin/categories`}>Categories</PageHeaderSubItem>
                </li>
                <li>
                    <PageHeaderSubItem to={`admin/attributes`}>Attributes</PageHeaderSubItem>
                </li>
                <li>
                    <PageHeaderSubItem to={`admin/users`}>Users</PageHeaderSubItem>
                </li>
                <li>
                    <PageHeaderSubItem to={`logout`}>Logout</PageHeaderSubItem>
                </li>
            </ul>
        </div>
    </>
  );
};
export default UserMenu;