import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ProductDto } from "~/dtos/product.dto";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { ProductApi } from "~/models/product.server";
import AssignCategories from "~/Components/AssignCategories";
import { CategoryApi } from "~/models/category.server";
import { CategoryDto } from "~/dtos/category.dto";
import { AttributeApi } from "~/models/attribute.server";
import AssignAttributes from "~/Components/AssignAttributes";
import { AttributeDto } from "~/dtos/attribute.dto";

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing productId param");

  return await Promise.all([ProductApi.get(request, params.productId), CategoryApi.getAll(request), AttributeApi.getAll(request)])
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.productId, "Missing productId param");
  await ProductApi.update(request, params.productId);
  return null;
};

export default function AdminProductEdit() {
  const [product, categories, attributes] = useLoaderData<typeof loader>() as [product: ProductDto, categories: CategoryDto[], attributes: AttributeDto[]];
  const navigate = useNavigate();

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <div className="mt-2.5">
                <Input name="title" defaultValue={product.title}/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="number">Number</InputLabel>
              <div className="mt-2.5">
                <Input name="number" defaultValue={product.number}/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <InputLabel htmlFor="description">Description</InputLabel>
              <div className="mt-2.5">
                <Input name="description" defaultValue={product.description}/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="categories">Categories</InputLabel>
              <div className="mt-2.5">
                <AssignCategories allCategories={categories}
                                  initialAssignedIds={product.categories ? product.categories.map(category => category.id) : []}/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="attributes">Attributes</InputLabel>
              <div className="mt-2.5">
                <AssignAttributes allAttributes={attributes}
                                  initialAssignedIds={product.attributes ? product.attributes.map(attribute => attribute.id) : []}/>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:flex sm:flex-row-reverse">
            <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
