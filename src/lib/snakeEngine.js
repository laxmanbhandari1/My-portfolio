// Reusable roaming-snake engine. runSnakes(canvas, configs) draws N snakes that
// wander their canvas chasing pellets. Returns a cleanup function.

export const SNAKE_PALETTE = [
  { color: "#cf1f16", dark: "#8f110b", light: "rgba(255,158,148,.55)", pellet: "#e5261f", pr: "229,38,31" },
  { color: "#f0a500", dark: "#a86e00", light: "rgba(255,236,160,.6)", pellet: "#f0a500", pr: "240,165,0" },
  { color: "#2563eb", dark: "#15357e", light: "rgba(150,190,255,.6)", pellet: "#2563eb", pr: "37,99,235" },
  { color: "#161616", dark: "#000000", light: "rgba(150,150,150,.5)", pellet: "#161616", pr: "22,22,22" },
  { color: "#16a34a", dark: "#0b6b31", light: "rgba(150,255,190,.55)", pellet: "#16a34a", pr: "22,163,74" },
  { color: "#7c3aed", dark: "#4a1d95", light: "rgba(210,180,255,.6)", pellet: "#7c3aed", pr: "124,58,237" },
  { color: "#ec1e79", dark: "#98104e", light: "rgba(255,170,210,.6)", pellet: "#ec1e79", pr: "236,30,121" },
  { color: "#06b6d4", dark: "#0a6b80", light: "rgba(160,240,255,.6)", pellet: "#06b6d4", pr: "6,182,212" },
];

export function runSnakes(canvas, configs) {
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, raf = 0, t = 0, phase = 0, snakes = [];
  const cursor = { x: 0, y: 0, on: false };
  const SP = 9, SPEED = 2.6, MAXTURN = 0.045, MAXLEN = 130;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const norm = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };

  function newTarget(s) {
    let x, y, tries = 0;
    do { x = rnd(W * 0.08, W * 0.92); y = rnd(H * 0.1, H * 0.9); tries++; }
    while (Math.hypot(x - s.head.x, y - s.head.y) < W * 0.4 && tries < 12);
    s.target.x = x; s.target.y = y;
  }
  function createSnake(cfg) {
    const s = {
      head: { x: cfg.x, y: cfg.y, a: cfg.a }, spine: [], target: { x: 0, y: 0 },
      color: cfg.color, dark: cfg.dark, light: cfg.light, pellet: cfg.pellet, pr: cfg.pr, tphase: cfg.tphase || 0,
      maxr: cfg.maxr || 18, headr: cfg.headr || 24, pulse: Math.random() * 6, follow: cfg.follow || false,
    };
    for (let i = 0; i < (cfg.len || 72); i++) s.spine.push({ x: cfg.x - Math.cos(cfg.a) * i * SP, y: cfg.y - Math.sin(cfg.a) * i * SP });
    newTarget(s);
    return s;
  }
  function init() {
    const n = configs.length;
    snakes = configs.map((c, i) => {
      const ang = (i / n) * Math.PI * 2;
      const x = W * (0.5 + 0.3 * Math.cos(ang)), y = H * (0.5 + 0.3 * Math.sin(ang));
      return createSnake({ x, y, a: ang + Math.PI / 2, tphase: i * 0.7, ...c });
    });
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    if (!W || !H) { raf = requestAnimationFrame(resize); return; }
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!snakes.length) init();
    else snakes.forEach((s) => { if (s.target.x > W || s.target.y > H || s.target.x < 0 || s.target.y < 0) newTarget(s); });
  }
  function step(s) {
    const tx = s.follow && cursor.on ? cursor.x : s.target.x;
    const ty = s.follow && cursor.on ? cursor.y : s.target.y;
    const desired = Math.atan2(ty - s.head.y, tx - s.head.x);
    let diff = norm(desired - s.head.a); diff = Math.max(-MAXTURN, Math.min(MAXTURN, diff));
    s.head.a += diff; s.head.x += Math.cos(s.head.a) * SPEED; s.head.y += Math.sin(s.head.a) * SPEED;
    const m = 26;
    if (s.head.x < m || s.head.x > W - m || s.head.y < m || s.head.y > H - m) {
      const c = Math.atan2(H / 2 - s.head.y, W / 2 - s.head.x); s.head.a += norm(c - s.head.a) * 0.05;
    }
    s.spine[0].x = s.head.x; s.spine[0].y = s.head.y;
    for (let i = 1; i < s.spine.length; i++) {
      const dx = s.spine[i].x - s.spine[i - 1].x, dy = s.spine[i].y - s.spine[i - 1].y, d = Math.hypot(dx, dy) || 1;
      s.spine[i].x = s.spine[i - 1].x + (dx / d) * SP; s.spine[i].y = s.spine[i - 1].y + (dy / d) * SP;
    }
    if (!s.follow && Math.hypot(s.head.x - s.target.x, s.head.y - s.target.y) < 90) {
      newTarget(s);
      if (s.spine.length < MAXLEN) { const last = s.spine[s.spine.length - 1]; for (let k = 0; k < 4; k++) s.spine.push({ x: last.x, y: last.y }); }
    }
  }
  function drawSnake(s) {
    const N = s.spine.length, MAXR = s.maxr, HEADR = s.headr, nx = [], ny = [];
    for (let i = 0; i < N; i++) {
      const p0 = s.spine[Math.max(0, i - 1)], p1 = s.spine[Math.min(N - 1, i + 1)];
      const dx = p1.x - p0.x, dy = p1.y - p0.y, d = Math.hypot(dx, dy) || 1; nx[i] = -dy / d; ny[i] = dx / d;
    }
    const cx = [], cy = [], left = [], right = [];
    for (let i = 0; i < N; i++) {
      const wave = Math.sin(phase - i * 0.28) * (MAXR * 0.5) * Math.min(1, i / 6);
      const CX = s.spine[i].x + nx[i] * wave, CY = s.spine[i].y + ny[i] * wave;
      const u = i / (N - 1), r = u > 0.82 ? MAXR * (1 - (u - 0.82) / 0.18) : MAXR * (0.7 + 0.3 * Math.min(1, u / 0.08));
      cx[i] = CX; cy[i] = CY; left.push({ x: CX + nx[i] * r, y: CY + ny[i] * r }); right.push({ x: CX - nx[i] * r, y: CY - ny[i] * r });
    }
    const smooth = (pts) => {
      for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my); }
      const last = pts[pts.length - 1]; ctx.lineTo(last.x, last.y);
    };
    const outline = (fill, ox = 0, oy = 0) => {
      const rrev = right.slice().reverse(); ctx.save(); ctx.translate(ox, oy);
      ctx.beginPath(); ctx.moveTo(left[0].x, left[0].y); smooth(left); ctx.lineTo(rrev[0].x, rrev[0].y); smooth(rrev); ctx.closePath();
      ctx.fillStyle = fill; ctx.fill(); ctx.restore();
    };
    ctx.save(); ctx.filter = "blur(5px)"; outline("rgba(0,0,0,0.1)", 2, MAXR * 0.6); ctx.restore();
    outline(s.color);
    ctx.save(); ctx.strokeStyle = s.light; ctx.lineWidth = MAXR * 0.7; ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(cx[0], cy[0]); for (let i = 1; i < N * 0.72; i++) ctx.lineTo(cx[i], cy[i]); ctx.stroke(); ctx.restore();
    const hx = cx[0], hy = cy[0], a = s.head.a, fx = Math.cos(a), fy = Math.sin(a), sx = -Math.sin(a), sy = Math.cos(a);
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
    ctx.fillStyle = s.color; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, 0, HEADR * 1.15, HEADR * 0.9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.5; ctx.fillStyle = s.light; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, -HEADR * 0.28, HEADR * 0.8, HEADR * 0.32, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    ctx.restore();
    const tg = Math.sin(t * 2.4 + s.tphase);
    if (tg > 0.55) {
      const bx = hx + fx * HEADR * 1.5, by = hy + fy * HEADR * 1.5, ln = HEADR * 0.85 * tg;
      ctx.strokeStyle = "#e5261f"; ctx.lineWidth = 2; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(hx + fx * HEADR, hy + fy * HEADR); ctx.lineTo(bx, by);
      ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln + sx * ln * 0.5, by + fy * ln + sy * ln * 0.5);
      ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln - sx * ln * 0.5, by + fy * ln - sy * ln * 0.5); ctx.stroke();
    }
    const eye = (ex, ey) => {
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ex, ey, HEADR * 0.26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.arc(ex + fx * HEADR * 0.1, ey + fy * HEADR * 0.1, HEADR * 0.13, 0, Math.PI * 2); ctx.fill();
    };
    eye(hx + fx * HEADR * 0.35 + sx * HEADR * 0.5, hy + fy * HEADR * 0.35 + sy * HEADR * 0.5);
    eye(hx + fx * HEADR * 0.35 - sx * HEADR * 0.5, hy + fy * HEADR * 0.35 - sy * HEADR * 0.5);
  }
  function pellet(s) {
    s.pulse += 0.08; const pr = 6 + Math.sin(s.pulse) * 1.5;
    const g = ctx.createRadialGradient(s.target.x, s.target.y, 0, s.target.x, s.target.y, 26);
    g.addColorStop(0, `rgba(${s.pr},0.45)`); g.addColorStop(1, `rgba(${s.pr},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.target.x, s.target.y, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = s.pellet; ctx.beginPath(); ctx.arc(s.target.x, s.target.y, pr, 0, Math.PI * 2); ctx.fill();
  }
  function frame() {
    t += 0.016; phase += 0.16; ctx.clearRect(0, 0, W, H);
    snakes.forEach(step); snakes.forEach(pellet); snakes.forEach(drawSnake);
    raf = requestAnimationFrame(frame);
  }
  const onResize = () => resize();
  const onCursor = (e) => { const r = canvas.getBoundingClientRect(); cursor.x = e.clientX - r.left; cursor.y = e.clientY - r.top; cursor.on = true; };
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onCursor);
  resize();
  const ro = new ResizeObserver(() => resize()); ro.observe(canvas);
  raf = requestAnimationFrame(frame);
  return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", onCursor); };
}
