import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductsApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl = process.env.BASE_URL || 'http://localhost:8080') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getHomePage(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/`);
  }

  async getProduct(productId: string): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/product/${productId}`);
  }

  async addToCart(productId: string, quantity: number): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/cart`, {
      form: {
        product_id: productId,
        quantity,
      },
    });
  }
}