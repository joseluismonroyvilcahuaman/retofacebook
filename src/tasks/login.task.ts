import { Page } from '@playwright/test';
import { EnterCredentials } from '../interactions/enter.credentials';

export class Login {
  static async withCredentials(page: Page, email: string, password: string) {
    // Las interacciones que componen esta tarea
    await EnterCredentials(email, password, page);
    // Puedes agregar más pasos aquí si es necesario
  }
}
