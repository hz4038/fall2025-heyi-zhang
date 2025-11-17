**Chosen Option: Option C**

## Why this choice?

* In my prototype, there are several distinct main sections (Home, Projects, Progress, Community, Career). Each serves a different purpose, so I decided to use separate HTML files for clarity and easier maintenance.
* At the same time, some pages (like Projects, Community, and Career) include related sub-sections (tabs). I used the CSS `:target` selector to create on-page tab navigation, allowing users to switch content smoothly without full page reloads.
* This approach aligns with my current goals: keeping the structure simple, semantic, and framework-free, with only minimal JavaScript.

## Pages / Sections

* `index.html` — Overview / Home (progress summary + learning roadmaps)
* `projects.html` — Tabs: Practice `#practice`, Showcase `#showcase`, Challenges `#challenges`
* `progress.html` — Overall statistics, achievements
* `community.html` — Tabs: Discussions `#discussions`, Study Groups `#groups`, Mentors `#mentors`
* `career.html` — Tabs: Career Paths `#paths`, Skill Assessment `#skills`, Job Market `#jobs`
* `style.css` — Shared styles for a consistent look

## Navigation

* Top navigation links connect the major pages.
* Inside pages with tabs, the secondary navigation uses fragment links (e.g., `projects.html#showcase`). CSS `:target` reveals the matching section. A tiny inline script only adds the `.active` style to the current tab.

## Anticipated Challenges

* Fragment-based tabs rely on URL hashes. If you need browser history control or animations later, you might add light JS.
* As content grows, consider componentizing repeated UI (cards, chips). For now, repetition keeps files simple and explicit.
* Accessibility: headings, landmarks, and `aria-label`s are included; further work could add keyboard focus styles and skip links.

## Week 8 — Data-Driven Content (Arrays + Loops + DOM)

**What I display:** Project practice/showcase/challenges, community discussions/groups/mentors, and career paths/jobs are now generated from JavaScript arrays.

**How it's built:**

* I defined arrays of objects (≥5 items each) in `script.js`.
* I loop through arrays with `forEach()` and build DOM nodes via `document.createElement()`.
* I set `textContent` / attributes and append into page containers (e.g., `#practice-list`, `#discussions-list`).
* Pages remain framework-free and accessible; tabs still use `:target` + a tiny sync script.

**Challenges:**

* Deciding what to render dynamically vs. keep static. I chose to keep page shells/headers static and render list content via JS.
* Preventing FOUC on slow connections—could later add a `hidden` class that is removed after render.

**Next week:**

* Add images per item and a lightweight filter/sort control for Projects.
* Persist progress to `localStorage` and render badges.

## Features Added

* Dark mode toggle (persisted)
* Project search/filter/sort + mark-as-done
* Community: new post form (local only)
* Mentors: booking modal (demo)
* Jobs: save ☆ to favorites
* `localStorage` persistence for progress and settings
* Accessible focus styles and keyboard support

## Animation Summary

* **Interaction cues:** Cards lift slightly with a shadow on hover; nav link underlines slide in with a slight raise; chips get a subtle lift to improve affordance.
* **Page/section transitions:** Quick fade-in on first page load; tab content fades in and slides up to reduce the “sudden change” feeling.
* **Feedback & microinteractions:** Buttons depress slightly on press; star/favorite click scales with a small pop when filled.
* **Overlays & notifications:** Modal backdrop fades in and dialogs pop in; toasts slide up from the bottom.
* **Progress & loading:** Progress bar width transitions smoothly; skeleton placeholders shimmer to indicate loading.


## New: Layout & Visual Polish

**What I refined this week:**

* Added a consistent page header + short intro paragraph on every page (Home, Projects, Progress, Community, Career) so learners immediately see what the screen is for.
* Tweaked layout spacing by giving the main container more breathing room and increasing overall line-height for better readability on both desktop and mobile.
* Improved the top navigation on small screens by allowing horizontal scrolling, so the pill-style links stay usable instead of wrapping awkwardly.
* Softened and rounded the bottom “mobile preview” nav with a subtle gradient, making it feel more like a dock instead of a second toolbar.
* Highlighted active project filter chips with a solid brand background for clearer visual feedback when filtering.

**Small interaction touches:**

* Job “save” stars now toggle a `.filled` state as well as the ★/☆ character, so the micro-animation in CSS is actually used when you save or unsave a job.
* Overall, these changes focus on readability and visual hierarchy rather than new features, keeping the prototype simple but more polished.

