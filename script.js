/* ============================================================
   আপনার প্রজেক্ট এখানে যোগ করুন
   ============================================================
   প্রতিটা প্রজেক্টের জন্য:
   - title      : প্রজেক্টের নাম
   - category   : যেমন "Motion Graphics", "Video Edit", "Title Sequence"
   - youtubeId  : YouTube লিংকের শেষ অংশ (ID)
                  উদাহরণ: লিংক যদি হয় https://www.youtube.com/watch?v=dQw4w9WgXcQ
                  তাহলে youtubeId হবে "dQw4w9WgXcQ"
                  খালি রাখলে ("") প্লেসহোল্ডার থাম্বনেইল দেখাবে, ক্লিকে কিছু হবে না।
   - colors     : থাম্বনেইলের গ্রেডিয়েন্ট রং (২টা hex কালার), ভিডিও/থাম্বনেইল ইমেজ যোগ না করা পর্যন্ত এটা ব্যবহার হবে
   ============================================================ */
const PROJECTS = [
  { title: "Brand Reel — Aurora",      category: "Motion Graphics", youtubeId: "fRoOwRC-JiE
", colors: ["#35D0C0", "#0A0B0D"] },
  { title: "Wedding Story — R & S",    category: "Video Edit",      youtubeId: "", colors: ["#FF6B35", "#0A0B0D"] },
  { title: "Product Launch — Nova",    category: "Motion Graphics", youtubeId: "", colors: ["#35D0C0", "#FF6B35"] },
  { title: "Title Sequence — Echo",    category: "Title Sequence",  youtubeId: "", colors: ["#8B8E94", "#0A0B0D"] },
  { title: "Travel Vlog — Coastline",  category: "Video Edit",      youtubeId: "", colors: ["#FF6B35", "#35D0C0"] },
  { title: "Music Video — Lowlight",   category: "Motion Graphics", youtubeId: "", colors: ["#0A0B0D", "#35D0C0"] },
];

/* ফিচারড রিল-এ কোন প্রজেক্টগুলো দেখাবে (ইনডেক্স অনুযায়ী, উপরের তালিকা থেকে) */
const FEATURED_INDEXES = [0, 2, 4, 5, 1];

/* ব্যবহৃত টুলস — চাইলে নাম বদলান/যোগ করুন */
const TOOLS = ["After Effects", "Premiere Pro", "DaVinci Resolve", "Cinema 4D", "Photoshop", "Illustrator"];

/* ============================================================
   থাম্বনেইল জেনারেটর (placeholder SVG duotone)
   ============================================================ */
function makeThumbSVG(colors, label){
  const [c1, c2] = colors;
  const id = "g" + Math.random().toString(36).slice(2, 9);
  return `
    <div class="thumb-grad">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${c1}" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="${c2}" stop-opacity="0.85"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="#15171B"/>
        <rect width="400" height="300" fill="url(#${id})"/>
        <g stroke="${c1}" stroke-opacity="0.35" stroke-width="1">
          <line x1="0" y1="100" x2="400" y2="100"/>
          <line x1="0" y1="200" x2="400" y2="200"/>
        </g>
      </svg>
    </div>`;
}

/* ============================================================
   RENDER: WORK GRID
   ============================================================ */
const workGrid = document.getElementById('workGrid');
PROJECTS.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'work-item';
  el.innerHTML = `
    <div class="work-item-thumb">${makeThumbSVG(p.colors, p.title)}</div>
    <span class="work-item-num">${String(i + 1).padStart(2, '0')}</span>
    <div class="play-icon">▶</div>
    <div class="work-item-overlay">
      <div class="work-item-cat">${p.category}</div>
      <div class="work-item-title">${p.title}</div>
    </div>
  `;
  el.addEventListener('click', () => openModal(p.youtubeId));
  workGrid.appendChild(el);
});

/* ============================================================
   RENDER: FEATURED FILMSTRIP
   ============================================================ */
const filmstrip = document.getElementById('filmstrip');
FEATURED_INDEXES.forEach(idx => {
  const p = PROJECTS[idx];
  if (!p) return;
  const el = document.createElement('div');
  el.className = 'film-cell';
  el.innerHTML = `
    <div class="film-cell-thumb">${makeThumbSVG(p.colors, p.title)}</div>
    <div class="film-cell-title">${p.title}</div>
  `;
  el.addEventListener('click', () => openModal(p.youtubeId));
  filmstrip.appendChild(el);
});

/* ============================================================
   RENDER: TOOLKIT MARQUEE (duplicated for seamless loop)
   ============================================================ */
const marqueeTrack = document.getElementById('marqueeTrack');
function toolsHTML(){
  return TOOLS.map(t => `<div class="tool-item">${t}<span>/</span></div>`).join('');
}
marqueeTrack.innerHTML = toolsHTML() + toolsHTML();

/* ============================================================
   VIDEO MODAL
   ============================================================ */
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');

function openModal(youtubeId){
  if (!youtubeId){
    // প্লেসহোল্ডার: এখনো কোনো ভিডিও লিংক যোগ করা হয়নি
    return;
  }
  modalVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" title="Project video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modalVideo.innerHTML = '';
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   SCRUBBER: scroll-driven progress + timecode
   ============================================================ */
const scrubberFill = document.getElementById('scrubberFill');
const scrubberPlayhead = document.getElementById('scrubberPlayhead');
const scrubberTC = document.getElementById('scrubberTC');

function formatTimecode(progress){
  const totalFrames = Math.floor(progress * 24 * 60); // arbitrary scale for aesthetic timecode
  const frames = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

let ticking = false;
function updateScrubber(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
  scrubberFill.style.width = (progress * 100) + '%';
  scrubberPlayhead.style.left = (progress * 100) + '%';
  scrubberTC.textContent = formatTimecode(progress);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking){
    requestAnimationFrame(updateScrubber);
    ticking = true;
  }
}, { passive: true });
updateScrubber();

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
