type MarkProps = { size?: number; stroke?: string; drop?: string; weight?: number; title?: string };

/** The Midad mark: an eight-point star (two squares at 45°) holding an ink drop. */
export function LogoMark({ size = 44, stroke = "#13283A", drop = "#1F6F6B", weight = 7, title }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect x="25" y="25" width="70" height="70" rx="6" fill="none" stroke={stroke} strokeWidth={weight} />
      <rect x="25" y="25" width="70" height="70" rx="6" fill="none" stroke={stroke} strokeWidth={weight} transform="rotate(45 60 60)" />
      <path d="M60 36 C60 36 47 53 47 63 A13 13 0 0 0 73 63 C73 53 60 36 60 36 Z" fill={drop} />
    </svg>
  );
}
