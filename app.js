// Animation State Management
let currentScene = 1;
let isAnimating = false;
const totalScenes = 14;
let bgMusic = null;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  bgMusic = document.getElementById('bgMusic');
  
  // Show music prompt
  Swal.fire({
    title: '🎉 Birthday Celebration! 🎉',
    text: 'Would you like to play music?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, play music! 🎵',
    cancelButtonText: 'No, thanks',
    confirmButtonColor: '#FF1493',
    cancelButtonColor: '#9C27B0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    backdrop: `
      rgba(0,0,0,0.8)
      left top
      no-repeat
    `
  }).then((result) => {
    if (result.isConfirmed) {
      bgMusic.play().catch(e => console.log('Audio play failed:', e));
    }
    startExperience();
  });
  
  // Initialize background effects
  createParticles();
  createStars();
  createFloatingHearts();
  
  // Initialize cursor trail
  initCursorTrail();
  
  // Add replay button listener
  document.getElementById('replayButton').addEventListener('click', replayExperience);
}

function startExperience() {
  // Start the scene sequence
  currentScene = 1;
  showScene(1);
  
  // Scene timing sequence
  setTimeout(() => transitionToScene(2), 3500);
  setTimeout(() => {
    transitionToScene(3);
    setTimeout(() => startTypingAnimation(), 500);
  }, 6500);
}

function continueAfterMessage() {
  setTimeout(() => transitionToScene(4), 2500);
  setTimeout(() => transitionToScene(5), 5000);
  setTimeout(() => transitionToScene(6), 7500);
  setTimeout(() => {
    transitionToScene(7);
    createSparkles();
  }, 10000);
  setTimeout(() => transitionToScene(8), 12500);
  setTimeout(() => {
    transitionToScene(9);
    createSpecialHearts();
  }, 15000);
  setTimeout(() => transitionToScene(10), 17500);
  setTimeout(() => {
    transitionToScene(11);
    setTimeout(() => createConfetti('confettiBurst1'), 300);
  }, 20500);
  setTimeout(() => {
    transitionToScene(12);
    createConfetti('confettiBurst2');
    initFireworks();
  }, 23500);
  setTimeout(() => transitionToScene(13), 29000);
  setTimeout(() => transitionToScene(14), 31500);
}

function showScene(sceneNumber) {
  const scene = document.getElementById(`scene${sceneNumber}`);
  if (scene) {
    scene.classList.add('active');
  }
}

function hideScene(sceneNumber) {
  const scene = document.getElementById(`scene${sceneNumber}`);
  if (scene) {
    scene.classList.remove('active');
  }
}

function transitionToScene(sceneNumber) {
  if (isAnimating) return;
  isAnimating = true;
  
  hideScene(currentScene);
  currentScene = sceneNumber;
  
  setTimeout(() => {
    showScene(sceneNumber);
    isAnimating = false;
  }, 1000);
}

// Typing Animation for Chat Message
function startTypingAnimation() {
  const message = "Hey Srinidhi 🎉 Happy Birthday to the most amazing friend anyone could ask for! I can't believe another year has flown by, and here we are celebrating you. You've been such an incredible friend, and I'm so grateful to have you in my life. You're one of those rare people who can make anyone laugh even on their worst days. Your kindness and the way you always know exactly what to say when I need it most – that's what makes you so special. every moment with you is genuinely fun. Thank you for being the friend who listens without judgment, gives the best advice. I hope this new year brings you everything you've been dreaming of and more. You deserve all the happiness, success, and adventures life has to offer. Can't wait to create more amazing memories together! Have the most fantastic birthday ever! 🎂✨";
  
  const typedMessage = document.getElementById('typedMessage');
  const typingIndicator = document.getElementById('typingIndicator');
  const chatStatus = document.querySelector('.chat-status');
  
  let charIndex = 0;
  const typingSpeed = 30;
  
  function typeCharacter() {
    if (charIndex < message.length) {
      typedMessage.textContent += message.charAt(charIndex);
      charIndex++;
      setTimeout(typeCharacter, typingSpeed);
    } else {
      typingIndicator.style.display = 'none';
      chatStatus.textContent = 'online';
      continueAfterMessage();
    }
  }
  
  typeCharacter();
}

// Particle System
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

// Stars Background
function createStars() {
  const container = document.getElementById('stars');
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(star);
  }
}

// Floating Hearts Background
function createFloatingHearts() {
  const container = document.getElementById('hearts');
  const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
  }, 2000);
}

// Sparkles for Special Word
function createSparkles() {
  const container = document.getElementById('sparklesContainer');
  const sparkleCount = 30;
  
  for (let i = 0; i < sparkleCount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${20 + Math.random() * 60}%`;
      sparkle.style.top = `${20 + Math.random() * 60}%`;
      sparkle.style.animationDelay = `${Math.random() * 1}s`;
      container.appendChild(sparkle);
    }, i * 50);
  }
}

// Special Hearts for "You are Special"
function createSpecialHearts() {
  const container = document.getElementById('floatingHeartsSpecial');
  const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝', '🌟', '✨'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart-special';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = `${10 + Math.random() * 80}%`;
      heart.style.bottom = '0';
      heart.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(heart);
    }, i * 200);
  }
}

// Confetti System
function createConfetti(containerId) {
  const container = document.getElementById(containerId);
  const colors = ['#FF1493', '#FFD700', '#9C27B0', '#00BCD4', '#FF6B9D', '#C471F5'];
  const shapes = ['circle', 'square', 'triangle'];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 8 + Math.random() * 8;
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = `${size/2}px solid transparent`;
        confetti.style.borderRight = `${size/2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid ${color}`;
      }
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 300;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity - 200;
      
      confetti.style.setProperty('--x', `${x}px`);
      confetti.style.setProperty('--y', `${y}px`);
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 10);
  }
}

// Fireworks System
function initFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#FF1493', '#FFD700', '#9C27B0', '#00BCD4', '#FF6B9D', '#C471F5'];
  
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8
      };
      this.alpha = 1;
      this.decay = 0.015;
    }
    
    update() {
      this.velocity.y += 0.1;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(x, y, color));
    }
  }
  
  function animate() {
    ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        particle.update();
        particle.draw();
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  // Create fireworks at intervals
  const fireworkInterval = setInterval(() => {
    createFirework();
  }, 400);
  
  // Stop after 5 seconds
  setTimeout(() => {
    clearInterval(fireworkInterval);
  }, 5000);
  
  animate();
}

// Cursor Trail Effect
function initCursorTrail() {
  const canvas = document.getElementById('cursorCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const maxParticles = 50;
  
  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.alpha = 1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.02;
      this.size -= 0.05;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#FFD700';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFD700';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    for (let i = 0; i < 3; i++) {
      particles.push(new TrailParticle(x, y));
    }
    
    if (particles.length > maxParticles) {
      particles.splice(0, particles.length - maxParticles);
    }
  });
  
  function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
      if (particle.alpha <= 0 || particle.size <= 0) {
        particles.splice(index, 1);
      } else {
        particle.update();
        particle.draw();
      }
    });
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Replay Experience
function replayExperience() {
  // Reset all scenes
  for (let i = 1; i <= totalScenes; i++) {
    hideScene(i);
  }
  
  // Clear confetti containers
  document.getElementById('confettiBurst1').innerHTML = '';
  document.getElementById('confettiBurst2').innerHTML = '';
  document.getElementById('sparklesContainer').innerHTML = '';
  document.getElementById('floatingHeartsSpecial').innerHTML = '';
  
  // Reset typed message
  document.getElementById('typedMessage').textContent = '';
  document.getElementById('typingIndicator').style.display = 'flex';
  document.querySelector('.chat-status').textContent = 'typing...';
  
  // Clear fireworks canvas
  const fireworksCanvas = document.getElementById('fireworksCanvas');
  const ctx = fireworksCanvas.getContext('2d');
  ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  
  // Restart experience
  startExperience();
  
  // Restart music if it was playing
  if (bgMusic && !bgMusic.paused) {
    bgMusic.currentTime = 0;
    bgMusic.play();
  }
}

// Handle window resize for canvases
window.addEventListener('resize', () => {
  const fireworksCanvas = document.getElementById('fireworksCanvas');
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
});