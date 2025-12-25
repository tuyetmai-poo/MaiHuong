/**********************
 * BIẾN TOÀN CỤC
 **********************/
let step = 1;
let hieuUngDangChay = null;

/**********************
 * VẼ BAO THƯ (TRANG 1)
 **********************/
const canvas = document.getElementById("envelopeCanvas");
const ctx = canvas.getContext("2d");

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const w = 400;
const h = 230;

ctx.shadowColor = "rgba(0,0,0,0.4)";
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;

ctx.fillStyle = "#fdf6e3";
ctx.fillRect(cx - w / 2, cy - h / 2, w, h);

ctx.shadowColor = "transparent";

ctx.fillStyle = "#C0C0C0";
ctx.beginPath();
ctx.moveTo(cx - w / 2, cy - h / 2);
ctx.lineTo(cx + w / 2, cy - h / 2);
ctx.lineTo(cx, cy);
ctx.closePath();
ctx.fill();

ctx.strokeStyle = "rgba(0,0,0,0.1)";
ctx.beginPath();
ctx.moveTo(cx - w / 2, cy + h / 2);
ctx.lineTo(cx, cy);
ctx.lineTo(cx + w / 2, cy + h / 2);
ctx.stroke();

/**********************
 * CHUYỂN TRANG
 **********************/
function chuyenTrang() {
  document.getElementById("trang1").style.display = "none";
  document.getElementById("trang2").style.display = "flex";
  runStep1();
  startBackgroundMusic();
}

/**********************
 * STEP 1 – VIDEO
 **********************/
function runStep1() {
  const video = document.getElementById("videoChucMung");
  const tieuDe = document.getElementById("tieuDe");
  const btn = document.getElementById("nextBtn");
  const noiDung = document.getElementById("noiDung");

  document.body.style.backgroundColor = "#98dbc6";
  tieuDe.innerText = "🎬 Video Nho Nhỏ 🎬";
  noiDung.innerHTML = "";
  btn.style.display = "none";

  video.src = "sn2.mp4";
  video.style.display = "block";
  video.play();

  video.onended = () => {
    btn.style.display = "inline-block";
  };
}

/**********************
 * STEP 2 – GÕ CHỮ + TIM
 **********************/
function runStep2() {
  const tieuDe = document.getElementById("tieuDe");
  const noiDung = document.getElementById("noiDung");
  const video = document.getElementById("videoChucMung");
  const btn = document.getElementById("nextBtn");

  document.body.style.backgroundColor = "#fdf6e3";
  tieuDe.innerText = "💖 Đôi Lời Gửi Tới Em 💖";
  noiDung.innerHTML = "";
  btn.style.display = "none";
  video.style.display = "none";

  const img = document.createElement("img");
  img.src = "./meme.png";
  img.style.width = "180px";
  img.style.margin = "20px 0";
  noiDung.appendChild(img);

  const text =
    "Chúc em luôn nở nụ cười trên môi...\n" +
    "Chúc tương lai rực rỡ, gặp toàn người tốt...\n" +
    "Chúc em thật nhiều hạnh phúc và bình an 💗\n";

  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      if (text[i] === "\n") {
        noiDung.appendChild(document.createElement("br"));
      } else {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.opacity = 0;
        span.style.transition = "0.25s";
        noiDung.appendChild(span);
        requestAnimationFrame(() => (span.style.opacity = 1));
      }
      i++;
    } else {
      clearInterval(typing);
      batHieuUngTim();
      btn.style.display = "inline-block";
    }
  }, 80);
}

/**********************
 * STEP 3 – MÈO + CONFETTI
 **********************/
function runStep3() {
  tatHieuUngTim();
  document.body.style.backgroundColor = "#ebdcb2";

  const trang2 = document.getElementById("trang2");
  trang2.innerHTML = `
    <div class="cat">
      <div class="thought"><b>HẾT ÒI</b><p>Mãi iuuuu 🫰🫰🫰</p></div>
      <img src="./meo4.jpg">
      <canvas id="confettiCanvas" width="1400" height="700"
        style="position:absolute;top:0;left:0;pointer-events:none;"></canvas>
    </div>
  `;

  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  const confetti = Array.from({ length: 700 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: 3 + Math.random() * 4,
    v: 1 + Math.random() * 3,
    c: `hsl(${Math.random() * 360},100%,70%)`,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((p) => {
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.s, p.s);
      p.y += p.v;
      if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/**********************
 * NEXT STEP
 **********************/
function nextStep() {
  if (step === 1) {
    step = 2;
    runStep2();
  } else if (step === 2) {
    step = 3;
    runStep3();
  }
}

/**********************
 * NHẠC NỀN
 **********************/
function startBackgroundMusic() {
  const music = document.getElementById("backgroundMusic");
  music.volume = 0.3;
  music.play().catch(() => {});
}

/**********************
 * HIỆU ỨNG TRÁI TIM
 **********************/
function taoTraiTim() {
  const layer = document.getElementById("heart-layer");
  if (!layer) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";

  const t = 3 + Math.random() * 3;
  heart.style.animationDuration = t + "s";

  layer.appendChild(heart);
  setTimeout(() => heart.remove(), t * 1000);
}

function batHieuUngTim() {
  if (hieuUngDangChay) return;
  hieuUngDangChay = setInterval(taoTraiTim, 20);
}

function tatHieuUngTim() {
  clearInterval(hieuUngDangChay);
  hieuUngDangChay = null;
  const layer = document.getElementById("heart-layer");
  if (layer) layer.innerHTML = "";
}
