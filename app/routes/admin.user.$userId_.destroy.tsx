import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { UserApi } from "~/models/user.server";

export const action = async ({
                               request,
                               params,
                             }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");

  await UserApi.delete(request, params.userId);

  return redirect("/admin/users");
};