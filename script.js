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


// Command Palette Engine (Ctrl + K)
// Safe Command Palette Engine (Ctrl + K)
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    toggleCmdPalette();
  } else if (e.key === 'Escape') {
    closeCmdPalette();
  }
});

function toggleCmdPalette() {
  const cmdPalette = document.getElementById('cmd-palette');
  if (!cmdPalette) return;

  if (cmdPalette.classList.contains('active')) {
    closeCmdPalette();
  } else {
    openCmdPalette();
  }
}

function openCmdPalette() {
  const cmdPalette = document.getElementById('cmd-palette');
  const cmdInput = document.getElementById('cmd-input');
  if (!cmdPalette) return;

  cmdPalette.classList.add('active');
  if (cmdInput) setTimeout(() => cmdInput.focus(), 50);
}

function closeCmdPalette() {
  const cmdPalette = document.getElementById('cmd-palette');
  if (cmdPalette) cmdPalette.classList.remove('active');
}

function handleCmdInput(e) {
  if (e.key === 'Enter') {
    const cmdInput = document.getElementById('cmd-input');
    const cmdOutput = document.getElementById('cmd-output');
    if (!cmdInput || !cmdOutput) return;

    const rawVal = cmdInput.value.trim().toLowerCase();
    cmdInput.value = '';
    if (!rawVal) return;

    let response = '';

    if (rawVal === 'help') {
      response = `
        <div class="cmd-res">AVAILABLE SUBROUTINES:</div>
        • <strong>cat resume</strong> : Dumps candidate JSON telemetry<br>
        • <strong>run yolo</strong> : Simulates YOLOv8 vision pipeline<br>
        • <strong>goto [hero|experience|projects|skills|education]</strong> : Navigate system layer<br>
        • <strong>theme [dark|light]</strong> : Switch color theme<br>
        • <strong>clear</strong> : Wipe CLI buffer
      `;
    } else if (rawVal === 'cat resume') {
      response = `
        <div class="cmd-res">{
  "candidate": "Samith Shivakumar",
  "role": "AI & ML Engineer",
  "focus": ["Computer Vision", "LLM Agents", "Automation"],
  "internships": 4,
  "key_metric": "< 10% RTO Rate achieved @ Betterhood"
}</div>`;
    } else if (rawVal === 'run yolo') {
      response = `
        <div class="cmd-res">
[0.00s] Loading TensorRT YOLOv8 weights...<br>
[0.08s] Input stream initialized [1080p @ 60 FPS]<br>
[0.15s] Bounding box inference active: 2 objects detected (Person: 98%, Laptop: 95%)
        </div>`;
    } else if (rawVal.startsWith('goto ')) {
      const target = rawVal.split(' ')[1];
      const validLayers = ['hero', 'experience', 'projects', 'skills', 'education'];
      if (validLayers.includes(target)) {
        switchLayer(target);
        closeCmdPalette();
        return;
      } else {
        response = `<span style="color: #ff4444;">Error: Invalid layer '${target}'. Try 'goto projects'.</span>`;
      }
    } else if (rawVal === 'theme dark') {
      document.body.removeAttribute('data-theme');
      document.getElementById('theme-icon').textContent = '⚡ DARK';
      response = `<div class="cmd-res">Switched to DARK theme.</div>`;
    } else if (rawVal === 'theme light') {
      document.body.setAttribute('data-theme', 'light');
      document.getElementById('theme-icon').textContent = '☀️ LIGHT';
      response = `<div class="cmd-res">Switched to LIGHT theme.</div>`;
    } else if (rawVal === 'clear') {
      cmdOutput.innerHTML = '';
      return;
    } else {
      response = `<span style="color: #ff4444;">Command not recognized: '${rawVal}'. Type 'help' for commands.</span>`;
    }

    cmdOutput.innerHTML += `<div style="margin-top: 0.8rem; border-top: 1px dashed var(--border); padding-top: 0.5rem;"><strong style="color:var(--accent);">> ${rawVal}</strong><br>${response}</div>`;
    cmdOutput.scrollTop = cmdOutput.scrollHeight;
  }
}

// Neural Optimizer Mini-Game Engine
let trainInterval = null;

function openGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) {
    modal.classList.add('active');
    resetGameCanvas();
  }
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('active');
  if (trainInterval) clearInterval(trainInterval);
}

function updateGameParams() {
  document.getElementById('lr-val').textContent = document.getElementById('param-lr').value;
  document.getElementById('dr-val').textContent = document.getElementById('param-dr').value;
  document.getElementById('bs-val').textContent = document.getElementById('param-bs').value;
}

function resetGameCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  document.getElementById('game-acc-display').textContent = "ACCURACY: 00.0%";
  document.getElementById('game-loss-display').textContent = "LOSS: 1.000";
}

function runNeuralTraining() {
  if (trainInterval) clearInterval(trainInterval);

  const lr = parseFloat(document.getElementById('param-lr').value);
  const dr = parseFloat(document.getElementById('param-dr').value);
  const bs = parseInt(document.getElementById('param-bs').value);
  
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  resetGameCanvas();

  const btn = document.getElementById('train-start-btn');
  btn.disabled = true;
  btn.textContent = "⏳ TRAINING IN PROGRESS...";

  const banner = document.getElementById('game-results');
  banner.style.color = "var(--accent)";
  banner.textContent = "TRAINING NEURAL ENGINE... OBSERVING CONVERGENCE";

  let epoch = 0;
  const totalEpochs = 50;

  // Ideal Parameters: LR ~ 0.005, DR ~ 0.20, BS ~ 32
  const lrOptimal = 1 - Math.min(Math.abs(lr - 0.005) * 150, 0.9);
  const drOptimal = 1 - Math.min(Math.abs(dr - 0.20) * 1.5, 0.8);
  const bsOptimal = 1 - Math.min(Math.abs(bs - 32) / 64, 0.5);

  const maxPossibleAcc = Math.min(99.4, (lrOptimal * 40 + drOptimal * 35 + bsOptimal * 25));

  let currentAcc = 10;
  let currentLoss = 2.5;

  ctx.beginPath();
  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 2;
  ctx.moveTo(0, canvas.height - 20);

  trainInterval = setInterval(() => {
    epoch++;
    const progress = epoch / totalEpochs;
    
    // Simulate learning curve with noise
    const noise = (Math.random() - 0.5) * (1 - progress) * 10;
    currentAcc = Math.min(99.9, Math.max(5, (progress * maxPossibleAcc) + noise));
    currentLoss = Math.max(0.01, (2.5 * (1 - progress)) + (Math.random() * 0.1));

    document.getElementById('game-acc-display').textContent = `ACCURACY: ${currentAcc.toFixed(1)}%`;
    document.getElementById('game-loss-display').textContent = `LOSS: ${currentLoss.toFixed(3)}`;

    // Plot graph on canvas
    const x = (epoch / totalEpochs) * canvas.width;
    const y = canvas.height - ((currentAcc / 100) * (canvas.height - 30));
    ctx.lineTo(x, y);
    ctx.stroke();

    if (epoch >= totalEpochs) {
      clearInterval(trainInterval);
      btn.disabled = false;
      btn.textContent = "⚡ RE-RUN TRAINING";

      if (currentAcc >= 98.5) {
        banner.style.color = "#00ff88";
        banner.innerHTML = `🎉 <strong>MODEL CONVERGED!</strong> Final Accuracy: <strong>${currentAcc.toFixed(1)}%</strong>. Hyperparameters Optimized!`;
      } else {
        banner.style.color = "#ff4444";
        banner.innerHTML = `⚠️ <strong>SUB-OPTIMAL ACCURACY (${currentAcc.toFixed(1)}%)</strong>. Adjust Learning Rate (~0.005) or Dropout (~0.20) & Retry!`;
      }
    }
  }, 40);
}
// Enhanced Project Filter with Counter
function filterProjects(category, evt) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (evt && evt.target) evt.target.classList.add('active');

  const searchVal = document.getElementById('project-search-input')?.value.toLowerCase() || '';
  const cards = document.querySelectorAll('.project-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const cardText = card.innerText.toLowerCase();
    
    const matchesCategory = (category === 'all' || cardCat === category);
    const matchesSearch = cardText.includes(searchVal);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const displayCounter = document.getElementById('project-count-display');
  if (displayCounter) {
    displayCounter.textContent = `${visibleCount} ACTIVE`;
  }
}

// Quick Search Handler
function searchProjects() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
  filterProjects(activeCategory, null);
}
// Live Cyberpunk Clock Telemetry Engine
function startCyberClock() {
  const clockEl = document.getElementById('cyber-clock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12
    const hoursStr = String(hours).padStart(2, '0');

    clockEl.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// Auto-start clock when page loads
document.addEventListener('DOMContentLoaded', startCyberClock);
// Futuristic Physics-Based Cursor Tracking
function initCyberCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  // Track Mouse Position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant position for central dot
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp (linear interpolation) animation loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15; // Smooth delay speed
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Click Feedback
  window.addEventListener('mousedown', () => ring.classList.add('active'));
  window.addEventListener('mouseup', () => ring.classList.remove('active'));

  // Target-Lock Hover Detection for Buttons, Links & Cards
  const interactiveSelector = 'a, button, .project-card, .nav-btn, .contact-pill, input, textarea, .avatar-container';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('hovered');
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initCyberCursor);