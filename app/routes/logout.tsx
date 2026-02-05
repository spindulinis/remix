import { sessionStorage } from "~/sessionStorage.service";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({
                               request,

                             }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};

export default function Logout() {
  return useLoaderData<typeof loader>();
} 