import { LegalArticle } from '@/components/LegalArticle';
import { PageIntro } from '@/components/PageIntro';
import { site } from '@/content/site';

export const metadata = { title: 'Termos de Uso' };

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow={`Versão ${site.legalVersion}`} title="Termos de Uso">
        <p>Ao usar o axismind, você confirma que compreendeu a natureza pessoal e local da ferramenta e seus limites.</p>
      </PageIntro>
      <LegalArticle>
        <section><h2>1. Fornecedor</h2><p>O axismind é disponibilizado por <strong>{site.controller}</strong>, pessoa física, {site.controllerLocation}. Contato: <a className="font-bold underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.</p></section>
        <section><h2>2. Elegibilidade</h2><p>O produto é destinado exclusivamente a pessoas com {site.minimumAge} anos ou mais. Não existe fluxo de consentimento parental nesta versão.</p></section>
        <section><h2>3. Natureza e limites</h2><p>O app auxilia a registrar e organizar experiências pessoais. Não realiza diagnóstico, prescrição, tratamento, monitoramento clínico ou acionamento automático de emergência.</p></section>
        <section><h2>4. Responsabilidades da pessoa usuária</h2><ul><li>Manter a senha e o aparelho protegidos.</li><li>Revisar transcrições e relatórios antes de guardar ou compartilhar.</li><li>Evitar dados sensíveis de terceiros sem autorização.</li><li>Fazer backup antes de excluir o cofre ou trocar de aparelho.</li></ul></section>
        <section><h2>5. Recursos opcionais</h2><p>Voz, lembretes, contato de confiança, login social, PDF e backup dependem de escolha e permissões do sistema. Fabricantes e sistemas podem limitar alarmes, notificações e execução em segundo plano.</p></section>
        <section><h2>6. Exportações e perda de acesso</h2><p>Arquivos exportados ficam sob responsabilidade da pessoa. O controlador não recebe uma cópia do cofre e não consegue recuperar a senha local perdida. A exclusão do cofre é irreversível sem backup válido.</p></section>
        <section><h2>7. Propriedade e uso adequado</h2><p>A marca, interface e conteúdo autoral são protegidos. É proibido usar o produto para violar direitos, tentar acessar dados de terceiros ou contornar controles de segurança.</p></section>
        <section><h2>8. Mudanças</h2><p>Alterações relevantes nos Termos serão identificadas por nova versão e novo aceite no aplicativo. Este texto é um rascunho técnico sujeito a validação jurídica antes da publicação comercial.</p></section>
      </LegalArticle>
    </>
  );
}
