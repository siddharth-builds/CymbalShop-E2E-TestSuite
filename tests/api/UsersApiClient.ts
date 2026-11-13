import { APIRequestContext, APIResponse } from '@playwright/test';

declare const process: { env: { REQRES_BASE_URL?: string } };

export class UsersApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl = process.env.REQRES_BASE_URL || 'https://reqres.in') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/api/users`);
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/api/users`, {
      data: { name, job },
    });
  }
}