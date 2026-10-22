# Ayushman Sethy — Nuxt Markdown Portfolio

A responsive, static-generation-ready portfolio built with Nuxt 4, Vue 3, and Markdown content files.

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
The generated static website is in `.output/public`. Deploy the contents of that directory to a static host such as GitHub Pages, Cloudflare Pages, or Netlify.

## Update your content
Edit the Markdown files in `data/`:
- `profile.md` — headline, bio, contact links
- `skills.md` — skill groups
- `experience.md` — role details and achievements
- `projects.md` — project descriptions, impact, and technology stacks

Each Markdown file stores structured data in YAML frontmatter between `---` markers. This is a common Markdown convention; the files are `.md` and the site loads the frontmatter from those Markdown files.

## Before publishing
1. Replace `Add employment dates` in `data/experience.md` with your actual dates.
2. Check every metric and achievement against your final resume.
3. Add your GitHub URL if you want it displayed.
4. Put your PDF resume at `public/resume.pdf` or change `resumePath` in `data/profile.md` and add a resume-download link to the page.
5. Confirm that the phone number and email should be public before deploying.
