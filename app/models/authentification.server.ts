import { apiClient } from "~/apiClient";

export class AuthenticationApi {
  private static readonly BASE_PATH = "/authentication";

  static async signIn(request: Request) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await apiClient.post(this.BASE_PATH + "/sign-in", {
      email,
      password,
    });

    apiClient.validate(response);

    return await response.json();
  }

  static async signUp(request: Request) {
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await apiClient.post(this.BASE_PATH + "/sign-up", {
      firstName,
      lastName,
      email,
      password,
    });

    apiClient.validate(response);

    return await response.json();
  }
}