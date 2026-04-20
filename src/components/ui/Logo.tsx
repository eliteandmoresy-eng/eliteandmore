import Link from 'next/link';
import Image from 'next/image';

const sizes = {
  sm: 48,   // admin sidebar
  md: 58,   // header — fits h-[72px] with comfortable padding
  lg: 88,   // hero / standalone
};

export default function Logo({
  size = 'md',
}: {
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean; // kept for API compatibility, unused since image handles it
}) {
  const px = sizes[size];

  return (
    <Link href="/" className="flex-shrink-0 block" aria-label="Elite and More — الرئيسية">
      <Image
        src="/images/logo.jpg"
        alt="Elite and More"
        width={px}
        height={px}
        className="rounded-xl object-cover"
        priority
      />
    </Link>
  );
}
