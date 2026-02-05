import { apiClient } from "~/apiClient";

export class CategoryApi {
  private static readonly BASE_PATH = "/category";

  static async getAll(request: Request) {
    const response = await apiClient.get(this.BASE_PATH, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async get(request: Request, categoryId: string) {
    const response = await apiClient.get(this.BASE_PATH + "/" + categoryId, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async getCsv(request: Request) {
    const response = await apiClient.get(this.BASE_PATH + "/csv", request);

    apiClient.validate(response);

    return await response.text();
  }

  static async update(request: Request, categoryId: string) {
    const data = await this.getData(request);
    const response = await apiClient.put(this.BASE_PATH + "/" + categoryId, data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async create(request: Request) {
    const data = await this.getData(request);
    const response = await apiClient.post(this.BASE_PATH, data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async delete(request: Request, categoryId: string) {
    const response = await apiClient.delete(this.BASE_PATH + '/' + categoryId, request);

    apiClient.validate(response);

    return null;
  }

  static async changeOrder(request: Request, firstCategoryId: string, secondCategoryId: string) {
    const response = await apiClient.patch(this.BASE_PATH + "/" + firstCategoryId + "/change-order/" + secondCategoryId, null, request);

    apiClient.validate(response);

    return null;
  }

  protected static async getData(request: Request) {
    const formData = await request.formData();
    return {
      parentId: formData.get('parentId'),
      title: formData.get('title'),
      order: formData.get('order'),
      description: formData.get('description'),
    }
  }
}