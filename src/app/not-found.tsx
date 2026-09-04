import Link from 'next/link';

export default function NotFound() {
  return <section className="axis-container py-32 text-center"><p className="eyebrow">Erro 404</p><h1 className="mt-4 text-5xl">Página não encontrada</h1><p className="mt-5 text-axis-body">O endereço pode ter mudado.</p><Link href="/" className="button-primary mt-8">Voltar ao início</Link></section>;
}
