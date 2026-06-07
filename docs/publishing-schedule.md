# Scheduled publishing

This project supports scheduled publishing for posts in `src/content/posts/`.

The public site shows a post only when both conditions are true:

- `draft` is not `true`
- `pubDatetime` is less than or equal to the current build/deploy time

This means you can commit articles ahead of time. They will appear only after a new build runs at or after their scheduled `pubDatetime`.

## Daily publishing slots

The standard schedule is:

- `09:00` - first article
- `14:00` - second article
- `19:00` - third article

Use the site timezone in the timestamp. The project is configured for `Europe/Kyiv`, so scheduled Ukrainian publication times should usually use `+03:00` during summer time or the correct local offset for the date.

## Frontmatter example

```yaml
---
title: "Назва майбутньої статті"
description: "Короткий SEO-опис майбутньої статті."
pubDatetime: 2026-06-10T09:00:00.000+03:00
category: leadership
topics:
  - psychology-of-power
  - social-systems
tags:
  - лідерство
  - влада
series: psychology-of-power
collection: executive-psychology
contentType: pillar_article
featured: true
draft: false
ogImage: /covers/example-cover.svg
heroImage: /covers/example-cover.svg
---
```

## Creating three scheduled posts for one day

Create three Markdown files in `src/content/posts/` and set their timestamps:

```yaml
pubDatetime: 2026-06-10T09:00:00.000+03:00
```

```yaml
pubDatetime: 2026-06-10T14:00:00.000+03:00
```

```yaml
pubDatetime: 2026-06-10T19:00:00.000+03:00
```

Set `draft: false` only when the article is ready to publish. Keep `draft: true` for unfinished material.

## How to verify scheduling

Before the scheduled time, run a production build and check that the future post is absent from:

- homepage
- `/posts`
- categories
- topics
- series
- collections
- related and recommended reading blocks
- RSS feed
- sitemap

After the scheduled time, run a new build/deploy. The post should then appear automatically.

Important: static sites publish at build time. If no build runs after the scheduled time, the generated site will not change until the next deploy.
