// ── SONG DATA ─────────────────────────────────────────────
// Managed via admin.html → saved to localStorage under this key
const STORAGE_KEY = 'wave_songs';

function getSongs() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length > 0) return stored;
  } catch (_) {}
  return [];
}

const songs = getSongs();

// ── STATE ─────────────────────────────────────────────────
let currentIdx = -1;
let wavesurfer  = null;
let isFading    = false;

// ── EMPTY STATE ───────────────────────────────────────────
if (songs.length === 0) {
  document.getElementById('track-title').textContent  = 'No tracks loaded';
  document.getElementById('track-artist').textContent = 'Open admin.html to add music →';
}

// ── WAVESURFER INIT (v7 API) ──────────────────────────────
function initWaveSurfer() {
  if (wavesurfer) {
    wavesurfer.destroy();
    wavesurfer = null;
  }

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
    interact:      true,
  });

  // v7: 'ready' fires after decode, use 'decode' or 'ready'
  wavesurfer.on('ready', () => {
    document.getElementById('time-total').textContent = formatTime(wavesurfer.getDuration());
    wavesurfer.play();
  });

  // v7: 'audioprocess' renamed to 'timeupdate'
  wavesurfer.on('timeupdate', (currentTime) => {
    document.getElementById('time-cur').textContent = formatTime(currentTime);
  });

  wavesurfer.on('play',   () => document.body.classList.add('playing'));
  wavesurfer.on('pause',  () => document.body.classList.remove('playing'));
  wavesurfer.on('finish', () => nextSong());

  wavesurfer.on('error', (err) => {
    console.error('WaveSurfer error:', err);
    showToast('Could not load audio — check the file is in your repo');
    document.body.classList.remove('playing');
  });

  // Apply current volume
  const vol = parseInt(document.getElementById('volume').value) / 100;
  wavesurfer.setVolume(vol);
}

// ── LOAD SONG ─────────────────────────────────────────────
async function loadSong(idx) {
  if (isFading || songs.length === 0) return;
  isFading = true;

  // Fade overlay in
  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '0.55';
  await delay(280);

  currentIdx = ((idx % songs.length) + songs.length) % songs.length;
  const song = songs[currentIdx];

  // Album art crossfade
  const art = document.getElementById('album-art');
  art.style.opacity = '0';
  setTimeout(() => {
    if (song.cover) {
      art.src    = song.cover;
      art.onload = () => { art.style.opacity = '1'; };
      art.onerror = () => { art.style.opacity = '1'; };
    } else {
      art.src           = '';
      art.style.opacity = '1';
    }
  }, 100);

  // Track info
  document.getElementById('track-title').textContent  = song.title;
  document.getElementById('track-artist').textContent = song.artist + (song.album ? ' — ' + song.album : '');

  // Highlight active row
  document.querySelectorAll('.song-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIdx);
    el.querySelector('.song-num > span').style.display = i === currentIdx ? 'none'  : 'block';
    el.querySelector('.playing-bars').style.display    = i === currentIdx ? 'flex'  : 'none';
  });

  // Init WaveSurfer and load
  initWaveSurfer();
  wavesurfer.load(song.src);

  // Fade overlay out
  overlay.style.opacity = '0';
  isFading = false;
}

// ── NEXT / PREV ───────────────────────────────────────────
function nextSong() {
  if (!songs.length) return;
  loadSong((currentIdx + 1) % songs.length);
}

function prevSong() {
  if (!songs.length) return;
  loadSong(currentIdx <= 0 ? songs.length - 1 : currentIdx - 1);
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

// Volume
const volInput = document.getElementById('volume');
volInput.addEventListener('input', () => {
  const v = parseInt(volInput.value) / 100;
  if (wavesurfer) wavesurfer.setVolume(v);
  volInput.style.background =
    `linear-gradient(to right, var(--accent) ${volInput.value}%, var(--border) ${volInput.value}%)`;
});
volInput.style.background = `linear-gradient(to right, var(--accent) 70%, var(--border) 70%)`;

// Download
document.getElementById('btn-download').addEventListener('click', () => {
  if (currentIdx === -1) { showToast('No track loaded.'); return; }
  const song = songs[currentIdx];
  const a = document.createElement('a');
  a.href     = song.src;
  a.download = song.title + '.mp3';
  a.click();
  showToast('Download started — ' + song.title);
});

// ── BUILD SONG LIST ───────────────────────────────────────
const list = document.getElementById('song-list');

if (songs.length === 0) {
  list.innerHTML = `
    <div style="padding:60px 28px;text-align:center;font-family:var(--font-mono);
                font-size:.75rem;color:var(--muted);line-height:2;">
      No tracks in library.<br>
      <a href="admin.html" style="color:var(--accent);text-decoration:none;">
        Open admin.html →
      </a> to add your music.
    </div>`;
} else {
  songs.forEach((song, i) => {
    const row = document.createElement('div');
    row.className   = 'song-item';
    row.dataset.idx = i;
    row.innerHTML = `
      <div class="song-num">
        <span style="display:block">${i + 1}</span>
        <div class="playing-bars" style="display:none">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="song-info">
        <div class="song-title">${escHtml(song.title)}</div>
        <div class="song-artist">${escHtml(song.artist)}</div>
      </div>
      <div class="song-album">${escHtml(song.album || '')}</div>
      <div class="song-dur">${escHtml(song.duration || '—')}</div>
    `;
    row.addEventListener('click', () => loadSong(i));
    list.appendChild(row);
  });
}

// ── HELPERS ───────────────────────────────────────────────
function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
                }
