import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ProductDto } from "~/dtos/product.dto";
import { ProductApi } from "~/models/product.server";

export const loader = async ({
                               request,
                               params,
                             }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing productId param");

  return await ProductApi.get(request, params.productId);
};

export default function AdminProduct() {
  const product = useLoaderData<typeof loader>() as ProductDto;

  return (
    <div>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li>
                <div className="flex items-center">
                  <a href="#" className="mr-2 text-sm font-medium text-gray-900">Products</a>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                       className="h-5 w-4 text-gray-300">
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"/>
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">Basic Tee
                  6-Pack</a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt="Two each of gray, white, and black shirts laying flat."
              className="hidden size-full rounded-lg object-cover lg:block"/>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <img
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                alt="Model wearing plain black basic tee." className="aspect-3/2 w-full rounded-lg object-cover"/>
              <img
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                alt="Model wearing plain gray basic tee." className="aspect-3/2 w-full rounded-lg object-cover"/>
            </div>
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
              alt="Model wearing plain white basic tee."
              className="aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-auto"/>
          </div>

          <div
            className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">$192</p>

              <form className="mt-10">
                <button type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">Add
                  to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
