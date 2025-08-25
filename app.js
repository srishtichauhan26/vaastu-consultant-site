// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved==='light'){ root.classList.add('light'); }
  themeToggle.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

// Header year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop){
  window.addEventListener('scroll', ()=>{
    backToTop.style.display = window.scrollY > 300 ? 'inline-block' : 'none';
  });
}

// Nav toggle
function toggleNav(){
  const m = document.getElementById('navMenu');
  if (!m) return;
  const isOpen = getComputedStyle(m).display !== 'none';
  m.style.display = isOpen ? 'none' : 'flex';
}
window.toggleNav = toggleNav;

// Simple carousel
const slides = document.querySelectorAll('.slide');
const dots = document.getElementById('dots');
if (slides.length && dots){
  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>go(i));
    dots.appendChild(b);
  });
  function go(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
    Array.from(dots.children).forEach((d,idx)=>d.classList.toggle('active', idx===i));
  }
  go(0);
  let cur = 0;
  setInterval(()=>{cur=(cur+1)%slides.length;go(cur);}, 5000);
}

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('show');
  });
},{threshold:.1});
document.querySelectorAll('.reveal, .reveal-delay').forEach(el=>observer.observe(el));

// Contact form (dummy)
function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');
  status.textContent = 'Submitting...';
  setTimeout(()=>{
    status.textContent = 'Thank you! We will get back within 24 hours.';
    form.reset();
  }, 800);
  return false;
}
window.handleSubmit = handleSubmit;

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav a:not(.cta)');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
});
