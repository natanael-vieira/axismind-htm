type PageIntroProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className="axis-container pb-10 pt-16 sm:pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-balance text-4xl font-normal leading-tight tracking-tight sm:text-6xl">{title}</h1>
      <div className="mt-6 max-w-3xl text-lg leading-8 text-axis-body">{children}</div>
    </section>
  );
}
