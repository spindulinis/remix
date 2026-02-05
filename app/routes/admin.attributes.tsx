import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import Link from "~/Components/Link";
import Delete from "~/Components/Delete";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { AttributeDto } from "~/dtos/attribute.dto";
import { AttributeApi } from "~/models/attribute.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await AttributeApi.getAll(request);
};

export default function AdminAttributes() {
  const attributes = useLoaderData<typeof loader>() as AttributeDto[];

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1
              className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Attributes</h1>
            {attributes && attributes.length > 0 &&
                <div className="hidden  mt-1 md:flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ChartBarIcon className="h-5 w-5 mr-1.5 shrink-0"/>
                        Total number of attributes: {attributes.length}
                    </div>
                </div>
            }
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <Link to={`/admin/attribute/create`} type={"button"}>Create new</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {attributes && attributes.length > 0 && (<ul className="text-gray-600 text-sm font-light">
          <ul className="list-none p-0">
            {attributes.map((attribute) => {
                return (
                  <li key={attribute.id}>
                    <div className="block py-3 px-6 text-left w-full border border-gray-200">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="py-2">{attribute.title}</div>
                        <div className="text-right inline-flex">
                          <Link to={`/admin/attribute/${attribute.id}/edit`} type={"button"}>Edit</Link>
                          <Delete action={`/admin/attribute/${attribute.id}/destroy`}/>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
            )}
          </ul>
        </ul>)}
      </div>
    </div>
  );
}