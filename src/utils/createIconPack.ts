export function createIconPack(url: string) {
  const baseUrl = new URL(url);
  const fetchCache = new Map();

  return async (name: string) => {
    const url = new URL(name + ".svg", baseUrl).toString();

    if (fetchCache.has(url)) {
      return fetchCache.get(url);
    }

    const res = await fetch(url);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Failed to fetch "${url}"!\n${body}`);
    }

    const svg = await res.text();

    fetchCache.set(url, svg);

    return svg;
  };
}
