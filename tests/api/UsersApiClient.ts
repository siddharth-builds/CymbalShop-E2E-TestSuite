// api/UsersApiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.REQRES_BASE_URL || 'https://reqres.in';
  }

  async getUsers(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/api/users`);
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/api/users`, {
      data: { name, job }
    });
  }
}