document.addEventListener("DOMContentLoaded", () => {

    // Data models
  
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
        { title: "Indie Game Developer", meta: "Complete Path • C# + Unity + Art + Design" },
        { title: "Gameplay Programmer", meta: "Specialization • Advanced C# + Patterns + Math" },
        { title: "Technical Artist", meta: "Specialization • Shaders + VFX + Optimization" }
    ];

    const jobs = [
        { title: "Junior Unity Developer", meta: "Remote • $50k–$70k • Required: Unity, C#, 2D Games" },
        { title: "Indie Game Developer", meta: "San Francisco, CA • $60k–$80k • Required: Unity, Game Design, Art Direction" },
        { title: "Technical Artist (Shaders)", meta: "Austin, TX • $85k–$110k • Required: Unity/Unreal, HLSL/Shader Graph" },
        { title: "Gameplay Programmer", meta: "Vancouver, BC • $80k–$105k • Required: C#, AI/Physics" },
        { title: "QA Engineer (Automation)", meta: "Montreal, QC • $55k–$75k • Required: Python/C#, CI" }
    ];
  
    // Helper utilities
    const $ = (s, p=document) => p.querySelector(s);
    const $$ = (s, p=document) => p.querySelectorAll(s);
  
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
      const bar = el("div","progressbar");
      const fill = el("span");
      fill.style.width = percent + "%";
      bar.appendChild(fill);
      container.appendChild(bar);
    }
  
    // Render cards and lists
    function renderCard(item, type){
      const card = el("article", "card reveal-on-scroll"); // 添加 reveal-on-scroll 类
      const h3 = el("h3", "", item.title);
      card.appendChild(h3);
  
      if(item.desc) card.appendChild(el("p", "small", item.desc));
      if(item.meta) card.appendChild(el("p", "small muted", item.meta));
      
      if(item.chips) addChips(card, item.chips);
      if(typeof item.progress !== "undefined") addProgress(card, item.progress);
  
      if(item.timeLeft){
         const t = el("div", "small", "⏱ " + item.timeLeft);
         t.style.marginTop="8px"; t.style.color="var(--accent)";
         card.appendChild(t);
      }
      return card;
    }
  
    function renderList(id, items, type){
      const container = $(id);
      if(!container) return;
      container.innerHTML = "";
      items.forEach(item => container.appendChild(renderCard(item, type)));
    }
  
    // Render each section list
    renderList("#practice-list", practiceItems);
    renderList("#showcase-list", showcaseItems);
    renderList("#challenges-list", challengeItems);
    renderList("#discussions-list", discussions);
    renderList("#groups-list", groups);
    renderList("#mentors-list", mentors);
    renderList("#paths-list", paths);
    renderList("#jobs-list", jobs);
  
    // UI interactions
  
    // Modal logic
    const modal = $("#modal");
    const modalContent = $("#modal-content");
    
    window.openModal = function(node){
      if(!modal || !modalContent) return;
      modalContent.innerHTML = "";
      if(node instanceof Node) modalContent.appendChild(node);
      else modalContent.innerHTML = String(node);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
    };
  
    window.closeModal = function(){
      if(!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
    };
  
    if(modal){
      modal.addEventListener("click", (e)=>{
        if(e.target.classList.contains("modal__backdrop")) closeModal();
      });
      const btn = $(".modal__close", modal);
      if(btn) btn.addEventListener("click", closeModal);
      window.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeModal(); });
    }
  
    // Simple toast helper
    window.toast = function(msg){
      const t = el("div", "toast", msg);
      document.body.appendChild(t);
      setTimeout(()=> t.remove(), 3000);
    };
  
    // Mentor booking demo
    function enhanceMentors(){
      $$("#mentors-list .card").forEach(card=>{
        if(card.dataset.booking) return;
        card.dataset.booking = "1";
        const btn = document.createElement("button");
        btn.className = "btn small hero-primary"; // primary-style button
        btn.style.marginTop = "12px";
        btn.style.width = "100%";
        btn.textContent = "Book Session";
        btn.addEventListener("click", ()=>{
          const t = $("h3", card)?.textContent || "Mentor";
          const node = document.createElement("div");
          node.innerHTML = `
            <h3 style="margin-bottom:16px">Book with ${t}</h3>
            <p class="small" style="margin-bottom:12px">Pick a demo time (no backend):</p>
            <div class="chips" style="justify-content:center; margin-bottom:24px">
              <button class="chip">Fri 7 PM</button>
              <button class="chip">Sat 2 PM</button>
              <button class="chip">Sun 10 AM</button>
            </div>
            <div><button id="confirm-book" class="btn hero-primary" style="width:100%">Confirm Booking</button></div>
          `;
          openModal(node);
          node.querySelector("#confirm-book").addEventListener("click", ()=>{
            closeModal();
            toast("Booked! Check your calendar 📅");
          });
        });
        card.appendChild(btn);
      });
    }
    if($("#mentors-list")) setTimeout(enhanceMentors, 0);
  
    // Theme toggle
    const themeBtn = $("#theme-toggle");
    const html = document.documentElement;
    if(themeBtn){
      const saved = localStorage.getItem("theme") || "light";
      html.dataset.theme = saved;
      themeBtn.textContent = saved==="dark" ? "🌞" : "🌓";
  
      themeBtn.addEventListener("click", ()=>{
        const current = html.dataset.theme;
        const next = current === "dark" ? "light" : "dark";
        html.dataset.theme = next;
        localStorage.setItem("theme", next);
        themeBtn.textContent = next==="dark" ? "🌞" : "🌓";
      });
    }
    
    // Scroll reveal observer
    // Works for static and dynamic .reveal-on-scroll elements
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, observerOptions);
  
    // Observe new elements
    function observeElements() {
      const elements = document.querySelectorAll('.card, .hero-title, .hero-subtitle, .reveal-on-scroll');
      elements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      });
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(observeElements, 100);
    // Re-run after tab hash changes
    window.addEventListener('hashchange', () => setTimeout(observeElements, 100));
  
  });