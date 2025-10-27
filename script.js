// script.js — dynamic content via arrays + DOM creation
// Guard: only run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  // ---------- Data Arrays (at least 5 each) ----------
  const practiceItems = [
    { title: "Pong Classic", chips: ["Beginner","Unity","C#"], desc: "Finish a complete game using Unity physics & basic scripting (2–3 hours).", progress: 100 },
    { title: "Platformer Character Controller", chips: ["Animation","Input","Physics"], desc: "Build a responsive 2D character with smooth movement & animations (3–4 hours).", progress: 25 },
    { title: "Breakout Clone", chips: ["2D","Physics"], desc: "Brick‑breaker with power‑ups and level progression.", progress: 0 },
    { title: "Top‑Down Shooter Core", chips: ["Input","AI"], desc: "Twin‑stick controls, basic enemy AI, and waves.", progress: 60 },
    { title: "UI & Menus Basics", chips: ["UI","UX"], desc: "Start menu, pause, settings, and scene flow.", progress: 10 }
  ];

  const showcaseItems = [
    { title: "Neon Runner", chips: ["2D","Endless Runner"], desc: "Procedural generation + neon aesthetics. By Alex Chen." },
    { title: "Puzzle Gardens", chips: ["Puzzle","Relaxing"], desc: "Match‑3 + gardening vibes. By Maria Santos." },
    { title: "Skyline Drifter", chips: ["Arcade","Mobile"], desc: "One‑tap glide controls through a stylized city. By Vik." },
    { title: "Echoes of Light", chips: ["Puzzle","Narrative"], desc: "Light‑mirror puzzles with audio cues. By Hana." },
    { title: "Rogue Botanist", chips: ["Roguelike","Crafting"], desc: "Permadeath + plant alchemy. By Priya." }
  ];

  const challengeItems = [
    { title: "Weekly Code Challenge", chips: ["Beginner"], desc: "Make a character change color when touching different surfaces.", timeLeft: "3 days left" },
    { title: "Monthly Game Jam", chips: ["All Levels"], desc: "Build a game around the theme Time Travel in 48 hours.", timeLeft: "Starts in 10 days" },
    { title: "Shader Sprint", chips: ["Intermediate"], desc: "Create a hologram shader with noise & rim lighting.", timeLeft: "1 week left" },
    { title: "Physics Tuning", chips: ["Beginner"], desc: "Tune rigidbody & collider values for satisfying jumps.", timeLeft: "5 days left" },
    { title: "Accessibility Pass", chips: ["All Levels"], desc: "Add color‑blind palettes and remappable controls.", timeLeft: "2 weeks left" }
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
    h3.textContent = title + (tag ? " " : "");
    if(tag){
      const small = el("span","small","• " + tag);
      h3.appendChild(document.createTextNode(" "));
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
