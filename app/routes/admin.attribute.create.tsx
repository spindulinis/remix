import { ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { AttributeApi } from "~/models/attribute.server";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  await AttributeApi.create(request);
  return null;
};

export default function AdminAttributeCreate() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <div className="mt-2.5">
                <Input name="title"/>
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
