const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const petalsEl = document.getElementById('petals');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
const hint = document.getElementById('hint');

let opened = false;
let playing = false;

envelope.addEventListener('click', open);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    open();
  }
});

function open() {
  if (opened) return;
  opened = true;

  envelope.classList.add('opening');
  if (hint) hint.style.opacity = '0';

  setTimeout(() => {
    letter.classList.add('rising');
    letter.setAttribute('aria-hidden', 'false');
  }, 480);

  setTimeout(() => {
    envelope.classList.add('opened');
    letter.classList.remove('rising');
    letter.classList.add('shown');
    document.body.classList.add('is-open');

    softPetals(18);
    tryMusic();

    setTimeout(() => softPetals(12), 3200);
    setTimeout(() => softPetals(8), 6500);
  }, 1180);
}

function softPetals(count) {
  const glyphs = ['❀', '✿', '❁', '·', '˚'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'petal';
      el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (0.7 + Math.random() * 0.9) + 'rem';
      el.style.animationDuration = (5 + Math.random() * 5) + 's';
      el.style.setProperty('--x', ((Math.random() - 0.5) * 90) + 'px');
      el.style.color = Math.random() > 0.5 ? 'rgba(200,120,140,0.7)' : 'rgba(220,180,160,0.55)';
      petalsEl.appendChild(el);
      setTimeout(() => el.remove(), 11000);
    }, i * 90);
  }
}

function tryMusic() {
  bgMusic.volume = 0.4;
  const p = bgMusic.play();
  if (p !== undefined) {
    p.then(() => {
      playing = true;
      musicBtn.classList.add('is-playing');
      musicIcon.textContent = '♫';
    }).catch(() => {});
  }
}

musicBtn.addEventListener('click', () => {
  if (playing) {
    bgMusic.pause();
    playing = false;
    musicBtn.classList.remove('is-playing');
    musicIcon.textContent = '♪';
  } else {
    bgMusic.volume = 0.4;
    bgMusic.play()
      .then(() => {
        playing = true;
        musicBtn.classList.add('is-playing');
        musicIcon.textContent = '♫';
      })
      .catch(() => {
        alert('No se encontró romantica.mp3 en la carpeta del proyecto.');
      });
  }
});

setInterval(() => {
  if (!opened && Math.random() > 0.85) softPetals(1);
}, 2200);
