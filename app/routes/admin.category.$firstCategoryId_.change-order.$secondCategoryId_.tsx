import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { CategoryApi } from "~/models/category.server";

export const action = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  invariant(params.firstCategoryId, "Missing firstCategoryId param");
  invariant(params.secondCategoryId, "Missing secondCategoryId param");

  await CategoryApi.changeOrder(request, params.firstCategoryId, params.secondCategoryId);

  return redirect("/admin/categories");
};