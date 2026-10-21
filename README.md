# Ayushman Sethy — Nuxt YAML Portfolio

A responsive, static-generation-ready portfolio built with Nuxt 4, Vue 3, and YAML content files.

## Requirements
- Node.js 20+ (use a current LTS release)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown by Nuxt (normally http://localhost:3000).

## Generate static files
```bash
npm run generate
```
The generated static website is in `.output/public`. Deploy the contents of that directory to a static host such as Cloudflare Pages, Netlify, or another static file host.

## Update your content
Edit the YAML files in `data/`:
- `profile.yaml` — headline, bio, contact links
- `skills.yaml` — skill groups
- `experience.yaml` — role details and achievements
- `projects.yaml` — project descriptions, impact, and technology stacks

The site imports these YAML files directly using `@rollup/plugin-yaml`; you don't need to edit Vue components to update the content.

## Before publishing
1. Replace `Add employment dates` in `data/experience.yaml` with your actual dates.
2. Check every metric and achievement against your final resume.
3. Add your GitHub URL if you want it displayed.
4. Put your PDF resume at `public/resume.pdf` or change `resumePath` in `data/profile.yaml` and add a resume-download link to the page.
5. Confirm that the phone number and email should be public before deploying.

## Notes
- This project uses a Vite YAML plugin, configured in `nuxt.config.ts`.
- `npm run generate` performs Nuxt static generation. If you add more routes, make sure they are discoverable or explicitly configured for prerendering.
