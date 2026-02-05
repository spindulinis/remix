import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, useNavigate } from "@remix-run/react";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { AttributeApi } from "~/models/attribute.server";
import { AttributeDto } from "~/dtos/attribute.dto";

export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  invariant(params.attributeId, "Missing attributeId param");

  return AttributeApi.get(request, params.attributeId);
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.attributeId, "Missing attributeId param");
  await AttributeApi.update(request, params.attributeId);
  return null;
};

export default function AdminAttributeEdit() {
  const attribute = useLoaderData<typeof loader>() as AttributeDto;
  const navigate = useNavigate();

  return (
    <div>
      <div className="isolate bg-white px-6 py-12">
        <form action="#" method="POST" className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
            <div>
              <InputLabel htmlFor="title">Title</InputLabel>
              <div className="mt-2.5">
                <Input name="title" defaultValue={attribute.title}/>
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
