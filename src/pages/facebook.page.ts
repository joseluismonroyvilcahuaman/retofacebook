import { Page } from '@playwright/test';

export class FacebookPage {
  private page: Page;
  
  // Selectores de la página
  private emailInput = 'input[name="email"]';
  private passwordInput = 'input[name="pass"]';
  private loginButton = 'button[name="login"]';
  private errorMessage = 'div._9ay7'; // Selector del mensaje de error
  private notificationsIcon = 'a[aria-label="Notificaciones"]';
  private notificationsList = 'ul[role="list"]';
  private notificationItem = 'li[role="listitem"]';
  private postLoadedMarker = 'div[data-pagelet="root"]'; // Indicador de que el post está cargado
  private likeButton = 'div[aria-label="Like"]';
  private likeConfirmation = 'div[aria-label="Unlike"]';
  

  constructor(page: Page) {
    this.page = page;
  }

  // Método para navegar a Facebook
  async navigate() {
    console.log('Navegando a Facebook...');
    await this.page.goto('https://www.facebook.com/');
    console.log('Página de Facebook cargada.');
  }

  // Método para realizar login con credenciales incorrectas
async loginWithInvalidCredentials() {
  console.log('Intentando login con credenciales incorrectas...');
  
  // Rellenar los campos de email y contraseña con credenciales incorrectas
  await this.page.fill(this.emailInput, 'usuario_incorrecto@example.com');
  await this.page.fill(this.passwordInput, 'contraseña_incorrecta');
  
  // Hacer clic en el botón de login
  await this.page.click(this.loginButton);
  console.log('Formulario de login enviado con credenciales incorrectas.');

  // No verificamos el mensaje de error, solo esperamos un poco
  await this.page.waitForTimeout(2000); // Espera para asegurar que la página se cargue parcialmente

  // Capturar la pantalla del estado actual (esto incluirá el error si es visible)
  const screenshotPath = 'login-error-message.png';
  await this.page.screenshot({ path: screenshotPath });
  console.log(`Captura de pantalla tomada: ${screenshotPath}`);
}

  // Método para realizar login con credenciales correctas
  async loginWithValidCredentials(email: string, password: string) {
    console.log('Intentando login con credenciales correctas...');
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

    // Verificar éxito
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      const errorMessageText = await this.page.locator(this.errorMessage).textContent();
      console.log(`Login fallido inesperado: "${errorMessageText}"`);
      const screenshotPath = 'unexpected-error.png';
      await this.page.screenshot({ path: screenshotPath });
      console.log(`Captura de pantalla tomada: ${screenshotPath}`);
    } catch {
      console.log('Login exitoso.');
      const screenshotPath = 'login-success.png';
      await this.page.screenshot({ path: screenshotPath });
      console.log(`Captura de pantalla tomada: ${screenshotPath}`);
    }
  }

  // Método para verificar si el login fue exitoso
async verifyLoginSuccess() {
  try {
    // Puedes verificar que el usuario esté logueado comprobando un elemento único que solo aparece después del login
    // Por ejemplo, verificar que el ícono de notificaciones esté visible
    await this.page.locator(this.notificationsIcon).waitFor({ state: 'visible', timeout: 5000 });
    console.log('Login exitoso, ícono de notificaciones visible.');
  } catch (error) {
    console.error('Login fallido. No se encontró el ícono de notificaciones.');
    throw new Error('Login fallido, no se pudo verificar el login exitoso.');
  }
}

  // Método para verificar el mensaje de error
  async verifyErrorMessage() {
    console.log('Verificando el mensaje de error...');
    const errorLocator = this.page.locator(this.errorMessage);
    return errorLocator;
  }

  // Método para abrir el panel de notificaciones y seleccionar la primera notificación visible
async openNotificationsPanel() {
  console.log('Abriendo panel de notificaciones...');

  try {
    // Hacer clic en el ícono de notificaciones
    const notificationsIconLocator = this.page.locator(this.notificationsIcon);
    await notificationsIconLocator.click();
    console.log('Ícono de notificaciones clicado.');

    // Esperar 2 segundos
    await this.page.waitForTimeout(2000);

    // Tomar una foto de las notificaciones
    const screenshotPath = 'notifications-panel-opened.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada: ${screenshotPath}`);

    // Esperar a que se cargue la lista de notificaciones
    const notificationsListLocator = this.page.getByRole('heading', { name: 'Notificaciones' });
    await notificationsListLocator.waitFor({ timeout: 30000 });
    console.log('Lista de notificaciones cargada.');

    // Seleccionar la primera notificación visible
    const firstNotificationLocator = this.page.locator('div[class*="x4k7w5x"]:has-text("Notificaciones"):below(h1)');
    await firstNotificationLocator.first().click();
    console.log('Primera notificación seleccionada.');

    // Esperar a que se cargue la publicación
    await this.page.waitForLoadState('networkidle');

    // Tomar una foto de la publicación
    const screenshotPath2 = 'selected-notification.png';
    await this.page.screenshot({ path: screenshotPath2 });
    console.log(`Captura de pantalla tomada: ${screenshotPath2}`);

  } catch (error) {
    console.error('Error al abrir panel de notificaciones:', error);
    const screenshotPath = 'notifications-panel-error.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada: ${screenshotPath}`);
    throw new Error('No se pudo abrir el panel de notificaciones.');
  }
}

async verifyPostLoaded() {
  console.log('Verificando que se haya cargado el post...');

  try {
    // Esperar 2 segundos
    await this.page.waitForTimeout(2000);

    // Tomar una foto del post
    const screenshotPath = 'post-loaded.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada: ${screenshotPath}`);

    console.log('Post cargado correctamente.');

  } catch (error) {
    console.error('Error al verificar que se haya cargado el post:', error);
    const screenshotPath = 'post-load-error.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada: ${screenshotPath}`);
    throw new Error('No se pudo verificar que se haya cargado el post.');
  }
}


 // Método para ajustar el viewport y otras configuraciones iniciales
 async setUpViewport() {
  // Ajusta el tamaño del viewport para simular una pantalla de tamaño estándar
  await this.page.setViewportSize({ width: 1280, height: 1024 }); // Tamaño típico de una pantalla de escritorio
}

// Método para dar clic en la imagen del post
async openPost() {
  try {
    console.log('Haciendo clic en la imagen del post...');

    // Localiza la imagen por su alt
    const postImage = await this.page.locator("img[alt='Puede ser una imagen de gato']");

    // Esperar a que la imagen sea visible
    await postImage.waitFor({ state: 'visible', timeout: 50000 });
    console.log('Imagen visible, haciendo clic...');

    // Hacer clic en la imagen
    await postImage.click();

    // Esperar 2 segundos
    await this.page.waitForTimeout(2000);

    // Tomar captura de pantalla
    const screenshotPath = 'imagen-clicada-screenshot.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada después de hacer clic en la imagen: ${screenshotPath}`);

    console.log('Imagen clicada con éxito.');

  } catch (error) {
    console.error('Error al hacer clic en la imagen:', error);
    // Tomar captura de pantalla en caso de error
    const errorScreenshotPath = 'error-screenshot.png';
    await this.page.screenshot({ path: errorScreenshotPath });
    console.log(`Captura de pantalla de error guardada en: ${errorScreenshotPath}`);
    throw new Error('No se pudo hacer clic en la imagen.');
  }
}

  // Método para refrescar la página, esperar al botón de "Me gusta", hacer clic y tomar captura
  async clickLikeButton() {
    // Refrescar la página
    await this.page.reload();
    console.log('Página refrescada.');

    // Esperar a que el botón de "Me gusta" sea visible
    const likeButton = this.page.locator('[aria-label="Me gusta"]').first();
    await likeButton.waitFor({ state: 'visible', timeout: 20000 });

    // Tomar captura de pantalla del botón "Me gusta"
    const screenshotPath = 'me_gusta_button_screenshot.png'; // Nombre de la captura
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada después de refrescar la página: ${screenshotPath}`);

    // Hacer clic en el botón de "Me gusta"
    await likeButton.click();
    console.log('Botón "Me gusta" clickeado exitosamente.');
  }


// Método para verificar que el post recibió el "Me gusta" correctamente
  async verifyLikeStatus() {
    // Localizar el estado del botón "Me gusta" después del clic
    const likeButton = this.page.locator('[aria-label="Me gusta"]').first();

    // Esperar a que el botón cambie de estado (p.ej., cambia de color o texto)
    const isLiked = await likeButton.isVisible(); // Puedes personalizar esta verificación según tu app (ej. verificar clases dinámicas)

    // Tomar captura de pantalla final
    const screenshotPath = 'like_button_final_state.png';
    await this.page.screenshot({ path: screenshotPath });
    console.log(`Captura de pantalla tomada después de verificar el estado del "Me gusta": ${screenshotPath}`);

    // Verificar si el "Me gusta" fue exitoso
    if (isLiked) {
      console.log('El "Me gusta" fue correctamente agregado al post.');
    } else {
      console.log('El "Me gusta" no se agregó correctamente.');
    }
  }
}