export const groupBy = <T, K extends PropertyKey>(array: T[], accessor: (item: T) => K) => {
  const grouped = new Map<K, T[]>();

  array.forEach((item) => {
    const key = accessor(item);

    if (grouped.has(key)) {
      grouped.get(key)!.push(item);

      return;
    }

    grouped.set(key, [item]);
  });

  return Object.fromEntries(grouped) as Record<K, T[]>;
};
