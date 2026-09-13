# Jornada visual — Thais Vieira

Capturas do APK Android release, em português do Brasil, produzidas em um AVD descartável. O perfil, a senha e as escolhas usadas no roteiro são dados sintéticos de QA.

## Sequência

1. `00-launcher-nome-sem-aspas.png` — nome `axismind` no launcher.
2. `01-onboarding-introducao.png` — introdução e natureza de diário pessoal.
3. `02-onboarding-privacidade.png` — consentimento para processamento local.
4. `03-onboarding-limites.png` — idade, responsabilidade e limites.
5. `04-boas-vindas-diario.png` — diário local.
6. `05-boas-vindas-recursos.png` — organização em linguagem simples.
7. `06-boas-vindas-controle.png` — controle sobre qualquer saída de dados.
8. `07-entrada-local.png` — criação do perfil local.
9. `08-perfil-vazio.png` — formulário inicial.
10. `09-recorte-foto.png` — recorte oferecido pelo seletor do sistema.
11. `10-perfil-preenchido-sem-foto.png` — dados sintéticos preenchidos.
12. `11-cadastro-restaurado-apos-reinicio.png` — nomes restaurados após recriação do processo; senha não restaurada.
13. `12-perfil-com-foto.png` — perfil pronto para concluir.
14. `13-home-thais-vieira.png` — Home com foto e nome.
15. `14-perfil-aberto-pela-foto.png` — Perfil aberto ao tocar a foto da Home.
16. `15-checkin-humor-preselecionado.png` — humor escolhido na Home já selecionado no check-in.
17. `16-novo-relato-escala-1-a-5.png` — relato com uma única escala de humor de cinco opções.
18. `17-minhas-preferencias-sem-seletor-de-escala.png` — preferências sem escala duplicada.
19. `18-corpo-intensidade-qualitativa.png` — intensidade corporal em Leve, Moderada e Forte.
20. `19-opcoes-de-conversa-cvv.png` — pessoa de confiança e CVV como escolhas manuais.
21. `20-confirmacao-manual-cvv.png` — confirmação antes de abrir o discador; nenhuma ligação foi realizada.

## Observação de QA

O primeiro AVD havia iniciado com apenas 2 GB efetivos e o Android encerrou o build de desenvolvimento por `LOW_MEMORY` ao abrir a galeria. O fluxo agora restaura o cadastro não sensível após recriação do processo, nunca persiste a senha e foi revalidado no APK release com 6 GB efetivos.
