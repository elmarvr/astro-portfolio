import { groupBy } from "@/utils/groupBy";
import type { MarkdownInstance } from "astro";
import { atom } from "nanostores";
import locales from "./locales.json";

export type Language = keyof typeof locales;

export const languageStore = atom<Language>("en");

export function initI18n(language: Language) {
  languageStore.set(language);
}

export function t(path: string) {
  const locale = locales[languageStore.get()];

  return path.split(".").reduce((acc, part) => acc?.[part], locale as any) as string | undefined;
}

export function getLanguageFromFilePath(path: string) {
  const match = /^.+\/[^\/][\w,\s-]+\.([a-z]{2})\.md$/.exec(path);

  if (!match) {
    throw new Error(`Wrong file path format: ${path}`);
  }

  return match[1];
}

export function getPageContent<Frontmatter extends Record<string, any>>(instances: MarkdownInstance<Frontmatter>[]) {
  const getNameFromFilePath = (path: string) => /^.+\/([^\/][\w,\s-]+)(?:\.[a-z]+)?\.md$/.exec(path)?.[1];

  const names = [...new Set(instances.map(({ file }) => getNameFromFilePath(file)))];

  return names
    .map((name) => {
      return (
        instances.find(({ file }) => file.endsWith(`${name}.${languageStore.get()}.md`)) ??
        instances.find(({ file }) => file.endsWith(`${name}.md`))
      );
    })
    .filter(Boolean) as MarkdownInstance<Frontmatter>[];
}
