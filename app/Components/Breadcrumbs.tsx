import { NavLink } from "@remix-run/react";
import { ProductListItemDto } from "~/dtos/product-list-item.dto";

export interface BreadcrumbsProps {
  product: ProductListItemDto;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { product } = props;
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <NavLink className="mr-2 text-sm font-medium text-gray-900" to={'/products'}>Products</NavLink>
            /
          </div>
        </li>
        <li className="text-sm">
          <span className="font-medium text-gray-500 hover:text-gray-600">{product.title}</span>
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumbs;