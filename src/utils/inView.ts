export interface InViewOptions {
  root?: Element | Document;
  margin?: string;
  amount?: "any" | "all" | number;
}

const thresholds = {
  any: 0,
  all: 1,
};

export function inView(
  targets: string,
  cb: (entry: IntersectionObserverEntry) => void,
  { root, margin: rootMargin, amount = "any" }: InViewOptions = {}
): VoidFunction {
  const elements = document.querySelectorAll(targets);

  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cb(entry);

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount],
  });

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
