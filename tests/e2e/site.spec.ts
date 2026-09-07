import { expect, test } from '@playwright/test';

const routes = [
  ['/', 'Um espaço privado para organizar o que você sente', 'Início'],
  ['/como-usar/', 'Comece com calma e mantenha você no controle.', 'Como usar'],
  ['/seguranca/', 'Segurança local, explicada com transparência.', 'Segurança'],
  ['/privacidade/', 'Política de Privacidade', 'Privacidade'],
  ['/termos/', 'Termos de Uso', 'Termos'],
  ['/apoie/', 'Ajude o axismind a continuar cuidadoso e independente.', 'Apoie o projeto'],
] as const;

test('todas as rotas públicas carregam seu conteúdo principal', async ({ page }) => {
  for (const [route, heading, activeLabel] of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('a[aria-current="page"]:visible', { hasText: activeLabel })).toBeVisible();
  }
});

test('a versão final não exibe avisos de rascunho jurídico', async ({ page }) => {
  await page.goto('/privacidade/');
  await expect(page.getByText('A versão deverá passar por revisão jurídica antes da publicação comercial.')).toHaveCount(0);
  await expect(page.getByText(/Esta política descreve como o aplicativo e este site tratam informações/)).toBeVisible();

  await page.goto('/termos/');
  await expect(page.getByText('Este texto é um rascunho técnico sujeito a validação jurídica antes da publicação comercial.')).toHaveCount(0);
});

test('os botões principais da tela inicial ficam empilhados no celular', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'regra específica da viewport móvel');
  await page.goto('/');

  const primary = page.getByRole('link', { name: /Entenda como funciona/ });
  const secondary = page.getByRole('link', { name: 'Como protegemos seus dados' });
  const primaryBox = await primary.boundingBox();
  const secondaryBox = await secondary.boundingBox();

  expect(primaryBox).not.toBeNull();
  expect(secondaryBox).not.toBeNull();
  expect((secondaryBox?.y ?? 0)).toBeGreaterThanOrEqual((primaryBox?.y ?? 0) + (primaryBox?.height ?? 0));
  expect(Math.abs((primaryBox?.width ?? 0) - (secondaryBox?.width ?? 0))).toBeLessThanOrEqual(2);

  await page.goto('/apoie/');
  const activeSupport = page.locator('a[aria-current="page"]:visible', { hasText: 'Apoie o projeto' });
  await activeSupport.scrollIntoViewIfNeeded();
  const supportBox = await activeSupport.boundingBox();
  const viewport = page.viewportSize();
  expect(supportBox).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect((supportBox?.x ?? 0) + (supportBox?.width ?? 0)).toBeLessThanOrEqual(viewport?.width ?? 0);
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
