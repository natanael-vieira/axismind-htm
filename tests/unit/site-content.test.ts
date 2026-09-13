// @vitest-environment node

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { screenshots, site } from '@/content/site';

const require = createRequire(import.meta.url);
const pixGenerator = require('../../scripts/generate-pix-qr.cjs') as {
  buildPixPayload: () => string;
  crc16: (payload: string) => string;
  pixKey: string;
};

describe('conteúdo público crítico', () => {
  it('mantém o mesmo e-mail no contato, na chave Pix e no gerador do QR Code', () => {
    expect(site.privacyEmail).toBe('natnaelsales@gmail.com');
    expect(site.support.pixKey).toBe(site.privacyEmail);
    expect(pixGenerator.pixKey).toBe(site.support.pixKey);
  });

  it('gera um payload Pix com a chave atual e CRC válido', () => {
    const payload = pixGenerator.buildPixPayload();
    const payloadWithoutCrc = payload.slice(0, -4);

    expect(payload).toContain(site.support.pixKey);
    expect(payload.slice(-4)).toBe(pixGenerator.crc16(payloadWithoutCrc));
  });

  it('publica as capturas individuais da jornada atual', () => {
    expect(screenshots).toHaveLength(20);
    for (const screenshot of screenshots) {
      expect(screenshot.src).toMatch(/^\/media\/app-pt-BR\/thais-vieira\/\d{2}-.+\.png$/);
      expect(fs.existsSync(path.join(process.cwd(), 'public', screenshot.src))).toBe(true);
    }
  });
});
