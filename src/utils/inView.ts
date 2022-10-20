export type ElementOrSelector = Element | Element[] | NodeListOf<Element> | string;

export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;

export interface InViewOptions {
  root?: Element | Document;
  margin?: string;
  amount?: "any" | "all" | number;
}

const thresholds = {
  any: 0,
  all: 1,
};

export function resolveElements(elements: ElementOrSelector): Element[] {
  if (typeof elements === "string") {
    return [...document.querySelectorAll(elements)];
  }

  if (elements instanceof Element) {
    elements = [elements];
  }

  return [...elements];
}

export function isFunction<T extends (...args: any[]) => any>(value: unknown): value is Exclude<T, void> {
  return typeof value === "function";
}

export function inView(
  elementOrSelector: ElementOrSelector,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount = "any" }: InViewOptions = {}
): VoidFunction {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = new WeakMap<Element, ViewChangeHandler>();

  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);

      if (entry.isIntersecting === Boolean(onEnd)) return;

      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);

        if (isFunction(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);

          return;
        }

        observer.unobserve(entry.target);
      }

      if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
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
