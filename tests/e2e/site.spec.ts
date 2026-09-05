import { expect, test } from '@playwright/test';

const routes = [
  ['/', 'Um espaço privado para organizar o que você sente'],
  ['/como-usar/', 'Comece com calma e mantenha você no controle.'],
  ['/privacidade/', 'Política de Privacidade'],
  ['/termos/', 'Termos de Uso'],
  ['/apoie/', 'Ajude o axismind a continuar cuidadoso e independente.'],
] as const;

test('todas as rotas públicas carregam seu conteúdo principal', async ({ page }) => {
  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
  }
});

test('a galeria amplia e fecha um mosaico mantendo a navegação por teclado', async ({ page }) => {
  await page.goto('/#telas');
  const trigger = page.getByRole('button', { name: 'Ampliar imagem: Jornada principal' });

  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Jornada principal' })).toBeVisible();
  await page.keyboard.press('Escape');

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('a página de apoio usa e copia somente o e-mail oficial', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/apoie/');

  await expect(page.getByText('natnaelsales@gmail.com', { exact: true })).toHaveCount(3);
  await expect(page.getByAltText('QR Code PIX para a chave natnaelsales@gmail.com')).toBeVisible();

  await page.getByRole('button', { name: 'Copiar chave PIX' }).click();
  await expect(page.getByRole('button', { name: 'Chave PIX copiada' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('natnaelsales@gmail.com');
});
