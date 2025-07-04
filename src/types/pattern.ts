export interface Pattern {
  id: string;
  name: string;
  category: string;
  style: React.CSSProperties;
  code: string;
  badge?: string;
  description?: string;
}

export interface PatternCardProps {
  pattern: Pattern;
  onPreview: (pattern: Pattern) => void;
  onCopy: (code: string, name: string) => void;
  isCurrentlyPreviewed?: boolean;
}