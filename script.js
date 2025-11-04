// script.js — dynamic content via arrays + DOM creation
// Guard: only run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  // ---------- Data Arrays (at least 5 each) ----------
  const practiceItems = [
    { title: "Pong Classic", chips: ["Beginner","Unity","C#"], desc: "Finish a complete game using Unity physics & basic scripting (2–3 hours).", progress: 100 },
    { title: "Platformer Character Controller", chips: ["Animation","Input","Physics"], desc: "Build a responsive 2D character with smooth movement & animations (3–4 hours).", progress: 25 },
    { title: "Breakout Clone", chips: ["2D","Physics"], desc: "Brick-breaker with power-ups and level progression.", progress: 0 },
    { title: "Top-Down Shooter Core", chips: ["Input","AI"], desc: "Twin-stick controls, basic enemy AI, and waves.", progress: 60 },
    { title: "UI & Menus Basics", chips: ["UI","UX"], desc: "Start menu, pause, settings, and scene flow.", progress: 10 }
  ];

  const showcaseItems = [
    { title: "Neon Runner", chips: ["2D","Endless Runner"], desc: "Procedural generation + neon aesthetics. By Alex Chen." },
    { title: "Puzzle Gardens", chips: ["Puzzle","Relaxing"], desc: "Match-3 + gardening vibes. By Maria Santos." },
    { title: "Skyline Drifter", chips: ["Arcade","Mobile"], desc: "One-tap glide controls through a stylized city. By Vik." },
    { title: "Echoes of Light", chips: ["Puzzle","Narrative"], desc: "Light-mirror puzzles with audio cues. By Hana." },
    { title: "Rogue Botanist", chips: ["Roguelike","Crafting"], desc: "Permadeath + plant alchemy. By Priya." }
  ];

  const challengeItems = [
    { title: "Weekly Code Challenge", chips: ["Beginner"], desc: "Make a character change color when touching different surfaces.", timeLeft: "3 days left" },
    { title: "Monthly Game Jam", chips: ["All Levels"], desc: "Build a game around the theme Time Travel in 48 hours.", timeLeft: "Starts in 10 days" },
    { title: "Shader Sprint", chips: ["Intermediate"], desc: "Create a hologram shader with noise & rim lighting.", timeLeft: "1 week left" },
    { title: "Physics Tuning", chips: ["Beginner"], desc: "Tune rigidbody & collider values for satisfying jumps.", timeLeft: "5 days left" },
    { title: "Accessibility Pass", chips: ["All Levels"], desc: "Add color-blind palettes and remappable controls.", timeLeft: "2 weeks left" }
  ];

  const discussions = [
    { title: "Best practices for Unity 2D physics?", meta: "Sarah Chen • Level 3 • 2 hours ago", chips: ["Unity","Physics","2D"] },
    { title: "Struggling with C# OOP concepts", meta: "Mike Rodriguez • Level 1 • 4 hours ago", chips: ["C#","OOP"] },
    { title: "How to organize scenes for a medium project?", meta: "Noah • Level 2 • yesterday", chips: ["Unity","Architecture"] },
    { title: "Sprite atlases vs individual textures", meta: "Ivy • Level 4 • 3 days ago", chips: ["2D","Optimization"] },
    { title: "Input System: actions, bindings, and devices", meta: "Rico • Level 2 • 5 days ago", chips: ["Input System"] }
  ];

  const groups = [
    { title: "Unity Beginners Circle", meta: "Beginner • Weekly • Next: Fri 7 PM" },
    { title: "2D Game Art Club", meta: "Creative • Next: Mon 6 PM" },
    { title: "C# Study Pod", meta: "Algorithms • Next: Wed 8 PM" },
    { title: "Level Design Walkthroughs", meta: "Design • Next: Sun 10 AM" },
    { title: "Playtest Swap", meta: "All levels • Next: Sat 2 PM" }
  ];

  const mentors = [
    { title: "Dr. Emma Thompson", meta: "Senior Game Dev • Unity • C# • Game Design • 127 sessions completed • ★4.9" },
    { title: "Jason Wu", meta: "Lead Programmer • Advanced C# • Performance • ★4.8" },
    { title: "Nora Patel", meta: "Technical Artist • Shaders • VFX • ★4.7" },
    { title: "Kenji Sato", meta: "Gameplay Engineer • Systems • Prototyping • ★4.8" },
    { title: "Ava Martinez", meta: "Producer • Pipelines • Team workflow • ★4.6" }
  ];

  const paths = [
    { title: "Indie Game Developer", tag: "High Demand", bullets: ["Average Salary: $45k – $85k", "Time to Entry: 6–12 months", "Key Skills: Unity/Unreal, C#/C++, Game Design"], chips:["Creative freedom","Flexible schedule"] },
    { title: "Game Programmer", tag: "Very High Demand", bullets: ["Average Salary: $65k – $120k", "Time to Entry: 8–18 months", "Key Skills: C#, C++, Engine internals"], chips:[] },
    { title: "Technical Artist", tag: "High Demand", bullets: ["Average Salary: $70k – $130k", "Time to Entry: 10–20 months", "Key Skills: Shaders, VFX, tools"], chips:["Art + Code"] },
    { title: "Level Designer", tag: "Growing", bullets: ["Average Salary: $55k – $95k", "Time to Entry: 8–16 months", "Key Skills: Greyboxing, pacing, playtesting"], chips:["Design"] },
    { title: "QA Engineer (Games)", tag: "Stable", bullets: ["Average Salary: $45k – $75k", "Time to Entry: 3–6 months", "Key Skills: Test plans, automation"], chips:[] }
  ];

  const jobs = [
    { title: "Junior Unity Developer", meta: "Remote • $50k–$65k • Required: Unity, C#, 2D Games" },
    { title: "Indie Game Developer", meta: "San Francisco, CA • $60k–$80k • Required: Unity, Game Design, Art Direction" },
    { title: "Technical Artist (Shaders)", meta: "Austin, TX • $85k–$110k • Required: Unity/Unreal, HLSL/Shader Graph" },
    { title: "Gameplay Programmer", meta: "Vancouver, BC • $80k–$105k • Required: C#, AI/Physics" },
    { title: "QA Engineer (Automation)", meta: "Montreal, QC • $55k–$75k • Required: Python/C#, CI" }
  ];

  // ---------- Helpers ----------
  function el(tag, className, text){
    const node = document.createElement(tag);
    if(className) node.className = className;
    if(text) node.textContent = text;
    return node;
  }

  function addChips(container, items){
    if(!items || !items.length) return;
    const chips = el("div","chips");
    items.forEach(c => chips.appendChild(el("span","chip", c)));
    container.appendChild(chips);
  }

  function addProgress(container, percent){
    if(typeof percent !== "number") return;
    const label = el("div","small","Progress");
    const bar = el("div","progressbar");
    const span = el("span");
    span.style.width = Math.min(Math.max(percent,0),100) + "%";
    bar.appendChild(span);
    container.appendChild(label);
    container.appendChild(bar);
  }

  // ---------- Renderers ----------
  function renderCard({title, desc, meta, chips, progress, bullets, tag, extra}){
    const card = el("article","card");
    const h3 = el("h3");

    // 修复点 #3：避免双空格——先只设置标题，若有 tag 再追加空格与标签元素
    h3.textContent = title;
    if(tag){
      h3.appendChild(document.createTextNode(" "));
      const small = el("span","small","• " + tag);
      h3.appendChild(small);
    }
    card.appendChild(h3);

    if(meta) card.appendChild(el("p","small", meta));
    if(desc) card.appendChild(el("p","small", desc));

    if(Array.isArray(bullets) && bullets.length){
      const ul = el("ul","small");
      bullets.forEach(b => ul.appendChild(el("li",null,b)));
      card.appendChild(ul);
    }

    addChips(card, chips);
    addProgress(card, progress);

    if(extra instanceof Node) card.appendChild(extra);
    return card;
  }

  function renderList(targetId, items){
    const target = document.getElementById(targetId);
    if(!target) return; // not on this page
    target.innerHTML = "";
    items.forEach(obj => target.appendChild(renderCard(obj)));
  }

  // ---------- Page Hooks ----------
  renderList("practice-list", practiceItems);
  renderList("showcase-list", showcaseItems);
  renderList("challenges-list", challengeItems);

  renderList("discussions-list", discussions);
  renderList("groups-list", groups);
  renderList("mentors-list", mentors);

  renderList("paths-list", paths);
  renderList("jobs-list", jobs);

  // Skills panel: example dynamic % bar update
  const readinessBar = document.getElementById("readiness-bar");
  if(readinessBar){
    readinessBar.style.width = "47%";
  }
});


// ---------- Enhancements: Theme, Toasts, Filters, LocalStorage, Modals, Actions ----------
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Theme toggle with persistence
  const themeBtn = $("#theme-toggle");
  const THEME_KEY = "gca.theme";
  function setTheme(mode){
    if(mode === "dark") document.documentElement.setAttribute("data-theme","dark");
    else if(mode === "light") document.documentElement.setAttribute("data-theme","light");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(THEME_KEY, mode || "auto");
    if(themeBtn) themeBtn.setAttribute("aria-pressed", String(mode==="dark"));
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  if(savedTheme) setTheme(savedTheme);
  if(themeBtn){
    themeBtn.addEventListener("click", () => {
      const current = localStorage.getItem(THEME_KEY) || "auto";
      const next = current==="dark" ? "light" : current==="light" ? "auto" : "dark";
      setTheme(next);
      toast("Theme: " + (next==="auto" ? "auto (system)" : next));
    });
  }

  // Toast helper
  let toastTimer;
  function toast(msg, ms=1800){
    let el = $(".toast");
    if(!el){
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.remove("hide");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> el.classList.add("hide"), ms);
  }
  window.__toast = toast;

  // Modal
  const modal = $("#modal");
  const modalContent = $("#modal-content");
  function openModal(node){
    if(!modal || !modalContent) return;
    modalContent.innerHTML = "";
    if(node instanceof Node) modalContent.appendChild(node);
    else modalContent.innerHTML = String(node);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
  }
  if(modal){
    modal.addEventListener("click", (e)=>{
      if(e.target.classList.contains("modal__backdrop")) closeModal();
    });
    const btn = $(".modal__close", modal);
    if(btn) btn.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeModal(); });
  }

  // LocalStorage utilities
  const LS = {
    get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch{ return d; } },
    set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
  };

  // Projects: search/filter/sort + mark as done + details
  const search = $("#project-search");
  const sortSel = $("#project-sort");
  const filterChips = $$(".filters .filter");
  const clearFiltersBtn = $("#clear-filters");
  let activeFilters = new Set();

  function matchesFilter(text, chips){
    const q = (search?.value || "").trim().toLowerCase();
    let ok = !q || text.toLowerCase().includes(q) || (chips||[]).some(c => String(c).toLowerCase().includes(q));
    if(activeFilters.size){
      ok = ok && (chips||[]).some(c => activeFilters.has(String(c)));
    }
    return ok;
  }

  function sortItems(a, b){
    const val = (sortSel?.value) || "progress-desc";
    if(val==="alpha-asc") return a.title.localeCompare(b.title);
    if(val==="alpha-desc") return b.title.localeCompare(a.title);
    if(val==="progress-asc") return (a.progress||0) - (b.progress||0);
    // default progress-desc
    return (b.progress||0) - (a.progress||0);
  }

  function enhanceProjectCards(){
    $$("#practice-list .card").forEach((card)=>{
      if(card.dataset.enhanced) return;
      card.dataset.enhanced = "1";
      const title = $("h3", card)?.textContent || "Project";
      const chips = $$(".chip", card).map(c => c.textContent);

      const actions = document.createElement("div");
      actions.className = "actions";
      const doneBtn = document.createElement("button");
      doneBtn.className = "btn small";
      doneBtn.textContent = "Mark as done";
      const viewBtn = document.createElement("button");
      viewBtn.className = "btn ghost small";
      viewBtn.textContent = "Details";

      const key = "gca.project.done." + title;
      if(LS.get(key,false)){ doneBtn.textContent = "Completed ✓"; doneBtn.disabled = true; card.classList.add("done"); }

      doneBtn.addEventListener("click", ()=>{
        LS.set(key,true);
        doneBtn.textContent = "Completed ✓";
        doneBtn.disabled = true;
        // 修复点 #2：修正字符串拼接引号
        toast('Nice! Marked "' + title + '" as done.');
      });

      viewBtn.addEventListener("click", ()=>{
        const wrap = document.createElement("div");
        wrap.innerHTML = `<h3>${title}</h3><p class="small">Tags: ${(chips||[]).join(", ") || "—"}</p><p class="small">This is a demo modal. You can place GIFs, screenshots, and step-by-step tasks here.</p>`;
        openModal(wrap);
      });

      actions.appendChild(doneBtn);
      actions.appendChild(viewBtn);
      card.appendChild(actions);
    });
  }

  function rerenderProjects(){
    // Reuse existing DOM, just toggle display based on filters (since items are initially rendered by the base script).
    const containers = ["practice-list","showcase-list","challenges-list"].map(id => document.getElementById(id)).filter(Boolean);
    containers.forEach(container => {
      const cards = Array.from(container.children);
      cards.forEach(card => {
        const text = card.textContent || "";
        const chips = Array.from(card.querySelectorAll(".chip")).map(c=>c.textContent);
        card.style.display = matchesFilter(text, chips) ? "" : "none";
      });
      // Optional: simple sort by detaching & re-adding
      cards.sort((a,b)=>{
        const ap = parseInt(a.querySelector(".progressbar span")?.style.width || "0");
        const bp = parseInt(b.querySelector(".progressbar span")?.style.width || "0");
        const at = a.querySelector("h3")?.textContent.trim() || "";
        const bt = b.querySelector("h3")?.textContent.trim() || "";
        const aObj = {title:at, progress:ap};
        const bObj = {title:bt, progress:bp};
        return sortItems(aObj,bObj);
      }).forEach(card => container.appendChild(card));
    });
    enhanceProjectCards();
  }

  if(search) search.addEventListener("input", rerenderProjects);
  if(sortSel) sortSel.addEventListener("change", rerenderProjects);
  filterChips.forEach(ch => ch.addEventListener("click", ()=>{
    const tag = ch.dataset.filter;
    if(activeFilters.has(tag)){ activeFilters.delete(tag); ch.classList.remove("active"); }
    else { activeFilters.add(tag); ch.classList.add("active"); }
    rerenderProjects();
  }));
  if(clearFiltersBtn) clearFiltersBtn.addEventListener("click", ()=>{
    activeFilters.clear();
    filterChips.forEach(c=>c.classList.remove("active"));
    if(search) search.value = "";
    rerenderProjects();
  });
  // initial enhancement if present
  if($("#practice-list")) setTimeout(rerenderProjects, 0);

  // Community: new post (local-only)
  const form = $("#new-post-form");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const title = $("#post-title").value.trim();
      const tags = $("#post-tags").value.split(",").map(s=>s.trim()).filter(Boolean);
      const body = $("#post-body").value.trim();
      if(!title || !body) return;
      const list = $("#discussions-list");
      const article = document.createElement("article");
      article.className = "card";
      const h3 = document.createElement("h3");
      h3.textContent = title;
      article.appendChild(h3);
      const meta = document.createElement("p");
      meta.className = "small";
      meta.textContent = "You • just now";
      article.appendChild(meta);
      const p = document.createElement("p");
      p.className = "small";
      p.textContent = body;
      article.appendChild(p);
      if(tags.length){
        const chips = document.createElement("div");
        chips.className = "chips";
        tags.forEach(t=>{
          const s = document.createElement("span"); s.className = "chip"; s.textContent = t; chips.appendChild(s);
        });
        article.appendChild(chips);
      }
      list.prepend(article);
      form.reset();
      toast("Posted!");
    });
  }

  // Career: jobs save ☆
  function enhanceJobs(){
    $$("#jobs-list .card").forEach(card=>{
      if(card.dataset.starred) return;
      card.dataset.starred = "1";
      const title = $("h3", card)?.textContent || "Job";
      const star = document.createElement("span");
      star.className = "star";
      star.title = "Save job";
      star.textContent = "☆";
      const key = "gca.job.saved."+title;
      if(LS.get(key,false)) star.textContent = "★";
      star.addEventListener("click", ()=>{
        const saved = LS.get(key,false);
        LS.set(key, !saved);
        star.textContent = saved ? "☆" : "★";
        toast(!saved ? "Saved job" : "Removed");
      });
      $("h3", card)?.appendChild(star);
    });
  }
  if($("#jobs-list")) setTimeout(enhanceJobs, 0);

  // Mentors: booking demo
  function enhanceMentors(){
    $$("#mentors-list .card").forEach(card=>{
      if(card.dataset.booking) return;
      card.dataset.booking = "1";
      const btn = document.createElement("button");
      btn.className = "btn small";
      btn.textContent = "Book session";
      btn.addEventListener("click", ()=>{
        const t = $("h3", card)?.textContent || "Mentor";
        const node = document.createElement("div");

        // 修复点 #1：去掉反引号前的反斜杠，使用合法模板字符串
        node.innerHTML = `
          <h3>Book with ${t}</h3>
          <p class="small">Pick a demo time (no backend):</p>
          <div class="chips">
            <button class="chip">Fri 7 PM</button>
            <button class="chip">Sat 2 PM</button>
            <button class="chip">Sun 10 AM</button>
          </div>
          <div style="margin-top:10px"><button id="confirm-book" class="btn small">Confirm</button></div>
        `;
        openModal(node);
        node.querySelector("#confirm-book").addEventListener("click", ()=>{
          closeModal();
          toast("Booked! Check your (imaginary) calendar 📅");
        });
      });
      card.appendChild(btn);
    });
  }
  if($("#mentors-list")) setTimeout(enhanceMentors, 0);

  // Index/Progress: gamified badges + streak
  function ensureBadges(){
    $$(".kpi .value").forEach((v)=>{
      if(v.textContent.trim() === "5"){
        // add a badge near streak
        const parent = v.closest(".kpi");
        if(parent && !$(".badge", parent)){
          const b = document.createElement("span"); b.className="badge"; b.textContent="🔥 5-day streak";
          parent.appendChild(b);
        }
      }
    });
  }
  ensureBadges();

})();
