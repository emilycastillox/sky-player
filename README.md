# Sky Player

A productivity timer that looks and feels like a handcrafted early-2000s media player — think Windows Media Player or Winamp, with glass panels, chrome buttons, and an equalizer that bounces to your session.

**[→ Live app: sky-player.vercel.app](https://sky-player.vercel.app)**

---

## What it does

- **Focus & break sessions** — Toggle between focus and break modes; classic Pomodoro-style flow.
- **Timer** — Big LCD-style readout (Orbitron), progress arc, and status (idle / running / paused / complete).
- **Equalizer visualizer** — 24 bars that animate when the timer is running (teal for focus, purple for break) and breathe gently when idle.
- **Session log** — Playlist-style history of past sessions with duration and completion status.
- **Transport bar** — Chrome-style Play/Pause, Skip, and a scrubber for time remaining.
- **Media panel** — Paste Spotify or YouTube links to embed playlists/tracks alongside your timer.
- **Stats page** — Weekly focus chart, session history, streak, and summary stats.
- **Settings** — Focus/break durations, long-break frequency, auto-start and chime toggles, media links, and **player skins** (Frutiger Aero, Y2K Gloss, Windows Classic, Retro Winamp).

All data is stored in the browser (localStorage). No backend, no auth — just open and use.

---

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Vercel** (hosting + analytics)

---

## Run locally

```bash
git clone <your-repo-url>
cd sky-player
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy

```bash
npm run build
vercel deploy
```

Or connect the repo to Vercel for automatic deploys on push.

---

## Project structure

| Path | Purpose |
|------|--------|
| `app/page.tsx` | Main player (shell, timer, panels, transport, media) |
| `app/stats/page.tsx` | Stats page (weekly chart, session history, streak) |
| `app/settings/page.tsx` | Settings (timer, media links, theme skins) |
| `components/` | EqualizerVisualizer, TimerDisplay, ModeSelector, SessionLogPanel, TransportBar, MediaPanel, TitleBar, theme/skin UI |
| `hooks/use-timer.ts` | Timer state machine (idle → running → paused → complete) |
| `lib/` | Utils, storage (if used) |

---

## Design

The app uses a **Frutiger Aero**–style scene: sky, light, and atmosphere.

- **Background:** A full-page sky gradient (royal blue to soft blue and white), with a **sun** and lens-flare streaks, a subtle **rainbow** arc, and **fluffy clouds** drifting across the top. The lower third suggests water: **wave bands** with a light shimmer, an **underwater** zone with **caustic** ripples, **glossy bubbles** rising, and **clownfish** and **dolphins** swimming by. Hot-air balloons float in the sky.
- **UI on top:** Frosted **glass panels** (backdrop blur, soft white borders, subtle blue shadow). **Chrome-style** buttons with gradient, inner highlight, and depressed state on click.
- **Fonts:** Share Tech Mono for labels and readouts; skin-dependent display styling.
- **Themes:** Four player skins in Settings — Frutiger Aero (blue), Y2K Gloss (pink), Windows Classic (steel blue), Aqua (green) — that change accents and glow while keeping the same sky-and-water backdrop.

It’s built to feel like a vintage media player skin sitting in a bright, bubbly sky-and-ocean scene.

---

## License

MIT.
