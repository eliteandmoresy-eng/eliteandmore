import Link from 'next/link';
import Image from 'next/image';

const sizes = {
  sm: 48,   // admin sidebar
  md: 58,   // header — fits h-[72px] with comfortable padding
  lg: 88,   // hero / standalone
};

export default function Logo({
  size = 'md',
  href = '/',
}: {
  size?: 'sm' | 'md' | 'lg';
  href?: string | null;
  dark?: boolean;
}) {
  const px = sizes[size];

  const content = (
    <Image
      src="/images/logo.jpg"
      alt="Elite and More"
      width={px}
      height={px}
      className="rounded-xl object-cover"
      priority
    />
  );

  if (!href) {
    return <div className="flex-shrink-0 block">{content}</div>;
  }

  return (
    <Link href={href} className="flex-shrink-0 block" aria-label="Elite and More — الرئيسية">
      {content}
    </Link>
  );
}
