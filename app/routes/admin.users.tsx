import { useLoaderData } from "@remix-run/react";
import { PageDto } from "~/dtos/page.dto";
import { LoaderFunctionArgs } from "@remix-run/node";
import Pagination, { offset } from "~/Components/Pagination";
import Link from "~/Components/Link";
import { UserApi } from "~/models/user.server";
import Delete from "~/Components/Delete";
import { UserDto } from "~/dtos/user.dto";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const params = {
    limit: 5,
    offset: offset(page)
  };

  return await UserApi.search(request, params);
};

export default function AdminUsers() {
  const { items: users, total, limit, offset } = useLoaderData<typeof loader>() as PageDto<UserDto>;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Users</h1>
            {users && users.length > 0 &&
                <div className="hidden  mt-1 md:flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <ChartBarIcon className="h-5 w-5 mr-1.5 shrink-0"/>
                        Total number of users: {total}
                    </div>
                </div>
            }
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3"></span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {users && users.length && <table className="w-full bg-white border border-gray-200">
            <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="w-14 py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">First name</th>
                <th className="py-3 px-6 text-left">Last name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="w-48 py-3 px-6 text-left"></th>
            </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {users.map(user => {
              return (
                <tr key={user.id} className="border border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.firstName}</td>
                  <td className="py-3 px-6 text-left">{user.lastName}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={`/admin/user/${user.id}/edit`} type={"button"}>Edit</Link>
                    <Delete action={`/admin/user/${user.id}/destroy`}/>
                  </td>
                </tr>
              );
            })}
            </tbody>
        </table>
        }
      </div>
      <Pagination total={total} limit={limit} offset={offset}/>
    </div>
  );
}