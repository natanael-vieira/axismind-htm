type LegalArticleProps = {
  children: React.ReactNode;
};

export function LegalArticle({ children }: LegalArticleProps) {
  return <article className="legal-article axis-container">{children}</article>;
}
