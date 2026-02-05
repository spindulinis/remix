import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import Link from "~/Components/Link";
import Delete from "~/Components/Delete";
import { CategoryApi } from "~/models/category.server";
import { CategoryDto } from "~/dtos/category.dto";
import OrderChange from "~/Components/OrderChange";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import DownloadCsv from "~/Components/DownloadCsv";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await CategoryApi.getAll(request);
};

export default function AdminCategories() {
  const categories = useLoaderData<typeof loader>() as CategoryDto[];

  const rootCategories = categories
    .filter(category => category.parentId === null)
    .sort((a, b) => a.order - b.order);

  const renderCategoryTree = (currentCategory: CategoryDto, level: number, prevItem: number | undefined, nextItem: number | undefined) => {
    const children = categories
      .filter(category => category.parentId === currentCategory.id)
      .sort((a, b) => a.order - b.order);
    const marginLeft = `${level * 20}px`;
    return (
      <li key={currentCategory.id} style={{ marginLeft: marginLeft }}>
        <div className="block py-3 px-6 text-left w-full border border-gray-200">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
            <div className="py-2">{currentCategory.title}</div>
            <div className="py-2">Order: {currentCategory.order}</div>
            <div className="text-right inline-flex">
              <OrderChange action={`/admin/category/${currentCategory.id}/change-order/${prevItem}`}
                           direction={'up'}
                           disabled={!prevItem}/>
              <OrderChange action={`/admin/category/${currentCategory.id}/change-order/${nextItem}`}
                           direction={'down'}
                           disabled={!nextItem}/>
              <Link to={`/admin/category/${currentCategory.id}/edit`} type={"button"}>Edit</Link>
              <Delete action={`/admin/category/${currentCategory.id}/destroy`} disabled={children.length > 0}/>
            </div>
          </div>
        </div>
        {children.length > 0 && (
          <ul>
            {children.map((child, index, array) => {
              const prevChild = index > 0 ? array[index - 1] : null;
              const nextChild = index < array.length - 1 ? array[index + 1] : null;
              return renderCategoryTree(child, level + 1, prevChild?.id ?? child.parentId ?? prevItem, nextChild?.id ?? nextItem)
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Categories</h1>
            {categories && categories.length > 0 &&
                <div className="hidden  mt-1 md:flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ChartBarIcon className="h-5 w-5 mr-1.5 shrink-0"/>
                        Total number of categories: {categories.length}
                    </div>
                </div>
            }
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <Link to={`/admin/category/create`} type={"button"}>Create new</Link>
              <DownloadCsv action={`/admin/category/csv`}/>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {categories && categories.length > 0 && (<ul className="text-gray-600 text-sm font-light">
          <ul className="list-none p-0">
            {rootCategories.map((category, index, array) => {
                const prevRoot = index > 0 ? array[index - 1] : null;
                const nextRoot = index < array.length - 1 ? array[index + 1] : null;
                return renderCategoryTree(category, 0, prevRoot?.id, nextRoot?.id)
              }
            )}
          </ul>
        </ul>)}
      </div>
    </div>
  );
}