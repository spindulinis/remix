import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, useNavigate } from "@remix-run/react";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { CategoryApi } from "~/models/category.server";
import { CategoryDto } from "~/dtos/category.dto";
import Select from "~/Components/Select";

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  invariant(params.categoryId, "Missing categoryId param");

  return Promise.all([CategoryApi.getAll(request), CategoryApi.get(request, params.categoryId)]);
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.categoryId, "Missing categoryId param");
  await CategoryApi.update(request, params.categoryId);
  return null;
};

export default function AdminCategoryEdit() {
  const [categories, category] = useLoaderData<typeof loader>() as [
    categories: CategoryDto[],
    category: CategoryDto
  ];
  const navigate = useNavigate();

  const rootCategories = categories
    .filter(category => category.parentId === null)
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <div className="mt-2.5">
                <Input name="title" defaultValue={category.title}/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="order">Order</InputLabel>
              <div className="mt-2.5">
                <Input name="order" defaultValue={category.order}/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <InputLabel htmlFor="parentId">Parent</InputLabel>
              <div className="mt-2.5">
                <Select name="parentId">
                  <option value="">Root category</option>
                  {rootCategories.map(rootCategory => (
                    <option key={rootCategory.id} value={rootCategory.id}
                            selected={category.parentId === rootCategory.id}>{rootCategory.title}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <InputLabel htmlFor="description">Description</InputLabel>
              <div className="mt-2.5">
                <Input name="description" defaultValue={category.description}/>
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
