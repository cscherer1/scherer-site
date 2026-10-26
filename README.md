# scherer-site

Frontend for [christianscherer.dev](https://christianscherer.dev) — a performance-conscious React single-page application with a hidden, fully functional admin panel.

**Stack:** React 19 · TypeScript 5.8 · Vite 7 · React Router 7 · CSS Modules · Vercel

---

## Why this project exists

The site is the public face of a portfolio that includes API design, systems architecture, and production deployment. It deliberately pairs this SPA with a real backend ([scherer-api](https://github.com/cscherer1/scherer-api)) to show the full stack working together: the site renders projects served over an authenticated REST API, and a hidden admin panel lets the owner manage that catalog without touching code or a database console.

## Highlights

- **True production deployment** — live at christianscherer.dev on Vercel, wired to a production API on Render/Neon, with custom domain, HTTPS, and SPA rewrites.
- **Hidden admin panel** at `/admin` — login, then create/edit/delete projects through the API with inline field validation errors.
- **Token security done right** — the JWT is held **in memory only**, never localStorage, so it's wiped on refresh and can't be exfiltrated from the browser.
- **Deliberately small** — React 19, React Router, Vite. No UI framework, no CSS framework: plain CSS Modules with a dark theme driven by CSS variables. The entire dependency footprint stays auditable and fast.
- **SEO & analytics built in** — Open Graph, Twitter cards, canonical tags, `robots.txt` (disallowing `/admin`), `sitemap.xml`, Vercel Analytics + Speed Insights.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.8 (strict mode) |
| Build | Vite 7 |
| Routing | React Router 7 |
| Styling | CSS Modules + CSS custom properties |
| Lint/format | ESLint 9 + Prettier |
| Backend | scherer-api (ASP.NET Core 9) |
| Hosting | Vercel (SPA rewrites to `/index.html`) |

## Project structure

```
src/
  main.tsx          # bootstrap + router
  pages/            # Landing, Projects, About, Contact, Admin, NotFound
  components/       # shared UI (Header, Footer, ProjectCard)
  lib/              # api.ts, auth.ts, types.ts
public/
  index.html        # meta + OG + favicon + canonical
  robots.txt        # /admin disallowed
  sitemap.xml
```

## Development

**Requires:** Node 20+ and pnpm.

```bash
pnpm install
echo VITE_API_URL=https://localhost:7210 > .env
pnpm dev --host     # http://localhost:5173
```

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Production configuration

- `VITE_API_URL` must point at the production API base URL
- Vercel: build `pnpm build`, output `dist`, and enable **SPA rewrites** (or a `vercel.json` rewriting all paths to `/index.html`) so deep links don't 404
- CORS on the API must include the site origin

## License

Private portfolio project. © Christian Scherer.
