import { NavLink, useLoaderData } from "@remix-run/react";
import { PageDto } from "~/dtos/page.dto";
import { PublicProductApi } from "~/models/publicProduct.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import Pagination, { offset } from "~/Components/Pagination";
import { ProductListItemDto } from "~/dtos/product-list-item.dto";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const params = {
    limit: 8,
    offset: offset(page, 8),
  };

  return await PublicProductApi.search(params);
};

export default function Products() {
  const { items: products, total, limit, offset } = useLoaderData<typeof loader>() as PageDto<ProductListItemDto>;
  return products && products.length && (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => {
            return (
              <NavLink key={product.id} to={`/product/${product.id}`} className="group">
                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg"
                     alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                     className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"/>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-700">{product.description}</p>
              </NavLink>
            );
          })}
        </div>
      </div>
      <Pagination total={total} limit={limit} offset={offset}/>
    </div>
  );
}