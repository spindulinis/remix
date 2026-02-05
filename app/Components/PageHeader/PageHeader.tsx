import { AuthenticationDto } from "~/dtos/authentication.dto";
import { Bars4Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useOpenState } from "~/hooks/useOpenState";
import UserMenu from "~/Components/PageHeader/UserMenu";
import PageHeaderItem from "~/Components/PageHeader/PageHeaderItem";

export interface PageHeaderProps {
  authentication: AuthenticationDto
}

const PageHeader = (props: PageHeaderProps) => {
  const { authentication } = props;
  const { isOpen, setIsOpen, ref: menuRef } = useOpenState();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-gray-200 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Catalog</span>
          </a>
          {!isOpen && (
            <button type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(true)}>
              <Bars4Icon className="h-5 w-5"/>
            </button>
          )}
          {isOpen && (
            <button type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-5 w-5"/>
            </button>
          )}
          <div
            className={
              `w-full md:block md:w-auto 
            ${isOpen ? "block" : "hidden"}`
            }
            ref={menuRef}
          >
            <ul
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <PageHeaderItem to={`products`}>Products</PageHeaderItem>
              </li>
              {!authentication && (
                <>
                  <li>
                    <PageHeaderItem to={`login`}>Login</PageHeaderItem>
                  </li>
                  <li>
                    <PageHeaderItem to={`signup`}>Sign up</PageHeaderItem>
                  </li>
                </>
              )}
              <li>
                <UserMenu authentication={authentication}/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default PageHeader;