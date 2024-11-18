import { Page } from '@playwright/test';
import { Login } from '../tasks/login.task';

export class User {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Tareas que el actor puede realizar
  async loginWithCredentials(email: string, password: string) {
    await Login.withCredentials(this.page, email, password);
  }
}
