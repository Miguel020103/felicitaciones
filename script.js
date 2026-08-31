const card = document.getElementById('card');
const letter = document.getElementById('letter');
const dust = document.getElementById('dust');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
const secretTrigger = document.getElementById('secretTrigger');
const secret = document.getElementById('secret');
const secretImg = document.getElementById('secretImg');

let open = false;
let playing = false;
let secretOpen = false;

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
    drift(12);

    const parts = letter.querySelectorAll('.reveal');
    parts.forEach((el) => {
      const delay = Number(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('show'), 280 + delay * 420);
    });
  }, 420);
}

function openSecret() {
  if (!open || secretOpen) return;
  secretOpen = true;
  secretTrigger.classList.add('opened');
  secret.classList.add('show');
  secret.setAttribute('aria-hidden', 'false');
  drift(8);
}

secretTrigger.addEventListener('click', openSecret);
secretTrigger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openSecret();
  }
});

if (secretImg) {
  secretImg.addEventListener('error', () => {
    secretImg.style.display = 'none';
  });
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
