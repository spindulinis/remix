import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ProductApi } from "~/models/product.server";

export const action = async ({
                               request,
                               params,
                             }: ActionFunctionArgs) => {
  invariant(params.productId, "Missing productId param");

  await ProductApi.delete(request, params.productId);

  return redirect("/admin/products");
};