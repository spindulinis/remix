import { apiClient } from "~/apiClient";

export class PublicProductApi {
  private static readonly BASE_PATH = "/public-product";

  static async search(params: { limit?: number, offset?: number }) {
    const { limit = 5, offset = 0 } = params;
    const response = await apiClient.get(this.BASE_PATH + "?limit=" + limit + "&offset=" + offset);

    apiClient.validate(response);

    return await response.json();
  }

  static async get(productId: string) {
    const response = await apiClient.get(this.BASE_PATH + "/" + productId);

    apiClient.validate(response);

    return await response.json();
  }
}