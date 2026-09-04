import Image from 'next/image';
import { publicPath } from '@/content/site';

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-3" aria-label="axismind">
      <Image
        src={publicPath('/brand/app-icon.png')}
        width={compact ? 34 : 42}
        height={compact ? 34 : 42}
        alt=""
        priority
        className="rounded-full"
      />
      <span className={compact ? 'text-lg' : 'text-xl'}>
        <span className="font-normal">axis</span>
        <span className="font-bold">mind</span>
      </span>
    </span>
  );
}
