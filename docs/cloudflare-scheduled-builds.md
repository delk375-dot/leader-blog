# Cloudflare scheduled rebuilds

The site supports scheduled publishing through `pubDatetime`: a post is public only when `draft !== true` and `pubDatetime` is less than or equal to the build time.

Because this is a static Astro site, future posts do not appear automatically at the exact minute in the already-built HTML. A new Cloudflare Pages build must run after the scheduled `pubDatetime`. The scheduled build regenerates homepage, `/posts`, categories, topics, series, collections, RSS, related blocks, and sitemap with the posts that are now eligible to publish.

## Recommended schedule

Use four rebuilds per day in the `Europe/Kyiv` timezone:

- `09:05` - after the morning publishing slot
- `14:05` - after the afternoon publishing slot
- `19:05` - after the evening publishing slot
- `23:55` - final daily rebuild for late edits or delayed posts

The five-minute delay gives Cloudflare a small buffer after the intended publication time, for example a post scheduled at `09:00` is picked up by the `09:05` rebuild.

## Create a Cloudflare Pages deploy hook

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Open the Pages project for `Тіньова карта`.
4. Go to `Settings`.
5. Open `Builds & deployments`.
6. Find `Deploy hooks`.
7. Create a new deploy hook, for example `scheduled-publishing`.
8. Select the production branch, usually `main`.
9. Copy the generated deploy hook URL.

The deploy hook URL is sensitive. Treat it like a token because anyone with the URL can trigger a rebuild.

## Store the deploy hook URL in GitHub

Add the URL as a repository secret:

1. Open the GitHub repository.
2. Go to `Settings`.
3. Open `Secrets and variables`.
4. Open `Actions`.
5. Choose `New repository secret`.
6. Name it exactly:

```text
CLOUDFLARE_DEPLOY_HOOK_URL
```

7. Paste the Cloudflare deploy hook URL as the value.
8. Save the secret.

## GitHub Actions cron trigger

The workflow lives in:

```text
.github/workflows/scheduled-deploy.yml
```

It runs on a cron schedule and can also be started manually through `workflow_dispatch`.

The workflow does not modify content, does not commit files, and does not deploy by itself. It only sends a `POST` request to the Cloudflare Pages deploy hook. Cloudflare then starts a normal production rebuild from the configured branch.

## Timezone note

GitHub Actions cron uses UTC. The workflow uses UTC equivalents for Kyiv standard time (`UTC+02:00`):

- `09:05 Europe/Kyiv` -> `07:05 UTC`
- `14:05 Europe/Kyiv` -> `12:05 UTC`
- `19:05 Europe/Kyiv` -> `17:05 UTC`
- `23:55 Europe/Kyiv` -> `21:55 UTC`

During Ukrainian summer time (`UTC+03:00`), these jobs will run one hour later by local clock unless the cron values are adjusted seasonally:

- `09:05 Europe/Kyiv` -> `06:05 UTC`
- `14:05 Europe/Kyiv` -> `11:05 UTC`
- `19:05 Europe/Kyiv` -> `16:05 UTC`
- `23:55 Europe/Kyiv` -> `20:55 UTC`

If exact local-time publishing is critical year-round, update the cron schedule when Kyiv switches between winter and summer time, or replace GitHub Actions cron with an external scheduler that supports the `Europe/Kyiv` timezone directly.

## Verification

After adding the secret and enabling the workflow:

1. Open `Actions` in GitHub.
2. Select `Scheduled Cloudflare Pages rebuild`.
3. Run it manually with `Run workflow`.
4. Confirm the workflow succeeds.
5. Open Cloudflare Pages deployments and confirm a new production build was triggered.

For scheduled posts, create posts with future `pubDatetime` values and `draft: false`. They should remain hidden until a scheduled rebuild runs after their publication time.
