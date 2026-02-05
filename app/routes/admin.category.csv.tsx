import type { ActionFunctionArgs } from "@remix-run/node";
import { CategoryApi } from "~/models/category.server";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await CategoryApi.getCsv(request);

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="category.csv"`,
    },
  });
};