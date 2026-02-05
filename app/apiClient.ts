import process from "node:process";
import { sessionStorage } from "~/sessionStorage.service";
import { AuthenticationDto } from "~/dtos/authentication.dto";

export class ApiClient {
  get(urlEnd: string, request?: Request) {
    return this.fetch("GET", urlEnd, null, request);
  }

  put(urlEnd: string, body: unknown, request?: Request) {
    return this.fetch("PUT", urlEnd, body, request);
  }

  post(urlEnd: string, body: unknown, request?: Request) {
    return this.fetch("POST", urlEnd, body, request);
  }

  patch(urlEnd: string, body: unknown, request?: Request) {
    return this.fetch("PATCH", urlEnd, body, request);
  }

  delete(urlEnd: string, request?: Request) {
    return this.fetch("DELETE", urlEnd, null, request)
  }

  validate(response: Response) {
    if (!response.ok) {
      throw new Response(null, {
        status: response.status,
        statusText: response.statusText,
      });
    }
  }

  private async fetch(method: string, urlEnd: string, body: unknown, request?: Request) {
    return await fetch(this.url(urlEnd), {
      method,
      headers: await this.headers(request),
      body: body ? JSON.stringify(body) : null,
    });
  }

  private async headers(request?: Request): Promise<HeadersInit> {
    if (!request) {
      return {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
    }

    const cookie = request.headers.get("cookie");
    const session = await sessionStorage.getSession(cookie);
    const authentication = session.get("authentication") as AuthenticationDto;

    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authentication.accessToken,
    }
  }

  private url(urlEnd: string) {
    return process.env.API_URL + urlEnd;
  }
}

export const apiClient = new ApiClient();