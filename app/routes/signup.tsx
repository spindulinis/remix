import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { sessionStorage } from "~/sessionStorage.service";
import InputLabel from "~/Components/InputLabel";
import Input from "~/Components/Input";
import Button from "~/Components/Button";
import { AuthenticationApi } from "~/models/authentification.server";
import { AuthenticationDto } from "~/dtos/authentication.dto";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const resultData = await AuthenticationApi.signUp(request) as AuthenticationDto;

  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  session.set("authentication", resultData);

  return redirect("/products", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export default function Signup() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <InputLabel htmlFor="firstName">First name</InputLabel>
            <div className="mt-2">
              <Input name="firstName"/>
            </div>
          </div>
          <div>
            <InputLabel htmlFor="lastName">Last name</InputLabel>
            <div className="mt-2">
              <Input name="lastName"/>
            </div>
          </div>
          <div>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <div className="mt-2">
              <Input name="email"/>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="password">Password</InputLabel>
            </div>
            <div className="mt-2">
              <Input type="password" name="password"/>
            </div>
          </div>
          <div className="sm:flex sm:flex-row-reverse">
            <Button>Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}