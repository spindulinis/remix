import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { CategoryApi } from "~/models/category.server";

export const action = async ({
                               request,
                               params,
                             }: ActionFunctionArgs) => {
  invariant(params.categoryId, "Missing categoryId param");

  await CategoryApi.delete(request, params.categoryId);

  return redirect("/admin/categories");
};