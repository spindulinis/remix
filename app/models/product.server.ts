import { apiClient } from "~/apiClient";

export class ProductApi {
  private static readonly BASE_PATH = "/product";

  static async search(request: Request, params: { limit?: number, offset?: number }) {
    const { limit = 5, offset = 0 } = params;
    const response = await apiClient.get(this.BASE_PATH + "?limit=" + limit + "&offset=" + offset, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async get(request: Request, productId: string) {
    const response = await apiClient.get(this.BASE_PATH + "/" + productId, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async update(request: Request, productId: string) {
    const data = await this.getData(request);
    const response = await apiClient.put(this.BASE_PATH + "/" + productId, data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async create(request: Request) {
    const data = await this.getData(request);
    const response = await apiClient.post(this.BASE_PATH + "/", data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async delete(request: Request, productId: string) {
    const response = await apiClient.delete(this.BASE_PATH + "/" + productId, request);

    apiClient.validate(response);

    return null;
  }

  protected static async getData(request: Request) {
    const formData = await request.formData();
    return {
      title: formData.get('title'),
      number: formData.get('number'),
      description: formData.get('description'),
      categoryIds: formData.getAll('categoryIds'),
      attributeIds: formData.getAll('attributeIds'),
    }
  }
}