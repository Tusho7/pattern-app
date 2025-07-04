export interface Pattern {
  id: string;
  name: string;
  category: string;
  style: React.CSSProperties;
  code: string;
  badge?: string;
  description?: string;
}