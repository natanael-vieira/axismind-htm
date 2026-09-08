import { ptBR } from './pt-BR';
import { en } from './en';
import { es } from './es';
import { it } from './it';
import { fr } from './fr';
import { ru } from './ru';
import { de } from './de';
import { zhCN } from './zh-CN';
import { ja } from './ja';
import { ko } from './ko';
import { ar } from './ar';
import { he } from './he';
import { type Locale } from '../types';
import { type Messages } from '../types';

export const messages: Record<Locale, Messages> = {
  'pt-BR': ptBR,
  en,
  es,
  it,
  fr,
  ru,
  de,
  'zh-CN': zhCN,
  ja,
  ko,
  ar,
  he,
};
