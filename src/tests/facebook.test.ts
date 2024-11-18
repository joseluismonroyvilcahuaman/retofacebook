import { test, expect } from '@playwright/test';
import { FacebookPage } from '../pages/facebook.page';

test('Flujo completo de login y notificaciones en Facebook', async ({ page }) => {
  const facebookPage = new FacebookPage(page);

  // 1. Navegar a la página de Facebook
  await facebookPage.navigate();

  // 2. Hacer login con credenciales inválidas
  await facebookPage.loginWithInvalidCredentials();

  // Ajusta el tamaño del viewport
  await facebookPage.setUpViewport();

  // 3. Hacer login con credenciales válidas
  await facebookPage.loginWithValidCredentials('cuentabotcamelot2@gmail.com', '@123456789');

  // 4. Navegar a la sección de notificaciones
  await facebookPage.openNotificationsPanel();

  // 5. Verificar que se ha cargado el post de la notificación seleccionada
  await facebookPage.verifyPostLoaded();

  // 6. Dar "Me gusta" al post que se cargó
  await facebookPage.openPost();

  // 7. Dar "Me gusta" al post que se cargó
   await facebookPage.clickLikeButton();

  // 8. Verificar que el post haya recibido el "Me gusta" correctamente
   await facebookPage.verifyLikeStatus();
});
