type PlaceholderProps = {
  label: string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Placeholder({ label, radius = 12, className, style }: PlaceholderProps) {
  return (
    <div
      className={`hb-placeholder ${className ?? ""}`}
      style={{ borderRadius: radius, ...style }}
      role="img"
      aria-label={label}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
