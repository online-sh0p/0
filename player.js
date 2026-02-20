// ═══════════════════════════════════════════════════════
//  WAVE — Music Player  |  YouTube IFrame API Edition
//  ─────────────────────────────────────────────────────
//  HOW TO ADD YOUR TRACKS:
//  1. Go to each video on your YouTube channel
//  2. Copy the video ID from the URL:
//     youtube.com/watch?v=  →  THIS PART  ←
//  3. Paste it into the "youtubeId" field below
// ═══════════════════════════════════════════════════════

const songs = [
  {
    title:     "My Darling Isabella (House 2026)",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "L7v1MjVW6sk",
    duration:  "3:42"
  },
  {
    title:     "You never fully dressed without a smile (House 2026)",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "dzSUrlIsDR0",
    duration:  "4:15"
  },
  {
    title:     "A deeper love (House 2026)",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "EjGmSx-l-78",
    duration:  "2:58"
  },
  {
    title:     "Heaven knows (House 2026)",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "APT84N7aZ78",
    duration:  "5:01"
  },
  {
    title:     "Mockingbird (Rap 2026)",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "5zGX5nhLm4s",
    duration:  "3:27"
  },
  {
    title:     "Horizon Code",
    artist:    "The DJs Online",
    album:     "The Rise",
    youtubeId: "REPLACE_WITH_VIDEO_ID_6",
    duration:  "4:44"
  }
];

// ── STATE ─────────────────────────────────────────────────
let currentIdx    = -1;
let ytPlayer      = null;
let isFading      = false;
let progressTimer = null;

// ── YOUTUBE IFRAME API BOOTSTRAP ──────────────────────────
window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-hidden-player', {
    height: '1',
    width:  '1',
    playerVars: {
      autoplay:       0,
      controls:       0,
      disablekb:      1,
      fs:             0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel:            0,
      playsinline:    1,
    },
    events: {
      onReady:       onPlayerReady,
      onStateChange: onPlayerStateChange,
    }
  });
};

function onPlayerReady() {
  // Player ready — waits for user interaction
}

function onPlayerStateChange(event) {
  const S = YT.PlayerState;

  if (event.data === S.PLAYING) {
    document.body.classList.add('playing');
    startProgressLoop();
  }

  if (event.data === S.PAUSED || event.data === S.BUFFERING) {
    document.body.classList.remove('playing');
    stopProgressLoop();
  }

  if (event.data === S.ENDED) {
    document.body.classList.remove('playing');
    stopProgressLoop();
    isFading = false;
    nextSong();
  }
}

// ── PROGRESS LOOP ─────────────────────────────────────────
function startProgressLoop() {
  stopProgressLoop();
  progressTimer = setInterval(updateProgress, 500);
}

function stopProgressLoop() {
  clearInterval(progressTimer);
  progressTimer = null;
}

function updateProgress() {
  if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
  const cur   = ytPlayer.getCurrentTime() || 0;
  const total = ytPlayer.getDuration()    || 0;
  const pct   = total > 0 ? (cur / total) * 100 : 0;

  document.getElementById('time-cur').textContent   = formatTime(cur);
  document.getElementById('time-total').textContent = formatTime(total);

  const fill = document.getElementById('progress-bar-fill');
  if (fill) fill.style.width = pct + '%';
}

// ── SEEK ──────────────────────────────────────────────────
document.getElementById('progress-bar').addEventListener('click', (e) => {
  if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
  const rect  = e.currentTarget.getBoundingClientRect();
  const pct   = (e.clientX - rect.left) / rect.width;
  ytPlayer.seekTo(pct * (ytPlayer.getDuration() || 0), true);
});

// ── LOAD SONG ─────────────────────────────────────────────
async function loadSong(idx) {
  if (isFading) return;
  isFading = true;

  const overlay = document.getElementById('fade-overlay');
  overlay.style.opacity = '0.55';
  await delay(280);

  currentIdx = ((idx % songs.length) + songs.length) % songs.length;
  const song = songs[currentIdx];

  document.getElementById('track-title').textContent  = song.title;
  document.getElementById('track-artist').textContent = song.artist;
  document.getElementById('time-cur').textContent     = '0:00';
  document.getElementById('time-total').textContent   = '0:00';
  const fill = document.getElementById('progress-bar-fill');
  if (fill) fill.style.width = '0%';

  document.querySelectorAll('.song-item').forEach((el, i) => {
    el.classList.toggle('active', i === currentIdx);
    el.querySelector('.song-num > span').style.display  = i === currentIdx ? 'none'  : 'block';
    el.querySelector('.playing-bars').style.display     = i === currentIdx ? 'flex'  : 'none';
  });

  if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
    ytPlayer.loadVideoById(song.youtubeId);
  }

  overlay.style.opacity = '0';
  isFading = false;
}

// ── NEXT / PREV ───────────────────────────────────────────
function nextSong() {
  loadSong((currentIdx + 1) % songs.length);
}
function prevSong() {
  loadSong(currentIdx <= 0 ? songs.length - 1 : currentIdx - 1);
}

// ── CONTROLS ──────────────────────────────────────────────
document.getElementById('btn-play').addEventListener('click', () => {
  if (!ytPlayer) return;
  if (currentIdx === -1) { loadSong(0); return; }
  const state = ytPlayer.getPlayerState ? ytPlayer.getPlayerState() : -1;
  state === YT.PlayerState.PLAYING ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
});

document.getElementById('btn-prev').addEventListener('click', prevSong);
document.getElementById('btn-next').addEventListener('click', nextSong);

const volInput = document.getElementById('volume');
volInput.addEventListener('input', () => {
  const v = parseInt(volInput.value);
  if (ytPlayer && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(v);
  volInput.style.background = `linear-gradient(to right, var(--accent) ${v}%, var(--border) ${v}%)`;
});
volInput.style.background = `linear-gradient(to right, var(--accent) 70%, var(--border) 70%)`;

// ── BUILD SONG LIST ───────────────────────────────────────
const list = document.getElementById('song-list');
songs.forEach((song, i) => {
  const row       = document.createElement('div');
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
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  return m + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
    }    cursorColor:   '#b5ff47',
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
