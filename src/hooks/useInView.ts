import { useRef, useState } from "react";
import { RefObject, useEffect } from "react";

export const useInView = <T extends HTMLElement>(options?: { amount?: number }) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const once = useRef(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (once.current) return;

      if (entry.isIntersecting) {
        setInView(entry.isIntersecting);
        once.current = true;
      }
    },
    {
      threshold: options?.amount,
    }
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, inView] as const;
};
