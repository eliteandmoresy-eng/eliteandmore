export default function ButterflyIcon({ size = 28, color = '#D4AF37' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 8 C10 2, 2 4, 3 12 C3 18, 9 18, 16 16 C23 18, 29 18, 29 12 C30 4, 22 2, 16 8 Z" fill={color} fillOpacity="0.9" />
      <path d="M16 16 L16 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 26 L18 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="13" r="1.2" fill={color} />
    </svg>
  );
}
