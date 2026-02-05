import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { AttributeApi } from "~/models/attribute.server";

export const action = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  invariant(params.attributeId, "Missing attributeId param");

  await AttributeApi.delete(request, params.attributeId);

  return redirect("/admin/attributes");
};