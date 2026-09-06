import type { ReactNode } from 'react';
import { SectionWrapper } from './SectionWrapper';

interface DynamicSectionProps<T> {
  id: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  showTilde?: boolean;
  containerStyle?: React.CSSProperties;
}

export function DynamicSection<T>({
  id,
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
      <div style={containerStyle}>
        {items.map(renderItem)}
      </div>
    </SectionWrapper>
  );
}
