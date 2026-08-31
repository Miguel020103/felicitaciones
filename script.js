// ===================== ELEMENTOS =====================
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const petalsContainer = document.getElementById('petals');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');
const hint = document.getElementById('hint');

let isOpen = false;
let musicPlaying = false;

// ===================== APERTURA DEL SOBRE =====================
envelope.addEventListener('click', openEnvelope);

function openEnvelope() {
  if (isOpen) return;
  isOpen = true;

  // 1. Abrir la solapa
  envelope.classList.add('opening');
  if (hint) hint.style.opacity = '0';

  // 2. Mientras la solapa se abre, la carta empieza a salir del sobre
  setTimeout(() => {
    letter.classList.add('pulling');
  }, 380);

  // 3. Carta llega a posición intermedia y el sobre empieza a desaparecer
  setTimeout(() => {
    envelope.classList.add('opened');
    letter.classList.remove('pulling');
    letter.classList.add('visible');
    document.body.classList.add('letter-open');

    // Efectos
    launchCinematicEffects();
    tryPlayMusic();
  }, 1050);
}

// ===================== EFECTOS CINEMATOGRÁFICOS =====================
function launchCinematicEffects() {
  createPetalRain(40);

  const positions = [
    [10, 15], [82, 18], [48, 10],
    [90, 50], [6, 55], [70, 68],
    [22, 72], [58, 8]
  ];

  positions.forEach(([x, y], i) => {
    setTimeout(() => createBigRose(x, y), 150 + i * 200);
  });

  for (let i = 0; i < 20; i++) {
    setTimeout(() => createSparkle(), i * 110);
  }

  setTimeout(() => createPetalRain(28), 2600);
  setTimeout(() => createPetalRain(22), 5200);
}

function createPetalRain(count) {
  const petals = ['🌹', '🌸', '🌺', '💮', '🥀', '💕', '💖', '🌷', '💗'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];

      const left = Math.random() * 100;
      const size = 1.1 + Math.random() * 1.4;
      const duration = 4.2 + Math.random() * 4.5;
      const drift = (Math.random() - 0.5) * 110;

      petal.style.left = left + 'vw';
      petal.style.fontSize = size + 'rem';
      petal.style.animationDuration = duration + 's';
      petal.style.setProperty('--drift', drift + 'px');

      petalsContainer.appendChild(petal);
      setTimeout(() => petal.remove(), (duration + 0.4) * 1000);
    }, i * 65);
  }
}

function createBigRose(xPercent, yPercent) {
  const rose = document.createElement('div');
  rose.className = 'big-rose';
  rose.textContent = '🌹';
  rose.style.left = xPercent + '%';
  rose.style.top = yPercent + '%';
  rose.style.fontSize = (2.4 + Math.random() * 1.4) + 'rem';
  document.body.appendChild(rose);
  setTimeout(() => rose.remove(), 3000);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = (22 + Math.random() * 55) + 'vh';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1700);
}

// ===================== MÚSICA =====================
function tryPlayMusic() {
  bgMusic.volume = 0.45;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        musicPlaying = true;
        musicBtn.classList.add('playing');
        musicIcon.textContent = '🔊';
      })
      .catch((error) => {
        console.log('No se pudo reproducir automáticamente:', error);
      });
  }
}

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🎵';
  } else {
    bgMusic.volume = 0.45;
    bgMusic.play()
      .then(() => {
        musicPlaying = true;
        musicBtn.classList.add('playing');
        musicIcon.textContent = '🔊';
      })
      .catch(() => {
        alert(
          'No se encontró el archivo de música.\n\n' +
          'Asegúrate de tener el archivo llamado exactamente:\n' +
          'romantica.mp3\n\n' +
          'en la misma carpeta del proyecto.'
        );
      });
  }
});

// Pétalos suaves antes de abrir
setInterval(() => {
  if (!isOpen && Math.random() > 0.75) {
    createPetalRain(1);
  }
}, 1500);
