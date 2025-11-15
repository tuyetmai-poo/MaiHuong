let soQuaConLai = 3;
let hieuUngDangChay = null;
const canvas = document.getElementById("envelopeCanvas");
const ctx = canvas.getContext("2d");

// Vị trí trung tâm
const cx = canvas.width / 2;
const cy = canvas.height / 2;

// Kích thước bao thư
const w = 400;
const h = 230;

// Màu
const envelopeColor = "#fdf6e3";
const flapColor = "#C0C0C0";

// đổ bóng
// VẼ THÂN BAO THƯ với bóng
ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // màu bóng
ctx.shadowBlur = 20; // độ mờ bóng
ctx.shadowOffsetX = 5; // dịch sang phải
ctx.shadowOffsetY = 5; // dịch xuống

ctx.fillStyle = envelopeColor;
ctx.beginPath();
ctx.rect(cx - w / 2, cy - h / 2, w, h);
ctx.fill();

// reset shadow cho các phần khác
ctx.shadowColor = "transparent";
ctx.shadowBlur = 0;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

// VẼ NẮP
ctx.fillStyle = flapColor;
ctx.beginPath();
ctx.moveTo(cx - w / 2, cy - h / 2);
ctx.lineTo(cx + w / 2, cy - h / 2);
ctx.lineTo(cx, cy);
ctx.closePath();
ctx.fill();

// VẼ ĐƯỜNG CHÉO
ctx.strokeStyle = "rgba(0,0,0,0.1)";
ctx.beginPath();
ctx.moveTo(cx - w / 2, cy + h / 2);
ctx.lineTo(cx, cy);
ctx.lineTo(cx + w / 2, cy + h / 2);
ctx.stroke();

function chuyenTrang() {
  // đúng mật khẩu
  document.getElementById("trang1").style.display = "none";
  document.getElementById("trang2").style.display = "block";
}
let step = 1; // chạy 1 → 2 → 3

function chuyenTrang() {
  document.getElementById("trang1").style.display = "none";
  document.getElementById("trang2").style.display = "block";
  runStep1();
  startBackgroundMusic(); // bắt đầu phần 1
}

function runStep1() {
  const video = document.getElementById("videoChucMung");
  const tieuDe = document.getElementById("tieuDe");
  const btn = document.getElementById("nextBtn");
  const noiDung = document.getElementById("noiDung");
  document.body.style.backgroundColor = "#98dbc6";
  tieuDe.innerText = "🎬 Video Nho Nhỏ 🎬";
  noiDung.innerText = "";
  btn.style.display = "none";

  video.src = "sn2.mp4";
  video.style.display = "block";
  video.play();

  video.onended = () => {
    btn.style.display = "inline-block"; // hiện Next
  };
}

function runStep2() {
  const noiDung = document.getElementById("noiDung");
  const tieuDe = document.getElementById("tieuDe");
  const video = document.getElementById("videoChucMung");
  const btn = document.getElementById("nextBtn");
  const container = document.getElementById("confetti-container");
  noiDung.style.fontFamily="Dancing Script";
  // đổi nền
  document.body.style.backgroundColor = "#fdf6e3";

  // reset container trái tim
  container.innerHTML = "";

  video.style.display = "none";
  noiDung.innerHTML = "";
  btn.style.display = "none";
  tieuDe.innerText = "💖 Đôi Lời Gửi Tới Em 💖";

  const img = document.createElement("img");
  img.src = "./meme.png";
  img.alt = "meo";
  img.style.width = "18180px";
  img.style.marginTop = "20px";
  noiDung.appendChild(img); // thêm ảnh vào dưới nội dung
  noiDung.style.fontFamily="Dancing Script";
  const text =
    "Chúc em luôn nở nụ cười trên môi ...\n" +
    "Chúc tương lai của em rực rỡ, gặp toàn người thương emem...\n" +
    "Chúc em thật nhiều hạnh phúc và bình an 💗\n";

  let index = 0;

  const typing = setInterval(() => {
    if (index < text.length) {
      const char = text.charAt(index);
      if (char === "\n") {
        noiDung.appendChild(document.createElement("br"));
      } else {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.marginRight = "2px";
        span.style.opacity = 0;
        span.style.fontFamily = "Poppins, sans-serif";
        span.style.transition = "opacity 0.25s";
        noiDung.appendChild(span);

        requestAnimationFrame(() => {
          span.style.opacity = 1;
        });
      }
      index++;
    } else {
      clearInterval(typing);

      // tạo ảnh ngay dưới nội dung

      // chạy lại hiệu ứng trái tim
      if (hieuUngDangChay) clearInterval(hieuUngDangChay);
      hieuUngDangChay = setInterval(taoTraiTim, 1000);

      // hiện nút Next
      btn.style.display = "inline-block";
    }
  }, 80);
}

function nextStep() {
  const container = document.getElementById("confetti-container");
  const btn = document.getElementById("nextBtn");

  // dừng hiệu ứng trái tim
  if (hieuUngDangChay) {
    clearInterval(hieuUngDangChay);
    hieuUngDangChay = null;
  }

  // xóa trái tim cũ
  container.innerHTML = "";

  // ẩn nút Next
  btn.style.display = "none";

  // chuyển step
  if (step === 1) {
    step = 2;
    runStep2();
  } else if (step === 2) {
    step = 3;
    runStep3();
  }
}

function runStep3() {
  document.body.style.backgroundColor = "#ebdcb2";
  const tieuDe = document.getElementById("tieuDe");
  const noiDung = document.getElementById("noiDung");
  const btn = document.getElementById("nextBtn");
  const video = document.getElementById("videoChucMung");

  tieuDe.innerText = "";
  noiDung.innerHTML = "";
  video.style.display = "none";
  btn.style.display = "none";

  // Ẩn canvas cũ (nếu có)
  const oldCanvas = document.getElementById("particleCanvas");
  if (oldCanvas) oldCanvas.style.display = "none";

  // Tạo giao diện mèo
  const trang2 = document.getElementById("trang2");
  trang2.innerHTML = `
    <div class="cat">
      <div class="thought"><b>HẾT ÒI</b>
      <p>Mãi iuuuuuu🫰🫰🫰</p></div>
      <img src="./meo4.jpg" alt="meo">
      <canvas id="confettiCanvas" width="1200" height="700" style="position:absolute;top:0;left:0;pointer-events:none;"></canvas>
    </div>
  `;
  // Khởi tạo canvas confetti
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  // Tạo confetti
  let confetti = [];
  for (let i = 0; i < 800; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 4 + Math.random() * 3,
      speed: 1 + Math.random() * 3,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    });
  }

  // Vẽ confetti
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
      c.y += c.speed;
      if (c.y > canvas.height) c.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function startBackgroundMusic() {
  const music = document.getElementById("backgroundMusic");
  music.volume = 0.3; // âm lượng 30%
  music.play().catch((err) => {
    console.log("Autoplay bị chặn, cần người dùng click:", err);
  });
}
function phatVideo() {
  let video = document.getElementById("videoChucMung");
  video.muted = false; // bật tiếng
  video.volume = 0.5;
  video.play();
}

const container = document.getElementById("confetti-container");
container.innerHTML = "";
document.body.style.background = "";

const video = document.getElementById("videoChucMung");
video.pause();
video.currentTime = 0;
video.style.display = "none";
video.src = "";

if (hieuUngDangChay) {
  clearInterval(hieuUngDangChay);
  hieuUngDangChay = null;
}

/* 💖 Trái tim bay 💖 */
function taoTraiTim() {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < 60; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
  }
}
function typeWriter(text, elementId, speed = 100) {
  const el = document.getElementById(elementId);
  el.innerHTML = ""; // reset
  let i = 0;

  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}


