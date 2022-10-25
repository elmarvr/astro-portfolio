export function querySelector<T extends Element>(selector: string, root = document as Document | Element): T {
  const el = root.querySelector<T>(selector);

  if (!el) {
    throw new Error(`Element not found: ${selector}`);
  }

  return el;
}
