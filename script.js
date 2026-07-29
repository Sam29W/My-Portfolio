// 1. Layer Switcher
function switchLayer(layerId, evt) {
  // Close any modal open
  closeTelemetryModal();

  // Hide all layers
  document.querySelectorAll('.layer').forEach(layer => {
    layer.classList.remove('active');
  });

  // Deactivate all nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show target layer
  const targetLayer = document.getElementById(layerId);
  if (targetLayer) {
    targetLayer.classList.add('active');
  }

  // Highlight active nav button
  if (evt && evt.target) {
    evt.target.classList.add('active');
  }
}

// 2. Photo Upload
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatar-img').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// 3. Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.body.removeAttribute('data-theme');
    themeIcon.textContent = '⚡ DARK';
  } else {
    document.body.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️ LIGHT';
  }
});

// 4. Project Filter
function filterProjects(category, evt) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (evt && evt.target) evt.target.classList.add('active');

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// 5. Telemetry Modal Engine
let logInterval;

function openTelemetryModal(title, arch, host, speed, link, desc) {
  document.getElementById('tel-title').innerText = title;
  document.getElementById('tel-arch').innerText = arch;
  document.getElementById('tel-host').innerText = host;
  document.getElementById('tel-speed').innerText = speed;
  document.getElementById('tel-desc').innerText = desc || "System telemetry and execution parameters.";

  const linkBtn = document.getElementById('tel-link');
  if (link && link !== '#') {
    linkBtn.href = link;
    linkBtn.style.display = 'inline-block';
  } else {
    linkBtn.style.display = 'none';
  }

  const modal = document.getElementById('telemetry-modal');
  modal.classList.add('active');

  const logStream = document.getElementById('tel-log-stream');
  logStream.innerHTML = `<p>[0.00s] Initializing ${title} runtime...</p>`;
  
  const sampleLogs = [
    `[0.04s] Allocating ${arch} dependencies...`,
    `[0.12s] Binding host environment: ${host}...`,
    `[0.25s] Benchmark validated: ${speed}...`,
    `[0.38s] Status 200 OK — Telemetry stream active.`
  ];

  let step = 0;
  clearInterval(logInterval);
  logInterval = setInterval(() => {
    if (step < sampleLogs.length) {
      logStream.innerHTML += `<p>${sampleLogs[step]}</p>`;
      logStream.scrollTop = logStream.scrollHeight;
      step++;
    } else {
      clearInterval(logInterval);
    }
  }, 300);
}

function closeTelemetryModal() {
  const modal = document.getElementById('telemetry-modal');
  if (modal) modal.classList.remove('active');
  clearInterval(logInterval);
}

// 6. Particle Physics Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 50; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
// Toggle Expandable Experience Details
function toggleExperienceDetail(cardElement) {
  const isOpen = cardElement.classList.contains('open');
  const icon = cardElement.querySelector('.expand-icon');

  if (isOpen) {
    cardElement.classList.remove('open');
    if (icon) icon.textContent = '+ EXPAND';
  } else {
    cardElement.classList.add('open');
    if (icon) icon.textContent = '− COLLAPSE';
  }
}