export const CATEGORIES = [
  {
    slug: "leadership",
    title: "Лідерство",
    description:
      "Рішення, відповідальність, влада і поведінка лідера під тиском.",
  },
  {
    slug: "psychology",
    title: "Психологія",
    description:
      "Мислення, емоційна регуляція, мотивація та когнітивні упередження.",
  },
  {
    slug: "negotiations",
    title: "Переговори",
    description:
      "Стратегії впливу, позиційні конфлікти, рамки домовленостей і межі.",
  },
  {
    slug: "manipulation",
    title: "Маніпуляції",
    description:
      "Розбір прихованого тиску, пропаганди, газлайтингу та захисту автономії.",
  },
  {
    slug: "legal-psychology",
    title: "Правова психологія",
    description:
      "Поведінка людей у правових конфліктах, доказах, свідченнях і відповідальності.",
  },
  {
    slug: "social-systems",
    title: "Соціальні системи",
    description:
      "Інституції, групова динаміка, ієрархії, норми та суспільна довіра.",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS = CATEGORIES.map(category => category.slug) as [
  CategorySlug,
  ...CategorySlug[],
];
