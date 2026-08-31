const card = document.getElementById('card');
const letter = document.getElementById('letter');
const dust = document.getElementById('dust');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');

let open = false;
let playing = false;

card.addEventListener('click', reveal);

function reveal() {
  if (open) return;
  open = true;

  card.classList.add('hiding');

  setTimeout(() => {
    letter.classList.add('visible');
    letter.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-open');
    tryMusic();
    drift(14);
    setTimeout(() => drift(10), 3500);
  }, 420);
}

function drift(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const m = document.createElement('span');
      m.className = 'mote';
      m.style.left = Math.random() * 100 + 'vw';
      m.style.bottom = '-4px';
      m.style.animationDuration = (6 + Math.random() * 6) + 's';
      m.style.width = m.style.height = (1 + Math.random() * 2) + 'px';
      dust.appendChild(m);
      setTimeout(() => m.remove(), 13000);
    }, i * 120);
  }
}

function tryMusic() {
  bgMusic.volume = 0.38;
  const p = bgMusic.play();
  if (p !== undefined) {
    p.then(() => {
      playing = true;
      musicBtn.classList.add('on');
      musicIcon.textContent = '♫';
    }).catch(() => {});
  }
}

musicBtn.addEventListener('click', () => {
  if (playing) {
    bgMusic.pause();
    playing = false;
    musicBtn.classList.remove('on');
    musicIcon.textContent = '♪';
  } else {
    bgMusic.volume = 0.38;
    bgMusic.play()
      .then(() => {
        playing = true;
        musicBtn.classList.add('on');
        musicIcon.textContent = '♫';
      })
      .catch(() => {
        alert('No se encontró romantica.mp3 en la carpeta del proyecto.');
      });
  }
});

setInterval(() => {
  if (!open && Math.random() > 0.7) drift(1);
}, 1800);
