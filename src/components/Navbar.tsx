import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Sections', href: '#sections' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'My works', href: '#projects' },
  { name: 'Tech I like', href: '#tech' },
  { name: 'Media', href: '#media' },
  { name: 'Links', href: '#links' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          background: 'transparent',
          border: 'none',
          color: 'var(--text-color)',
          cursor: 'pointer',
          padding: '0.5rem',
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--bg-color)',
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              style={{
                fontSize: '1.5rem',
                borderBottom: 'none',
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
