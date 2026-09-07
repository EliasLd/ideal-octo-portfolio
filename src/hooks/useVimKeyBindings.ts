import { useEffect } from 'react';

export function useVimBindings() {
  useEffect(() => {
    let lastKey = '';
    let lastTime = 0;

    const handleVimScroll = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const currentTime = new Date().getTime();
      const key = e.key;

      if (key === 'G') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
      }

      if (key === 'g') {
        if (lastKey === 'g' && currentTime - lastTime < 500) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          lastKey = '';
          return;
        }
      }

      if (key.toLowerCase() === 'j') {
        window.scrollBy({ top: 80, behavior: 'smooth' });
      } else if (key.toLowerCase() === 'k') {
        window.scrollBy({ top: -80, behavior: 'smooth' });
      }

      lastKey = key;
      lastTime = currentTime;
    };

    window.addEventListener('keydown', handleVimScroll);
    return () => window.removeEventListener('keydown', handleVimScroll);
  }, []);
}
