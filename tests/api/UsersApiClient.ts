// api/UsersApiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;
  readonly token: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    // Simplify environment variable access with clean fallbacks
    this.baseUrl = process.env.REQRES_BASE_URL || 'https://reqres.in';
    this.token = process.env.API_TOKEN || '';
  }

  async getUsers(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/api/users`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    });
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/api/users`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: { name, job }
    });
  }
}