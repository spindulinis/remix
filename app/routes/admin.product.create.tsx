import { ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { ProductApi } from "~/models/product.server";

export const action = async ({
                               request,
                             }: ActionFunctionArgs) => {
  await ProductApi.create(request);
  return null;
};

export default function AdminProductCreate() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <div className="mt-2.5">
                <Input name="title"/>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="number">Number</InputLabel>
              <div className="mt-2.5">
                <Input name="number"/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <InputLabel htmlFor="description">Description</InputLabel>
              <div className="mt-2.5">
                <Input name="description"/>
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
