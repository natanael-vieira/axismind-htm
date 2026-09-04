import { LegalArticle } from '@/components/LegalArticle';
import { PageIntro } from '@/components/PageIntro';
import { site } from '@/content/site';

export const metadata = { title: 'Política de Privacidade' };

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow={`Versão ${site.legalVersion}`} title="Política de Privacidade">
        <p>Esta página explica, em linguagem direta, como o aplicativo e este site tratam informações. A versão deverá passar por revisão jurídica antes da publicação comercial.</p>
      </PageIntro>
      <LegalArticle>
        <section><h2>1. Controlador e contato</h2><p>Controlador: <strong>{site.controller}</strong>, pessoa física, {site.controllerLocation}. Canal para privacidade e direitos: <a className="font-bold underline" href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.</p></section>
        <section><h2>2. O que é o axismind</h2><p>É um diário pessoal de bem-estar emocional local-first. Permite registrar texto, voz transcrita, check-ins, sensações corporais, medicação informada e preparação para consultas. Não diagnostica, prescreve ou trata condições de saúde e não substitui profissionais nem serviços de emergência.</p></section>
        <section><h2>3. Dados e finalidades</h2><ul><li>Relatos, check-ins, reflexões, corpo e medicação informada: diário, autorreflexão e lembretes opcionais.</li><li>Áudio: transcrição e revisão local, com armazenamento privado temporário.</li><li>Nome, foto e e-mail: identidade opcional do perfil.</li><li>Contato de confiança: acesso rápido manual, nunca acionado automaticamente.</li><li>Recibo legal: registro local da versão aceita.</li><li>PDF e backup: portabilidade escolhida pela pessoa.</li></ul></section>
        <section><h2>4. Onde ficam os dados</h2><p>O conteúdo do diário fica no cofre criptografado do aparelho. Não há sincronização automática, publicidade, venda de dados ou treinamento de IA externa com relatos. Arquivos exportados passam a ficar sob controle da pessoa e do destino escolhido.</p></section>
        <section><h2>5. Conexões externas</h2><p>Conexões externas só ocorrem após ação explícita: Google ou Apple para identidade básica, servidor de distribuição para obter o modelo de transcrição, loja para avaliação e compartilhador do sistema para PDF ou backup. Este site estático não possui formulário, analytics próprio ou cookies de publicidade; a hospedagem pode manter registros técnicos conforme os termos do provedor.</p></section>
        <section><h2>6. Direitos e exclusão</h2><p>A pessoa pode acessar e corrigir registros no app, exportar uma cópia e excluir integralmente o cofre local. Solicitações adicionais podem ser encaminhadas ao canal informado acima. Depois de tentar exercer o direito junto ao controlador, também é possível peticionar perante a ANPD.</p></section>
        <section><h2>7. Segurança e limites</h2><p>O banco local usa SQLCipher; senha e backup utilizam derivação de chave e criptografia autenticada. O PDF não possui senha nesta versão. Nenhum controle elimina todos os riscos, especialmente em aparelhos comprometidos ou quando um arquivo é exportado.</p></section>
        <section><h2>8. Idade e mudanças</h2><p>O aplicativo é destinado a maiores de {site.minimumAge} anos. Mudanças relevantes incrementam a versão do documento e exigem novo aceite dentro do app.</p></section>
      </LegalArticle>
    </>
  );
}
