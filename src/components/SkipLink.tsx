import { Messages } from '@/i18n/types';

export function SkipLink({ messages }: { messages: Messages }) {
  return <a href="#conteudo" className="skip-link">{messages.accessibility.skip}</a>;
}
