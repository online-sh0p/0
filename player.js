// ═══════════════════════════════════════════════════════════
//  WAVE Player — Categorised Playlist Edition
//  Songs are grouped by genre: House · Rap · Reggae
//  Add your MP3s to the same folder as index.html.
// ═══════════════════════════════════════════════════════════

const categories = [
  {
    id:    "house",
    label: "House",
    color: "#ffaa2a",
    songs: [
      { title: "My Darling Isabella (House 2026)",                     artist: "Dj Online", src: "House/My-Darling-Isabella.mp3",                              duration: "0:00" },
      { title: "You never fully dressed without a smile (House 2026)", artist: "Dj Online", src: "House/You-never-fully-dressed-without-a-smile.mp3",           duration: "0:00" },
      { title: "A deeper love (House 2026)",                           artist: "Dj Online", src: "House/A-deeper-love-(House-2026).mp3",                        duration: "0:00" },
      { title: "Heaven knows (House 2026)",                            artist: "Dj Online", src: "House/Heaven-knows-(House-2026).mp3",                         duration: "0:00" },
      { title: "With you boo (House 2026)",                            artist: "Dj Online", src: "House/With-you-boo-(House-2026).mp3",                         duration: "0:00" },
      { title: "Stuck on you (House 2026)",                            artist: "Dj Online", src: "House/Stuck-on-you-(House-2026).mp3",                         duration: "0:00" },
      { title: "I'm stuck on you (House 2026)",                        artist: "Dj Online", src: "House/Im-stuck-on-you-(House-2026).mp3",                      duration: "0:00" },
      { title: "I was not suppose (Duet mix)",                         artist: "Dj Online", src: "House/I-was-not-suppose-(Duet-mix).mp3",                      duration: "0:00" },
      { title: "Die with a smile (House 2026)",                        artist: "Dj Online", src: "House/Die-with-a-smile-(House-2026).mp3",                     duration: "0:00" },
      { title: "Buy me a Rose (House 2026)",                           artist: "Dj Online", src: "House/Buy-me-a-Rose-(House-2026).mp3",                        duration: "0:00" },
    ]
  },
  {
    id:    "rap",
    label: "Rap",
    color: "#b5ff47",
    songs: [
      { title: "Mockingbird (Rap 2026)",       artist: "Dj Online", src: "Rap/Mockingbird-(Rap-2026).mp3",       duration: "0:00" },
      { title: "Ordinary (Remix 2026)",          artist: "Dj Online", src: "Rap/Ordinary-(Remix-2026).mp3",         duration: "0:00" },
    ]
  },
  {
    id:    "reggae",
    label: "Reggae",
    color: "#47ffd8",
    songs: [
      { title: "Fire & Midnight",                            artist: "Dj Online", album: "Raggaeton", src: "Reggae/Fire-Midnight.mp3",                          duration: "0:00" },
      { title: "Fire & Midnight (Remix)",                    artist: "Dj Online", album: "Raggaeton", src: "Reggae/Fire-Midnight-remix.mp3",                     duration: "0:00" },
      { title: "Holy Water ft One Plus One (Duet Version)",  artist: "Dj Online", album: "Raggaeton", src: "Reggae/Holy-Water-x-1-+-1-(Duet-Version).mp3",       duration: "0:00" },
    ]
  }
];

// Flat list for playback — built from categories, keeps global index
let songs      = [];
let currentIdx = -1;
let isFading   = false;

// Flatten categories into one songs array, tagging each with genre
categories.forEach(cat => {
  cat.songs.forEach(s => {
    songs.push({ ...s, album: "The Rise", genre: cat.id, genreColor: cat.color });
  });
});

// ── AUDIO ENGINE ──────────────────────────────────────────
const audio = document.getElementById('audio-engine');
audio.volume = 0.7;

audio.addEventListener('timeupdate',     updateProgress);
audio.addEventListener('loadedmetadata', onMetaLoaded);
audio.addEventListener('play',  () => document.body.classList.add('playing'));
audio.addEventListener('pause', () => document.body.classList.remove('playing'));
audio.addEventListener('ended', () => {
  document.body.classList.remove('playing');
  isFading = false;
  nextSong();
});
audio.addEventListener('error', () => showToast('Could not load — check the file is in your folder'));

function onMetaLoaded() {
  const dur = audio.duration || 0;
  document.getElementById('time-total').textContent = formatTime(dur);
  if (songs[currentIdx] && songs[currentIdx].duration === '0:00') {
    songs[currentIdx].duration = formatTime(dur);
    const durEl = document.querySelector(`.song-item[data-idx="${currentIdx}"] .song-dur`);
    if (durEl) durEl.textContent = formatTime(dur);
  }
}

function updateProgress() {
  const cur       = audio.currentTime || 0;
  const total     = audio.duration    || 0;
  const pct       = total > 0 ? (cur / total) * 100 : 0;
  const remaining = Math.max(0, total - cur);

  document.getElementById('clock-time').textContent   = formatTime(remaining);
  document.getElementById('time-elapsed').textContent = formatTime(cur);

  const fill  = document.getElementById('seek-fill');
  const thumb = document.getElementById('seek-thumb');
  if (fill)  fill.style.width = pct + '%';
  if (thumb) thumb.style.left = pct + '%';
}

// ── SEEK ─────────────────────────────────────────────────
document.getElementById('seek-bar').addEventListener('click', e => {
  if (!audio.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  audio.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * audio.duration;
});

// ── LOAD SONG ─────────────────────────────────────────────
async function loadSong(idx) {
  if (isFading) return;
  isFading = true;

  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '0.45';
  await delay(220);

  currentIdx = ((idx % songs.length) + songs.length) % songs.length;
  const song = songs[currentIdx];

  // Clock reset
  document.getElementById('clock-time').textContent   = '0:00';
  document.getElementById('time-elapsed').textContent = '0:00';
  document.getElementById('time-total').textContent   = song.duration !== '0:00' ? song.duration : '0:00';
  document.getElementById('seek-fill').style.width    = '0%';
  document.getElementById('seek-thumb').style.left    = '0%';

  // Marquee
  document.getElementById('marquee-track').textContent =
    `${song.artist}  —  ${song.title}  ·  ${song.album}   `;

  // Highlight row
  document.querySelectorAll('.song-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIdx);
    const numSpan = el.querySelector('.song-num > span');
    const bars    = el.querySelector('.playing-bars');
    if (numSpan) numSpan.style.display = i === currentIdx ? 'none'  : 'block';
    if (bars)    bars.style.display    = i === currentIdx ? 'flex'  : 'none';
  });

  audio.src = song.src;
  audio.load();
  try { await audio.play(); } catch (e) { /* autoplay may be blocked on first interaction */ }

  overlay.style.opacity = '0';
  isFading = false;
}

// ── NEXT / PREV / STOP ────────────────────────────────────
function nextSong() { loadSong((currentIdx + 1) % songs.length); }
function prevSong()  {
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  loadSong(currentIdx <= 0 ? songs.length - 1 : currentIdx - 1);
}

document.getElementById('btn-play').addEventListener('click', () => {
  if (currentIdx === -1) { loadSong(0); return; }
  audio.paused ? audio.play() : audio.pause();
});
document.getElementById('btn-stop').addEventListener('click', () => {
  audio.pause(); audio.currentTime = 0;
  document.body.classList.remove('playing');
  document.getElementById('clock-time').textContent   = '0:00';
  document.getElementById('time-elapsed').textContent = '0:00';
  document.getElementById('seek-fill').style.width    = '0%';
  document.getElementById('seek-thumb').style.left    = '0%';
});
document.getElementById('btn-prev').addEventListener('click', prevSong);
document.getElementById('btn-next').addEventListener('click', nextSong);

// Volume
const volInput = document.getElementById('volume');
volInput.addEventListener('input', () => {
  audio.volume = parseInt(volInput.value) / 100;
  volInput.style.background = `linear-gradient(to right, var(--amber) ${volInput.value}%, var(--muted2) ${volInput.value}%)`;
});
volInput.style.background = `linear-gradient(to right, var(--amber) 70%, var(--muted2) 70%)`;

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space')      { e.preventDefault(); document.getElementById('btn-play').click(); }
  if (e.code === 'ArrowRight') { e.preventDefault(); audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); }
  if (e.code === 'ArrowLeft')  { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 10); }
  if (e.code === 'ArrowUp')    { e.preventDefault(); nextSong(); }
  if (e.code === 'ArrowDown')  { e.preventDefault(); prevSong(); }
});

// ── BUILD CATEGORISED PLAYLIST ────────────────────────────
function buildPlaylist() {
  const wrap = document.getElementById('song-list');
  wrap.innerHTML = '';
  let globalIdx = 0;

  categories.forEach(cat => {
    // Skip empty categories
    if (cat.songs.length === 0) return;

    // Category header
    const header = document.createElement('div');
    header.className = 'genre-header';
    header.innerHTML = `
      <span class="genre-dot" style="background:${cat.color}"></span>
      <span class="genre-label" style="color:${cat.color}">${cat.label}</span>
      <span class="genre-count">${cat.songs.length} track${cat.songs.length !== 1 ? 's' : ''}</span>
    `;
    wrap.appendChild(header);

    // Tracks in this category
    cat.songs.forEach((song, localIdx) => {
      const idx = globalIdx;
      const row = document.createElement('div');
      row.className   = 'song-item';
      row.dataset.idx = idx;
      row.innerHTML   = `
        <div class="song-num">
          <span style="display:block">${localIdx + 1}</span>
          <div class="playing-bars" style="display:none">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="song-info">
          <div class="song-title">${escHtml(song.title)}</div>
          <div class="song-artist">${escHtml(song.artist)}</div>
        </div>
        <div class="song-album">${escHtml(song.album || 'The Rise')}</div>
        <div class="song-dur">${song.duration}</div>
        <button class="btn-dl" data-src="${escHtml(song.src)}" data-title="${escHtml(song.title)}" title="Download">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
      `;

      // Play on row click (not on download button)
      row.addEventListener('click', e => {
        if (e.target.closest('.btn-dl')) return;
        loadSong(idx);
      });

      // Download
      row.querySelector('.btn-dl').addEventListener('click', e => {
        e.stopPropagation();
        const btn   = e.currentTarget;
        const src   = btn.dataset.src;
        const title = btn.dataset.title;
        const a     = document.createElement('a');
        a.href     = src;
        a.download = title + '.mp3';
        a.click();
        showToast('Downloading — ' + title);
      });

      wrap.appendChild(row);
      globalIdx++;
    });
  });
}

buildPlaylist();

// ── HELPERS ───────────────────────────────────────────────
function formatTime(s) {
  if (!s || isNaN(s) || s < 0) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
