"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FacebookPage {
    constructor(page) {
        // Selectores de la página de login
        this.emailInput = 'input[name="email"]';
        this.passwordInput = 'input[name="pass"]';
        this.loginButton = 'button[name="login"]';
        this.errorMessage = 'div._9ay7';
        this.page = page;
    }
    // Método para navegar a la página de inicio de sesión
    async navigate() {
        await this.page.goto('https://www.facebook.com/');
    }
    // Método para realizar login con credenciales incorrectas
    async loginWithInvalidCredentials() {
        await this.page.fill(this.emailInput, 'incorrect_user@example.com');
        await this.page.fill(this.passwordInput, 'incorrect_password');
        await this.page.click(this.loginButton);
    }
    // Método para verificar el error de autenticación
    async verifyErrorMessage() {
        const errorMessage = this.page.locator(this.errorMessage);
        await errorMessage.waitFor({ state: 'visible' });
        return errorMessage;
    }
}
exports.FacebookPage = FacebookPage;
