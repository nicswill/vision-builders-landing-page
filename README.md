# Vision Builders™ — Landing Page

**Bring a Bro. Build a Legacy.**

A production-ready landing page for the Vision Builders™ mentorship and leadership movement. Built with React, TypeScript, Vite, and Tailwind CSS.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — development server and build tool
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — icons
- **Supabase** — backend / database
- **Formspree** — RSVP and mentor/sponsor form submissions

---

## Getting Started

### 1. Download and open the project

Unzip the downloaded project folder and open it in **VS Code**.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder values with your actual Supabase project URL and anon key (found in your Supabase dashboard under **Settings > API**).

### 4. Start the development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## Project Structure

```
vision-builders-landing/
├── public/               # Static assets (images, logos)
│   ├── Hero.jpeg
│   ├── nav.jpeg
│   ├── footer.jpeg
│   ├── vb_logo_horizontal.png
│   ├── vb_vertical_stack.png
│   ├── vb_only_silouette.png
│   ├── vb_established_2026.png
│   └── *.jpeg            # Section background/content images
├── src/
│   ├── App.tsx           # Main landing page component
│   ├── RSVPModal.tsx     # RSVP / Mentor / Sponsor modal forms
│   ├── supabase.ts       # Supabase client
│   ├── index.css         # Global styles + Tailwind directives
│   └── main.tsx          # React entry point
├── .env                  # Local environment variables (do not commit)
├── .env.example          # Environment variable template
├── index.html            # HTML entry point
├── package.json
├── tailwind.config.js
├── tsconfig.app.json
└── vite.config.ts
```

---

## Deploying to Vercel

### Option A: GitHub + Vercel (recommended)

1. Push the project to a new GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/vision-builders-landing.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon key
5. Click **Deploy**. Vercel auto-detects Vite and sets the build command to `npm run build` with output directory `dist`.

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and set the environment variables when asked.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) API key |

> Note: Variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env`.

---

## Forms

The RSVP, Mentor, and Founding Partner forms submit to [Formspree](https://formspree.io) endpoints configured in `src/RSVPModal.tsx`. To use your own Formspree account, replace the endpoint URLs in the `FORMSPREE` object at the top of that file.

---

## License

© 2026 Vision Builders™. All rights reserved.
