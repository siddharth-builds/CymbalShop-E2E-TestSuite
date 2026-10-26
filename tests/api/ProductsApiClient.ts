// api/ProductsApiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductsApiClient {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getHomePage(): Promise<APIResponse> {
    return await this.request.get('/');
  }

  async getProduct(productId: string): Promise<APIResponse> {
    return await this.request.get(`/product/${productId}`);
  }

  async addToCart(productId: string, quantity: number): Promise<APIResponse> {
    return await this.request.post('/cart', {
      form: {
        product_id: productId,
        quantity: quantity
      }
    });
  }
}