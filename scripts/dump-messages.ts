
import { messages } from '../src/i18n/messages';

Object.entries(messages).forEach(([locale, content]) => {
  console.log(`--- ${locale} ---`);
  console.log(JSON.stringify(content, null, 2));
});
