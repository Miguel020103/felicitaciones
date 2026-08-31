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

  // Abrir solapa
  envelope.classList.add('opened');
  if (hint) hint.style.opacity = '0';

  // Después de la animación de la solapa, mostrar la carta
  setTimeout(() => {
    // Subir y desvanecer el sobre
    envelope.style.transition = 'all 0.9s ease';
    envelope.style.transform = 'translateY(40px) scale(0.85)';
    envelope.style.opacity = '0';

    // Mostrar carta
    letter.classList.add('visible');

    // Efectos cinematográficos
    launchCinematicEffects();

    // Música automática
    tryPlayMusic();
  }, 950);
}

// ===================== EFECTOS CINEMATOGRÁFICOS =====================
function launchCinematicEffects() {
  // Primera lluvia de pétalos
  createPetalRain(50);

  // Rosas grandes en diferentes posiciones
  const positions = [
    [12, 18], [78, 22], [45, 12],
    [88, 55], [8, 60], [65, 70],
    [25, 75], [55, 8]
  ];

  positions.forEach(([x, y], i) => {
    setTimeout(() => createBigRose(x, y), 180 + i * 220);
  });

  // Brillos
  for (let i = 0; i < 25; i++) {
    setTimeout(() => createSparkle(), i * 120);
  }

  // Más pétalos a lo largo del tiempo
  setTimeout(() => createPetalRain(35), 2800);
  setTimeout(() => createPetalRain(30), 5500);
  setTimeout(() => createPetalRain(20), 8500);
}

function createPetalRain(count) {
  const petals = ['🌹', '🌸', '🌺', '💮', '🥀', '💕', '💖', '🌷', '💗'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];

      const left = Math.random() * 100;
      const size = 1.15 + Math.random() * 1.5;
      const duration = 4.5 + Math.random() * 5;
      const drift = (Math.random() - 0.5) * 120;

      petal.style.left = left + 'vw';
      petal.style.fontSize = size + 'rem';
      petal.style.animationDuration = duration + 's';
      petal.style.setProperty('--drift', drift + 'px');

      petalsContainer.appendChild(petal);

      // Limpiar
      setTimeout(() => petal.remove(), (duration + 0.5) * 1000);
    }, i * 70);
  }
}

function createBigRose(xPercent, yPercent) {
  const rose = document.createElement('div');
  rose.className = 'big-rose';
  rose.textContent = '🌹';
  rose.style.left = xPercent + '%';
  rose.style.top = yPercent + '%';
  rose.style.fontSize = (2.6 + Math.random() * 1.6) + 'rem';
  document.body.appendChild(rose);

  setTimeout(() => rose.remove(), 3200);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = (25 + Math.random() * 55) + 'vh';
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1800);
}

// ===================== MÚSICA =====================
function tryPlayMusic() {
  bgMusic.volume = 0.45; // Volumen suave (cámbialo si quieres más alto o más bajo)

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

// Botón solo para pausar / reanudar
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

// ===================== PÉTALOS SUAVES ANTES DE ABRIR =====================
setInterval(() => {
  if (!isOpen && Math.random() > 0.72) {
    createPetalRain(1);
  }
}, 1400);

// Evitar que el scroll del body interfiera en móviles
document.body.addEventListener('touchmove', (e) => {
  if (isOpen) return;
}, { passive: true });