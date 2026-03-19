import { useLayoutEffect, useRef } from 'react';

interface PagePreloaderProps {
  active: boolean;
}
export default function PagePreloader({ active }: PagePreloaderProps) {
  const startedAtRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const PRELOADER_ID = 'uc-page-preloader-react';

    const getOrCreatePreloader = () => {
      const existing = document.getElementById(PRELOADER_ID);
      if (existing) {
        const el = existing as HTMLDivElement;
        el.style.transition = '';
        el.style.opacity = '1';
        return el;
      }

      const preloader = document.createElement('div');
      preloader.id = PRELOADER_ID;
      preloader.className = 'uc-pageloader';
      preloader.innerHTML = '<div class="loading"><div></div><div></div><div></div><div></div></div>';
      html.append(preloader);
      return preloader;
    };

    if (active) {
      startedAtRef.current = Date.now();
      html.classList.add('show-preloader');
      const preloader = getOrCreatePreloader();
      return () => {
        html.classList.remove('show-preloader');
        preloader.remove();
      };
    }

    const preloader = document.getElementById(PRELOADER_ID) as HTMLDivElement | null;
    if (!preloader) return;

    const minDisplay = 400;
    const startedAt = startedAtRef.current ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, minDisplay - elapsed);

    const timeout = window.setTimeout(() => {
      html.classList.remove('show-preloader');
      requestAnimationFrame(() => {
        preloader.style.transition = 'opacity 1.1s cubic-bezier(0.8, 0, 0.2, 1)';
        preloader.style.opacity = '0';
        window.setTimeout(() => preloader.remove(), 1100);
      });
    }, remaining);

    return () => window.clearTimeout(timeout);
  }, [active]);

  return null;
}

