// ── SONG DATA ────────────────────────────────────────────
// Replace src/cover/artist/album with your real files.
// Using placeholder cover art from picsum for demo visuals.
const songs = [
  {
    title:    "My Darling Isabella (House-2026)",
    artist:   "Dj online",
    album:    "The Rise",
    src:      "My-Darling-Isabella-(House-2026).mp3",
    cover:    "DJPortrait.png",
    duration: "2:43"
  },
  {
    title:    "You never fully dressed without a smile (House 2026)",
    artist:   "Dj online",
    album:    "The Rise",
    src:      "You-never-fully-dressed-without-a-smile-(House-2026).mp3",
    cover:    "DJPortrait.png",
    duration: "2:57"
  },
  {
    title:    "Static Rain",
    artist:   "The Void Signal",
    album:    "Frequencies",
    src:      "song3.mp3",
    cover:    "https://picsum.photos/seed/static/200/200",
    duration: "2:58"
  },
  {
    title:    "Deep Circuit",
    artist:   "Neural Wave",
    album:    "City Lights",
    src:      "song4.mp3",
    cover:    "https://picsum.photos/seed/deepcircuit/200/200",
    duration: "5:01"
  },
  {
    title:    "Glass Mirror",
    artist:   "Lo-Fi Collective",
    album:    "Reflect",
    src:      "song5.mp3",
    cover:    "https://picsum.photos/seed/glassmirror/200/200",
    duration: "3:27"
  },
  {
    title:    "Horizon Code",
    artist:   "Synthwave Archive",
    album:    "Frequencies",
    src:      "song6.mp3",
    cover:    "https://picsum.photos/seed/horizon/200/200",
    duration: "4:44"
  }
];

// ── STATE ─────────────────────────────────────────────────
let currentIdx = -1;
let wavesurfer  = null;
let isFading    = false;

// ── WAVESURFER INIT ───────────────────────────────────────
function initWaveSurfer() {
  if (wavesurfer) { wavesurfer.destroy(); }

  wavesurfer = WaveSurfer.create({
    container:     '#waveform',
    waveColor:     '#2a2a2a',
    progressColor: '#b5ff47',
    cursorColor:   '#b5ff47',
    cursorWidth:   2,
    barWidth:      2,
    barGap:        2,
    barRadius:     2,
    height:        50,
    normalize:     true,
    backend:       'WebAudio',
    interact:      true,
    hideScrollbar: true,
  });

  wavesurfer.on('ready', () => {
    const total = wavesurfer.getDuration();
    document.getElementById('time-total').textContent = formatTime(total);
    wavesurfer.play();
  });

  wavesurfer.on('audioprocess', () => {
    document.getElementById('time-cur').textContent = formatTime(wavesurfer.getCurrentTime());
  });

  wavesurfer.on('play',   () => { document.body.classList.add('playing'); });
  wavesurfer.on('pause',  () => { document.body.classList.remove('playing'); });
  wavesurfer.on('finish', () => { nextSong(); });

  // Apply current volume
  const vol = parseInt(document.getElementById('volume').value) / 100;
  wavesurfer.setVolume(vol);
}

// ── LOAD SONG ─────────────────────────────────────────────
async function loadSong(idx) {
  if (isFading) return;
  isFading = true;

  // Fade out overlay
  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '0.55';
  await delay(300);

  currentIdx = ((idx % songs.length) + songs.length) % songs.length;
  const song = songs[currentIdx];

  // Update album art with crossfade
  const art = document.getElementById('album-art');
  art.style.opacity = '0';
  setTimeout(() => {
    art.src = song.cover;
    art.onload = () => { art.style.opacity = '1'; };
  }, 100);

  // Update track info
  document.getElementById('track-title').textContent  = song.title;
  document.getElementById('track-artist').textContent = song.artist;

  // Highlight active row + toggle animated bars
  document.querySelectorAll('.song-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIdx);
    const numEl  = el.querySelector('.song-num > span');
    const barsEl = el.querySelector('.playing-bars');
    numEl.style.display  = i === currentIdx ? 'none' : 'block';
    barsEl.style.display = i === currentIdx ? 'flex'  : 'none';
  });

  // Init WaveSurfer and load audio
  initWaveSurfer();
  wavesurfer.load(song.src);

  // Fade in
  overlay.style.opacity = '0';
  isFading = false;
}

// ── NEXT / PREV ───────────────────────────────────────────
function nextSong() {
  loadSong((currentIdx + 1) % songs.length);
}

function prevSong() {
  const target = currentIdx <= 0 ? songs.length - 1 : currentIdx - 1;
  loadSong(target);
}

// ── CONTROL BINDINGS ──────────────────────────────────────
document.getElementById('btn-play').addEventListener('click', () => {
  if (!wavesurfer) {
    if (songs.length) loadSong(0);
    return;
  }
  wavesurfer.playPause();
});

document.getElementById('btn-prev').addEventListener('click', prevSong);
document.getElementById('btn-next').addEventListener('click', nextSong);

// Volume slider with live gradient fill
const volInput = document.getElementById('volume');
volInput.addEventListener('input', () => {
  const v = parseInt(volInput.value) / 100;
  if (wavesurfer) wavesurfer.setVolume(v);
  volInput.style.background = `linear-gradient(to right, var(--accent) ${volInput.value}%, var(--border) ${volInput.value}%)`;
});
// Set initial gradient
volInput.style.background = `linear-gradient(to right, var(--accent) 70%, var(--border) 70%)`;

// Download current track
document.getElementById('btn-download').addEventListener('click', () => {
  if (currentIdx === -1) { showToast('No track loaded.'); return; }
  const song = songs[currentIdx];
  const link = document.createElement('a');
  link.href     = song.src;
  link.download = song.title + '.mp3';
  link.click();
  showToast('Download started — ' + song.title);
});

// ── BUILD SONG LIST ───────────────────────────────────────
const list = document.getElementById('song-list');
songs.forEach((song, i) => {
  const row = document.createElement('div');
  row.className   = 'song-item';
  row.dataset.idx = i;
  row.innerHTML   = `
    <div class="song-num">
      <span style="display:block">${i + 1}</span>
      <div class="playing-bars" style="display:none">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="song-info">
      <div class="song-title">${song.title}</div>
      <div class="song-artist">${song.artist}</div>
    </div>
    <div class="song-album">${song.album}</div>
    <div class="song-dur">${song.duration}</div>
  `;
  row.addEventListener('click', () => loadSong(i));
  list.appendChild(row);
});

// ── HELPERS ───────────────────────────────────────────────
function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
