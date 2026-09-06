import type { ReactNode } from 'react';
import { SectionWrapper } from './SectionWrapper';

interface DynamicSectionProps<T> {
  id: string;
  title?: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  showTilde?: boolean;
  containerStyle?: React.CSSProperties;
}

export function DynamicSection<T>({
  id,
  title,
  items,
  renderItem,
  showTilde = true,
  containerStyle
}: DynamicSectionProps<T>) {
  // If there is no data, we don't render the section at all
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id={id} showTilde={showTilde}>
      {title && <h2 style={{ marginBottom: '2rem' }}>{title}</h2>}
      <div style={containerStyle}>
        {items.map(renderItem)}
      </div>
    </SectionWrapper>
  );
}
