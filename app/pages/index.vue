<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app'
import { load as parseYaml } from 'js-yaml'

// Markdown files use YAML frontmatter for structured portfolio data.
const markdownFiles = import.meta.glob('../../data/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
function readMarkdownData<T>(fileName: string): T {
  const entry = Object.entries(markdownFiles).find(([path]) => path.endsWith(`/${fileName}.md`))
  if (!entry) throw new Error(`Missing portfolio content: ${fileName}.md`)
  const match = entry[1].match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) throw new Error(`Missing YAML frontmatter in ${fileName}.md`)
  return parseYaml(match[1]) as T
}

interface Profile { name: string; role: string; location: string; headline: string; summary: string; email: string; phone: string; linkedin: string; github: string; resumePath: string; availability: string }
interface SkillData { groups: Array<{ title: string; items: string[] }> }
interface ExperienceData { roles: Array<{ company: string; title: string; client: string; period: string; location: string; summary: string; highlights: string[] }> }
interface ProjectData { projects: Array<{ name: string; category: string; description: string; impact: string; stack: string[]; details: string[] }> }

const profile = readMarkdownData<Profile>('profile')
const skillData = readMarkdownData<SkillData>('skills')
const experienceData = readMarkdownData<ExperienceData>('experience')
const projectData = readMarkdownData<ProjectData>('projects')

useSeoMeta({
  title: `${profile.name} | ${profile.role}`,
  description: profile.summary,
  ogTitle: `${profile.name} | Software Engineer`,
  ogDescription: profile.headline,
  twitterCard: 'summary'
})

const skills = skillData.groups
const roles = experienceData.roles
const projects = projectData.projects
const emailHref = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry')}`
</script>

<template>
  <div class="site-shell">
    <header class="topbar">
      <a class="wordmark" href="#home" aria-label="Go to home">AS<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
      </nav>
      <a class="nav-contact" :href="emailHref">Let's talk <span>↗</span></a>
    </header>

    <main>
      <section id="home" class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="status-dot"></span>{{ profile.availability }}</div>
          <p class="kicker">{{ profile.role }} <span>·</span> {{ profile.location }}</p>
          <h1>{{ profile.headline.split(' at scale.')[0] }}<em> at scale.</em></h1>
          <p class="hero-description">{{ profile.summary }}</p>
          <div class="hero-actions">
            <a class="button button-dark" href="#projects">Explore my work <span>↘</span></a>
            <a class="button button-light" :href="emailHref">Contact me <span>↗</span></a>
          </div>
          <div class="quick-stats" aria-label="Career highlights">
            <div><strong>3.5+</strong><span>Years experience</span></div>
            <div><strong>1,500+</strong><span>APIs developed / documented</span></div>
            <div><strong>20M+</strong><span>Records processed daily</span></div>
          </div>
        </div>
        <aside class="hero-card" aria-label="Backend engineering focus">
          <div class="card-top"><span>ENGINEERING / 001</span><span class="pulse">●</span></div>
          <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
          <div class="core-icon">{ }</div>
          <div class="floating-tag tag-java">Java <b>✓</b></div>
          <div class="floating-tag tag-cloud">Cloud-native <b>↗</b></div>
          <div class="floating-tag tag-data">Data pipelines <b>↗</b></div>
          <div class="card-bottom"><span>DESIGN · BUILD · INTEGRATE</span><span>IND / BLR</span></div>
        </aside>
      </section>

      <section id="about" class="about-band">
        <div class="section-wrap about-grid">
          <p class="section-label">01 / ABOUT</p>
          <div>
            <h2>Making complex systems<br /><em>work together.</em></h2>
            <p class="about-text">I work on backend services and enterprise integrations where reliability, data consistency, and scale matter. My experience spans legacy modernization, API development, event-driven architecture, and scheduled data pipelines for retail systems.</p>
            <div class="about-links">
              <a :href="profile.linkedin" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a :href="emailHref">Email <span>↗</span></a>
              <a v-if="profile.github" :href="profile.github" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="section-wrap content-section">
        <div class="section-heading"><p class="section-label">02 / TOOLKIT</p><h2>Tools I work with<span>.</span></h2></div>
        <div class="skill-grid">
          <article v-for="(group, index) in skills" :key="group.title" class="skill-card">
            <div class="skill-number">0{{ index + 1 }}</div>
            <h3>{{ group.title }}</h3>
            <div class="chips"><span v-for="skill in group.items" :key="skill">{{ skill }}</span></div>
          </article>
        </div>
      </section>

      <section id="experience" class="experience-band">
        <div class="section-wrap content-section">
          <div class="section-heading"><p class="section-label">03 / EXPERIENCE</p><h2>Where I've made an impact<span>.</span></h2></div>
          <article v-for="role in roles" :key="role.company" class="experience-card">
            <div class="experience-meta"><span class="company-mark">EQ</span><div><h3>{{ role.company }}</h3><p>{{ role.title }}</p><p class="muted">{{ role.client }} · {{ role.location }}</p></div><span class="period">{{ role.period }}</span></div>
            <p class="role-summary">{{ role.summary }}</p>
            <ul class="impact-list"><li v-for="item in role.highlights" :key="item">{{ item }}</li></ul>
          </article>
        </div>
      </section>

      <section id="projects" class="section-wrap content-section">
        <div class="section-heading"><p class="section-label">04 / SELECTED WORK</p><h2>Projects & systems<span>.</span></h2><p class="section-intro">A selection of integration, data-processing, and application work.</p></div>
        <div class="project-grid">
          <article v-for="(project, index) in projects" :key="project.name" class="project-card" :class="{ 'project-featured': index === 0 }">
            <div class="project-top"><span class="project-index">0{{ index + 1 }}</span><span class="project-category">{{ project.category }}</span></div>
            <h3>{{ project.name }}</h3><p class="project-description">{{ project.description }}</p>
            <p class="project-impact">{{ project.impact }}</p>
            <ul><li v-for="detail in project.details" :key="detail">{{ detail }}</li></ul>
            <div class="project-stack"><span v-for="tech in project.stack" :key="tech">{{ tech }}</span></div>
          </article>
        </div>
      </section>

      <section class="contact-band">
        <div class="section-wrap contact-inner"><p class="section-label">05 / NEXT STEP</p><h2>Have a backend challenge<br />in mind<span>?</span></h2><p>Let's talk about engineering, integrations, and building dependable systems.</p><a class="button button-white" :href="emailHref">Get in touch <span>↗</span></a></div>
      </section>
    </main>

    <footer class="footer section-wrap"><a class="wordmark" href="#home">AS<span>.</span></a><p>Designed & built with Nuxt · Content powered by Markdown</p><a href="#home">Back to top ↑</a></footer>
  </div>
</template>
