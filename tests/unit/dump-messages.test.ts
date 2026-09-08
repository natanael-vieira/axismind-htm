
import { test } from 'vitest';
import { messages } from '../../src/i18n/messages';

test('dump messages', () => {
  Object.entries(messages).forEach(([locale, content]) => {
    console.log(`--- START ${locale} ---`);
    console.log(JSON.stringify(content, null, 2));
    console.log(`--- END ${locale} ---`);
  });
});
