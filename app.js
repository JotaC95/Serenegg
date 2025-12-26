// Año footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú mobile
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ===== Cursor Fun ===== */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
const cow = document.getElementById("cursorCow");
const hero = document.getElementById("hero");

let mx = window.innerWidth / 2, my = window.innerHeight / 2;  // mouse
let rx = mx, ry = my; // ring lerp
let cx = mx, cy = my; // mascot lerp

let lastSpark = 0;
let lastMoveT = performance.now();
let lastX = mx, lastY = my;
let speed = 999; // px/s aprox

// Pollitos control
let heroHover = false;
let lastChickT = 0;

const baseEmoji = "🐄";
let activeEmoji = baseEmoji;

function lerp(a, b, t){ return a + (b - a) * t; }

window.addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;

  // Dot sigue inmediato
  if (dot) dot.style.transform = `translate(-50%, -50%) translate(${mx}px, ${my}px)`;

  // Trail: cada ~35ms suelta una chispa
  const now = performance.now();
  if (now - lastSpark > 35){
    lastSpark = now;
    spawnSpark(mx, my);
  }

  // Calcular velocidad (para pollitos)
  const dt = Math.max(8, now - lastMoveT);
  const dx = mx - lastX;
  const dy = my - lastY;
  const dist = Math.sqrt(dx*dx + dy*dy);
  speed = (dist / dt) * 1000; // px/s

  lastMoveT = now;
  lastX = mx;
  lastY = my;

  // Si está en hero y mueve lento => pollitos
  if (heroHover){
    const slow = speed < 220;             // umbral “caricia”
    const cooldownOk = (now - lastChickT) > 160; // no spamear
    if (slow && cooldownOk){
      lastChickT = now;
      spawnChick(mx, my);
    }
  }
});

// Detectar si el cursor está sobre HERO
hero?.addEventListener("mouseenter", () => { heroHover = true; });
hero?.addEventListener("mouseleave", () => { heroHover = false; });

// Click: huevo cae y se “rompe”
window.addEventListener("click", (e) => {
  spawnEgg(e.clientX, e.clientY);
});

// Upgrade 1: cambiar emoji del “cursor-cow” según zona/elemento
document.addEventListener("mouseover", (e) => {
  const target = e.target;

  const withEmoji = target.closest("[data-cursor]");
  if (withEmoji?.dataset?.cursor){
    setCursorEmoji(withEmoji.dataset.cursor);
    growCursor(true);
    return;
  }

  if (target.closest("#productos")) { setCursorEmoji("🥛"); growCursor(true); return; }
  if (target.closest("#contacto"))  { setCursorEmoji("💬"); growCursor(true); return; }

  if (target.closest("a, button, .btn, input, textarea, select")) {
    growCursor(true);
    return;
  }
});

document.addEventListener("mouseout", (e) => {
  const target = e.target;

  if (target.closest("a, button, .btn, input, textarea, select, [data-cursor], #productos, #contacto")) {
    growCursor(false);

    // Evaluar qué sección está debajo
    const el = document.elementFromPoint(mx, my);
    if (el?.closest("[data-cursor]")?.dataset?.cursor){
      setCursorEmoji(el.closest("[data-cursor]").dataset.cursor);
    } else if (el?.closest("#productos")) {
      setCursorEmoji("🥛");
    } else if (el?.closest("#contacto")) {
      setCursorEmoji("💬");
    } else {
      setCursorEmoji(baseEmoji);
    }
  }
});

function setCursorEmoji(emoji){
  if (!cow) return;
  if (activeEmoji === emoji) return;
  activeEmoji = emoji;
  cow.textContent = emoji;
}

function growCursor(on){
  if (!ring || !cow) return;
  if (on){
    ring.style.width = "56px";
    ring.style.height = "56px";
    cow.style.fontSize = "30px";
  } else {
    ring.style.width = "42px";
    ring.style.height = "42px";
    cow.style.fontSize = "26px";
  }
}

function spawnSpark(x, y){
  const s = document.createElement("div");
  s.className = "cursor-spark";
  s.style.left = x + "px";
  s.style.top = y + "px";
  const dx = (Math.random() - 0.5) * 18;
  const dy = (Math.random() - 0.5) * 18;
  s.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 600);
}

function spawnEgg(x, y){
  const egg = document.createElement("div");
  egg.className = "cursor-egg";
  egg.textContent = "🥚";
  egg.style.left = x + "px";
  egg.style.top = y + "px";
  document.body.appendChild(egg);

  setTimeout(() => {
    const crack = document.createElement("div");
    crack.className = "cursor-crack";
    crack.textContent = "✨";
    crack.style.left = x + "px";
    crack.style.top = (y + 18) + "px";
    document.body.appendChild(crack);
    setTimeout(() => crack.remove(), 600);
  }, 520);

  setTimeout(() => egg.remove(), 800);
}

// Upgrade 2 (mejorado): pollitos más lejos del cursor y con separación según velocidad
function spawnChick(x, y){
  const chick = document.createElement("div");
  chick.className = "cursor-chick";
  chick.textContent = "🐥";

  chick.style.left = x + "px";
  chick.style.top = y + "px";
  document.body.appendChild(chick);

  const start = performance.now();
  const lifetime = 1000;

  // Distancia base más grande
  const baseRadius = 85;

  // Si el usuario se mueve rápido, se separa aún más (limitado)
  const speedBoost = Math.min(110, speed * 0.12);

  // Abanico: ángulo hacia abajo-lados para no tapar el contenido
  const angle = (Math.random() * 1.6 + 0.8); // ~0.8..2.4 rad

  const radius = baseRadius + speedBoost + (Math.random() * 30);

  const offsetX = Math.cos(angle) * radius;
  const offsetY = Math.sin(angle) * radius;

  chick.style.transform = `translate(-50%, -50%) scale(.92)`;

  function follow(){
    const t = performance.now() - start;
    const k = Math.min(1, t / lifetime);

    const targetX = mx + offsetX;
    const targetY = my + offsetY;

    const currentX = parseFloat(chick.style.left) || x;
    const currentY = parseFloat(chick.style.top) || y;

    const fx = lerp(currentX, targetX, 0.18);
    const fy = lerp(currentY, targetY, 0.18);

    chick.style.left = fx + "px";
    chick.style.top = fy + "px";

    if (k < 1) requestAnimationFrame(follow);
  }
  requestAnimationFrame(follow);

  setTimeout(() => chick.remove(), 1100);
}

// Animación suave: ring y mascota persiguen al mouse con “rebote”
function animate(){
  rx = lerp(rx, mx, 0.14);
  ry = lerp(ry, my, 0.14);
  if (ring) ring.style.transform = `translate(-50%, -50%) translate(${rx}px, ${ry}px)`;

  cx = lerp(cx, mx, 0.06);
  cy = lerp(cy, my, 0.06);

  const vx = mx - cx;
  const tilt = Math.max(-14, Math.min(14, vx * 0.04));
  const bob = Math.sin(performance.now() / 140) * 2;

  if (cow){
    cow.style.transform =
      `translate(-50%, -50%) translate(${cx - 18}px, ${cy + 22 + bob}px) rotate(${tilt}deg)`;
  }

  requestAnimationFrame(animate);
}
animate();