import { apiClient } from "~/apiClient";

export class AttributeApi {
  private static readonly BASE_PATH = "/attribute";

  static async getAll(request: Request) {
    const response = await apiClient.get(this.BASE_PATH, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async get(request: Request, attributeId: string) {
    const response = await apiClient.get(this.BASE_PATH + "/" + attributeId, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async update(request: Request, attributeId: string) {
    const data = await this.getData(request);
    const response = await apiClient.put(this.BASE_PATH + "/" + attributeId, data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async create(request: Request) {
    const data = await this.getData(request);
    const response = await apiClient.post(this.BASE_PATH + "/", data, request);

    apiClient.validate(response);

    return await response.json();
  }

  static async delete(request: Request, attributeId: string) {
    const response = await apiClient.delete(this.BASE_PATH + "/" + attributeId, request);

    apiClient.validate(response);

    return null;
  }

  protected static async getData(request: Request) {
    const formData = await request.formData();
    return {
      title: formData.get('title')
    }
  }
}