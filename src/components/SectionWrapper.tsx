import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  showTilde?: boolean;
}

export function SectionWrapper({ id, children, showTilde = true }: SectionWrapperProps) {
  return (
    <section id={id} style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
      {showTilde && <span className="vim-tilde">~</span>}
      {children}
    </section>
  );
}
