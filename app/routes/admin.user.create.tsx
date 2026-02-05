import { ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { UserRole } from "~/dtos/user.dto";
import { UserApi } from "~/models/user.server";
import Select from "~/Components/Select";

export const action = async ({
                               request,
                             }: ActionFunctionArgs) => {
  await UserApi.create(request);
  return null;
};

export default function AdminUserCreate() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <div className="mt-2.5">
                <Input name="firstName"/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <div className="mt-2.5">
                <Input name="lastName"/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="email">Email</InputLabel>
              <div className="mt-2.5">
                <Input name="email"/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="role">Role</InputLabel>
              <div className="mt-2.5">
                <Select name="role">
                  {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:flex sm:flex-row-reverse">
            <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
