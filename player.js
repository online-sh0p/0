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
}
