import { Link } from 'react-router-dom';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  linked?: boolean;
}

const sizeClass: Record<NonNullable<WordmarkProps['size']>, string> = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  hero: 'text-[clamp(4rem,12vw,11rem)]',
};

export function Wordmark({ size = 'md', linked = true }: WordmarkProps) {
  const content = (
    <span
      className={`font-display tracking-[0.04em] leading-none text-[var(--color-ink)] ${sizeClass[size]}`}
      aria-label="renderdevo"
    >
      RENDERDEVO
    </span>
  );

  if (!linked) return content;
  return (
    <Link to="/" className="inline-block">
      {content}
    </Link>
  );
}
