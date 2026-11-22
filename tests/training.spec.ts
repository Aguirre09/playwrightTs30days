import {test,expect} from '@playwright/test'

// Agrupación principal de pruebas para una funcionalidad o página
test.describe('Módulo de Autenticación SAUCE DEMO', () => {

  // Hook: Se ejecuta antes de cada test dentro de este bloque describe
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Caso de prueba 1
  test('debe iniciar sesión con credenciales válidas', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
        await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
         await page.getByRole('button', { name: 'Login' }).click();


  // Validamos redirección real al catálogo y visibilidad del título
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  // Caso de prueba 2
test('Debe mostrar error con contraseña incorrecta', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('clave_incorrecta');
    await page.getByRole('button', { name: 'Login' }).click();

    // SauceDemo expone el atributo data-test="error" para su banner de error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  // Hook opcional: Limpieza después de cada prueba
  test.afterEach(async ({ page }) => {
    // Lógica de cierre o limpieza si es necesaria
  });
});