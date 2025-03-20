const canvas = document.getElementById('visualCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// كلاس لعمل القلوب المتحركة
class Heart {
  constructor(x, y, size, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.alpha = 1;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.alpha -= 0.005;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff1493";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y - this.size, this.x - this.size * 1.5, this.y + this.size / 2, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x + this.size * 1.5, this.y + this.size / 2, this.x + this.size, this.y - this.size, this.x, this.y);
    ctx.fill();
    ctx.restore();
  }
}

const hearts = [];

function createHeart(x, y) {
  for (let i = 0; i < 10; i++) {
    const size = Math.random() * 10 + 5;
    const velocityX = (Math.random() - 0.5) * 2;
    const velocityY = Math.random() * -3 - 1;
    hearts.push(new Heart(x, y, size, velocityX, velocityY));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(255, 204, 204, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// إطلاق القلوب عند النقر
canvas.addEventListener('click', (event) => {
  createHeart(event.clientX, event.clientY);
});

// إنشاء قلوب عشوائية كل ثانية
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  createHeart(x, y);
}, 1000);

animate();
