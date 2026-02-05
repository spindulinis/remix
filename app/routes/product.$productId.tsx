import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import Button from "~/Components/Button";
import { PublicProductApi } from "~/models/publicProduct.server";
import Breadcrumbs from "~/Components/Breadcrumbs";
import { ProductListItemDto } from "~/dtos/product-list-item.dto";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing productId param");
  return await PublicProductApi.get(params.productId);
};

export default function Product() {
  const product = useLoaderData<typeof loader>() as ProductListItemDto;

  return (
    <div>
      <div className="bg-white">
        <div className="pt-6">
          <Breadcrumbs product={product}/>
          <div className="pb-10 mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt="Two each of gray, white, and black shirts laying flat."
              className="px-6 lg:px-0 size-full rounded-lg object-cover lg:block"/>
            <div className="col-span-2">
              <div
                className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                </div>

                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">$192</p>

                  <form className="mt-10">
                    <Button>Add to bag</Button>
                  </form>
                </div>

                <div
                  className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
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
      </div>
    </div>
  );
}
