const { test, expect } = require('@playwright/test');


test('Intentar login con credenciales incorrectas', async ({ page }) => {
    // Paso 1: Ingresar un nombre de usuario incorrecto y una contraseña incorrecta
    await page.goto('https://www.facebook.com/');
    await page.fill('input[name="email"]', 'usuario_incorrecto@example.com');
    await page.fill('input[name="pass"]', 'contraseña_incorrecta');
    await page.click('button[name="login"]');
  
    // Paso 2: Verificar que el mensaje de error esté correcto
    const errorMessage = await page.locator('div._9ay7').textContent();
    expect(errorMessage).toContain('The email you entered isn’t connected to an account.');
  
    // Tomar captura de pantalla si es necesario
    await page.screenshot({ path: 'facebook-login-error.png' });
  });
  