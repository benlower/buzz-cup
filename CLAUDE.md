# BuzzCup

## What This Is

The marketing/event site for BuzzCup, an annual golf tournament among a group of friends. Built with Astro, deployed at https://buzzcup.golf.

The site shows the schedule, rules, player roster, photo galleries from past years, and (during the live event) a `/messages` feed.

## Tech Stack

- **Framework:** Astro 4
- **Styling:** Tailwind CSS
- **Content:** Astro content collections (Markdown/MDX) for players and messages
- **Images:** Sharp via Astro's image service
- **Package manager:** pnpm (pinned to v9)
- **Node:** see `.nvmrc` / `package.json` engines

## Project Structure

```
src/
  pages/             # Routes — index, schedule, rules, messages, privacy, terms, 2023/2024/2025 recaps, 404
  layouts/           # Layout.astro (main), MdLayout.astro (markdown pages)
  components/        # Astro components (hero, players, faq, gallery, footer, etc.)
  content/
    config.ts        # Content collection schemas (players, messages, 2024players, 2025players)
    players/         # Current-year player profiles (.md)
    2024players/     # Historical rosters
    2025players/
    messages/        # Event-time message feed (.md)
  data/
    event-config.ts  # Event dates + messagesVisible flag
    champions.ts
    schedule-2026.ts
    gallery-*.ts     # Photo gallery data per year
  assets/            # Images processed by Astro
  utils/
public/              # Static assets (favicon, videos)
scripts/
  generate-pro-headshots.mjs   # Headshot generation helper
```

## Content Collections

Defined in `src/content/config.ts`:

- **players / 2024players / 2025players** — player profiles with avatar, optional pro-style avatar, IR flag, etc. Player markdown files live in `src/content/<year>players/`.
- **messages** — short posts shown on `/messages` during the live event. Each has a person, publishDate, and optional image.

## Event Config

`src/data/event-config.ts` controls the live-event window:

- `eventStart` / `eventEnd` — when the tournament runs
- `messagesVisible` — force the `/messages` page and nav link visible outside the event window (handy for testing)

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` — `astro check && astro build`
- `pnpm preview` — preview the production build
- `pnpm generate-headshots` — run `scripts/generate-pro-headshots.mjs` (uses Gemini per `README.md`)

## Conventions

- Add a new player by creating a markdown file in `src/content/players/` matching the schema in `src/content/config.ts`.
- Historical rosters are frozen in `src/content/2024players/` and `src/content/2025players/`.
- Page-level routes live directly under `src/pages/`; year recaps are `2023.astro`, `2024.astro`, `2025.astro`.
- The `/messages` page is gated by the event window in `event-config.ts` unless `messagesVisible` is true.
