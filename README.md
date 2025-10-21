**Chosen Option: Option C**

## Why this choice?
- In my prototype, there are several distinct main sections (Home, Projects, Progress, Community, Career). Each serves a different purpose, so I decided to use separate HTML files for clarity and easier maintenance.
- At the same time, some pages (like Projects, Community, and Career) include related sub-sections (tabs). I used the CSS :target selector to create on-page tab navigation, allowing users to switch content smoothly without full page reloads.
- This approach aligns with my current goals: keeping the structure simple, semantic, and framework-free, with only minimal JavaScript.

## Pages / Sections
- `index.html` — Overview / Home (progress summary + learning roadmaps)
- `projects.html` — Tabs: Practice `#practice`, Showcase `#showcase`, Challenges `#challenges`
- `progress.html` — Overall statistics, achievements
- `community.html` — Tabs: Discussions `#discussions`, Study Groups `#groups`, Mentors `#mentors`
- `career.html` — Tabs: Career Paths `#paths`, Skill Assessment `#skills`, Job Market `#jobs`
- `style.css` — Shared styles for consistent look

## Navigation
- Top navigation links connect the major pages.
- Inside pages with tabs, the secondary navigation uses fragment links (e.g., `projects.html#showcase`). CSS `:target` reveals the matching section. A tiny inline script only adds the `.active` style to the current tab.

## Anticipated Challenges
- Fragment-based tabs rely on URL hashes. If you need browser history control or animations later, you might add light JS.
- As content grows, consider componentizing repeated UI (cards, chips). For now, repetition keeps files simple and explicit.
- Accessibility: headings, landmarks, and `aria-label`s are included; further work could add keyboard focus styles and skip links.
