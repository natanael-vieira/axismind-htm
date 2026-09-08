import { type Locale } from './config';
import { messages } from './messages';

export function getMessages(locale: Locale) {
  return messages[locale];
}
