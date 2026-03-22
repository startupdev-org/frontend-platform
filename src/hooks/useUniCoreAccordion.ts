import { useEffect, useRef } from 'react';

const FAQ_READY_ATTR = 'data-marketing-faq-ready';

export type UniCoreApi = {
  accordion?: (el: Element) => void;
  Accordion?: (el: Element) => void;
  getComponents?: (el: Element) => Record<string, { $destroy?: () => void } | undefined>;
};

export function useUniCoreAccordion() {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 120;

    const markReady = () => {
      if (!cancelled && el.isConnected) {
        el.setAttribute(FAQ_READY_ATTR, '');
      }
    };

    const tick = () => {
      if (cancelled || !el.isConnected) return;
      if (attempts++ > maxAttempts) {
        markReady();
        return;
      }
      const UC = (window as Window & { UniCore?: UniCoreApi }).UniCore;
      const boot = UC && (UC.accordion ?? UC.Accordion);
      if (UC && typeof boot === 'function') {
        try {
          const existing = UC.getComponents?.(el)?.accordion;
          if (!existing) {
            boot(el);
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(markReady);
          });
        } catch {
          markReady();
        }
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelled = true;
      el.removeAttribute(FAQ_READY_ATTR);
      const UC = (window as Window & { UniCore?: UniCoreApi }).UniCore;
      try {
        UC?.getComponents?.(el)?.accordion?.$destroy?.();
      } catch {
        void 0;
      }
    };
  }, []);

  return { ref };
}
