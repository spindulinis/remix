import { useLoaderData } from "@remix-run/react";
import { ProductDto } from "~/dtos/product.dto";
import { PageDto } from "~/dtos/page.dto";
import { LoaderFunctionArgs } from "@remix-run/node";
import Pagination, { offset } from "~/Components/Pagination";
import { ProductApi } from "~/models/product.server";
import Link from "~/Components/Link";
import Delete from "~/Components/Delete";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const params = {
    limit: 5,
    offset: offset(page)
  };

  return await ProductApi.search(request, params);
};

export default function AdminProducts() {
  const { items: products, total, limit, offset } = useLoaderData<typeof loader>() as PageDto<ProductDto>;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Products</h1>
            {products && products.length > 0 &&
                <div className="hidden  mt-1 md:flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ChartBarIcon className="h-5 w-5 mr-1.5 shrink-0"/>
                        Total number of products: {total}
                    </div>
                </div>
            }
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <Link to={`/admin/product/create`} type={"button"}>Create new</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {products && products.length > 0 && <table className="w-full bg-white border border-gray-200">
            <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="w-14 py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Number</th>
                <th className="py-3 px-6 text-left hidden md:block">Description</th>
                <th className="w-60 py-3 px-6 text-left"></th>
            </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {products.map(product => {
              return (
                <tr key={product.id} className="border border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{product.id}</td>
                  <td className="py-3 px-6 text-left">{product.title}</td>
                  <td className="py-3 px-6 text-left">{product.number}</td>
                  <td className="py-3 px-6 text-left hidden md:block">{product.description}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={`/admin/product/${product.id}/edit`} type={"button"}>Edit</Link>
                    <Delete action={`/admin/product/${product.id}/destroy`}/>
                  </td>
                </tr>
              );
            })}
            </tbody>
        </table>
        }
      </div>
      <Pagination total={total} limit={limit} offset={offset}/>
    </div>
  );
}