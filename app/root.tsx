import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { sessionStorage } from "~/sessionStorage.service";
import { AuthenticationDto } from "~/dtos/authentication.dto";
import PageHeader from "~/Components/PageHeader/PageHeader";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const cookie = request.headers.get("cookie");
  const session = await sessionStorage.getSession(cookie);
  const authentication = session.get("authentication") as AuthenticationDto;

  return { authentication };
};

export default function App() {
  const { authentication } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full bg-gray-100">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body className="h-full">
    <div className="min-h-full">
      <PageHeader authentication={authentication}/>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-md">
            <div>
              <Outlet/>
            </div>
          </div>
        </div>
      </main>
    </div>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}
