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

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.body.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '⚡ DARK';
    } else {
      document.body.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️ LIGHT';
    }
  });
}

// 4. Project Filter & Counter
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

// Quick Search Handler for Projects
function searchProjects() {
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeCategory = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
  filterProjects(activeCategory, null);
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

// 6. Interactive Neural Constellation Physics Background
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class NeuralNode {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 1.5 + 1.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw(accentColor) {
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 65; i++) {
    particles.push(new NeuralNode());
  }

  function animateConstellation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#00f0ff';

    for (let a = 0; a < particles.length; a++) {
      particles[a].update();
      particles[a].draw(accentColor);

      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          let opacity = 1 - (dist / 110);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        let mdx = particles[a].x - mouse.x;
        let mdy = particles[a].y - mouse.y;
        let mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          let opacity = 1 - (mdist / mouse.radius);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.5})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateConstellation);
  }
  animateConstellation();
}

// 7. Toggle Expandable Experience Details
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

// 8. Safe Command Palette Engine (Ctrl + K)
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
      if (document.getElementById('theme-icon')) document.getElementById('theme-icon').textContent = '⚡ DARK';
      response = `<div class="cmd-res">Switched to DARK theme.</div>`;
    } else if (rawVal === 'theme light') {
      document.body.setAttribute('data-theme', 'light');
      if (document.getElementById('theme-icon')) document.getElementById('theme-icon').textContent = '☀️ LIGHT';
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

// 9. Neural Optimizer Mini-Game Engine
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
  const lrEl = document.getElementById('lr-val');
  const drEl = document.getElementById('dr-val');
  const bsEl = document.getElementById('bs-val');

  if (lrEl) lrEl.textContent = document.getElementById('param-lr').value;
  if (drEl) drEl.textContent = document.getElementById('param-dr').value;
  if (bsEl) bsEl.textContent = document.getElementById('param-bs').value;
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

  const accDisp = document.getElementById('game-acc-display');
  const lossDisp = document.getElementById('game-loss-display');
  if (accDisp) accDisp.textContent = "ACCURACY: 00.0%";
  if (lossDisp) lossDisp.textContent = "LOSS: 1.000";
}

function runNeuralTraining() {
  if (trainInterval) clearInterval(trainInterval);

  const lr = parseFloat(document.getElementById('param-lr').value);
  const dr = parseFloat(document.getElementById('param-dr').value);
  const bs = parseInt(document.getElementById('param-bs').value);
  
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  resetGameCanvas();

  const btn = document.getElementById('train-start-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ TRAINING IN PROGRESS...";
  }

  const banner = document.getElementById('game-results');
  if (banner) {
    banner.style.color = "var(--accent)";
    banner.textContent = "TRAINING NEURAL ENGINE... OBSERVING CONVERGENCE";
  }

  let epoch = 0;
  const totalEpochs = 50;

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
    
    const noise = (Math.random() - 0.5) * (1 - progress) * 10;
    currentAcc = Math.min(99.9, Math.max(5, (progress * maxPossibleAcc) + noise));
    currentLoss = Math.max(0.01, (2.5 * (1 - progress)) + (Math.random() * 0.1));

    const accDisp = document.getElementById('game-acc-display');
    const lossDisp = document.getElementById('game-loss-display');
    if (accDisp) accDisp.textContent = `ACCURACY: ${currentAcc.toFixed(1)}%`;
    if (lossDisp) lossDisp.textContent = `LOSS: ${currentLoss.toFixed(3)}`;

    const x = (epoch / totalEpochs) * canvas.width;
    const y = canvas.height - ((currentAcc / 100) * (canvas.height - 30));
    ctx.lineTo(x, y);
    ctx.stroke();

    if (epoch >= totalEpochs) {
      clearInterval(trainInterval);
      if (btn) {
        btn.disabled = false;
        btn.textContent = "⚡ RE-RUN TRAINING";
      }

      if (banner) {
        if (currentAcc >= 98.5) {
          banner.style.color = "#00ff88";
          banner.innerHTML = `🎉 <strong>MODEL CONVERGED!</strong> Final Accuracy: <strong>${currentAcc.toFixed(1)}%</strong>. Hyperparameters Optimized!`;
        } else {
          banner.style.color = "#ff4444";
          banner.innerHTML = `⚠️ <strong>SUB-OPTIMAL ACCURACY (${currentAcc.toFixed(1)}%)</strong>. Adjust Learning Rate (~0.005) or Dropout (~0.20) & Retry!`;
        }
      }
    }
  }, 40);
}

// 10. Live Cyberpunk Clock Telemetry Engine
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
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');

    clockEl.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// 11. Futuristic Physics-Based Cursor Tracking
function initCyberCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  window.addEventListener('mousedown', () => ring.classList.add('active'));
  window.addEventListener('mouseup', () => ring.classList.remove('active'));

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

// 12. Web Audio API Synthesizer Engine (Browser-Autoplay Compliant)
let audioCtx = null;
let sfxEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function toggleSFX() {
  getAudioContext();
  sfxEnabled = !sfxEnabled;
  const icon = document.getElementById('sfx-icon');
  const btn = document.getElementById('sfx-toggle');

  if (sfxEnabled) {
    if (icon) icon.textContent = '🔊 SFX: ON';
    if (btn) btn.classList.remove('disabled');
    playSFX('success');
  } else {
    if (icon) icon.textContent = '🔇 SFX: OFF';
    if (btn) btn.classList.add('disabled');
  }
}

function playSFX(type) {
  if (!sfxEnabled) return;
  
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (e) {
    console.warn("SFX Execution blocked:", e);
  }
}

// 13. Matrix Cyber-Terminal Title & Favicon Engine
(function initTabPresenceEngine() {
  const originalTitle = document.title || "Samith Shivakumar // AI & ML Engineer";
  let titleInterval = null;

  const faviconCanvas = document.createElement('canvas');
  faviconCanvas.width = 32;
  faviconCanvas.height = 32;
  const fCtx = faviconCanvas.getContext('2d');

  function updateFavicon(color) {
    fCtx.clearRect(0, 0, 32, 32);
    fCtx.fillStyle = color;
    fCtx.beginPath();
    fCtx.arc(16, 16, 10, 0, Math.PI * 2);
    fCtx.fill();
    
    fCtx.strokeStyle = color;
    fCtx.lineWidth = 2;
    fCtx.beginPath();
    fCtx.arc(16, 16, 14, 0, Math.PI * 2);
    fCtx.stroke();

    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconCanvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  updateFavicon("#00f0ff");

  window.addEventListener('blur', () => {
    updateFavicon("#ff0055");
    let isStepOne = true;
    titleInterval = setInterval(() => {
      document.title = isStepOne 
        ? "⚠️ SYSTEM STANDBY // SAMITH-OS" 
        : "⚡ 1 UNREAD TELEMETRY LOG";
      isStepOne = !isStepOne;
    }, 1500);
  });

  window.addEventListener('focus', () => {
    if (titleInterval) clearInterval(titleInterval);
    updateFavicon("#00ff88");
    document.title = "🟢 SYSTEM ONLINE // SAMITH SHIVAKUMAR";

    setTimeout(() => {
      document.title = originalTitle;
      updateFavicon("#00f0ff");
    }, 3000);
  });
})();

// DOM Content Loaded Listener
document.addEventListener('DOMContentLoaded', () => {
  startCyberClock();
  initCyberCursor();

  window.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: true });

  const interactiveSelector = '.nav-btn, .project-card, .cta-btn, .filter-btn, .theme-btn, .contact-pill, .sfx-btn';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      playSFX('hover');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest(interactiveSelector)) {
      playSFX('click');
    }
  });
});