import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  showTilde?: boolean;
}

export function SectionWrapper({ id, children, showTilde = true }: SectionWrapperProps) {
  return (
    <section id={id} style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
      {showTilde && <span className="vim-tilde">~</span>}
      {children}
    </section>
  );
}
