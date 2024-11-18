import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';


Given('que el usuario está en la página de login', async function () {
    await this.page.goto('https://www.facebook.com/');
});

When('ingresa un correo y una contraseña válidos', async function () {
    await this.page.fill('#email', 'tu_correo@example.com');
    await this.page.fill('#pass', 'tu_contraseña');
    await this.page.click('[data-testid="royal_login_button"]');
});

Then('debería iniciar sesión exitosamente', async function () {
    const isLoggedIn = await this.page.isVisible('#perfil_o_algo_que_indique_login');
    expect(isLoggedIn).to.be.true;
});
