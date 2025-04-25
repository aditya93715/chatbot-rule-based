const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
  resize();
  createStars(150);
  animate();
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', () => {
  resize();
});

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.5 + 0.2;
    this.speed = (this.size * 0.3) + 0.1;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.direction = Math.random() < 0.5 ? 1 : -1;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;

    this.alpha += this.twinkleSpeed * this.direction;
    if (this.alpha >= 1 || this.alpha <= 0.2) {
      this.twinkleSpeed = -this.twinkleSpeed;
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 8;
    ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

init();
