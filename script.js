// Rolagem super lenta
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 1500; // mais lento
    let startTime = null;

    function animateScroll(timestamp){
      if(!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      window.scrollTo(0, start + distance * percent);
      if(progress < duration) requestAnimationFrame(animateScroll);
    }
    requestAnimationFrame(animateScroll);
  });
});

// Reveal ao rolar
const reveals = document.querySelectorAll('.reveal, .card');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.2});
reveals.forEach(el=>observer.observe(el));

// Cursor personalizado
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e=>{
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Partículas simples
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2+1;
    this.speedX = (Math.random()-0.5)/2;
    this.speedY = (Math.random()-0.5)/2;
  }
  update(){this.x+=this.speedX; this.y+=this.speedY; if(this.x>canvas.width)this.x=0;if(this.x<0)this.x=canvas.width;if(this.y>canvas.height)this.y=0;if(this.y<0)this.y=canvas.height;}
  draw(){ctx.fillStyle='rgba(255,208,0,0.7)';ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}
}
function init(){particlesArray=[];for(let i=0;i<100;i++){particlesArray.push(new Particle());}}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
init();animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;init();});