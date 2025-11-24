// ========= BÀI 1: Tìm kiếm sản phẩm =========
const products = [
  { id: 1, name: "Laptop Dell XPS 13", price: "24,990,000₫" },
  { id: 2, name: "iPhone 15 Pro", price: "32,990,000₫" },
  { id: 3, name: "Samsung Galaxy Watch 6", price: "7,490,000₫" },
  { id: 4, name: "Sony WH-1000XM5", price: "8,290,000₫" },
  { id: 5, name: "iPad Air 2024", price: "18,500,000₫" },
];

function renderProducts(list) {
  const container = document.getElementById('product-list');
  if (list.length === 0) {
    container.innerHTML = `<div class="no-results">❌ Không tìm thấy sản phẩm nào!</div>`;
    return;
  }
  container.innerHTML = list.map(p => `
    <div class="product-card">
      <h3>${p.name}</h3>
      <p><strong>${p.price}</strong></p>
    </div>
  `).join('');
}

function handleSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    const term = input.value.trim().toLowerCase();
    // ✅ Bảo vệ injection: chỉ dùng .toLowerCase() + .includes → không chèn HTML/script
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });

  renderProducts(products);
}

// ========= BÀI 2: Form đăng ký =========
function validateForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const terms = form.terms.checked;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let valid = true;
    let message = "";

    if (!name) { valid = false; message = "Vui lòng nhập tên."; }
    else if (!emailRegex.test(email)) { valid = false; message = "Email không hợp lệ."; }
    else if (!passwordRegex.test(password)) { 
      valid = false; 
      message = "Mật khẩu phải ≥8 ký tự, có chữ hoa, thường và số."; 
    }
    else if (!terms) { valid = false; message = "Vui lòng đồng ý điều khoản."; }

    const alertDiv = document.getElementById('form-alert');
    if (valid) {
      // ✅ Dữ liệu cục bộ: chỉ lưu những gì cần thiết, KHÔNG lưu mật khẩu thật (trong thực tế nên hash)
      const userData = { name, email }; // ❗ Không lưu password vào localStorage vì lý do bảo mật (mẫu demo)
      localStorage.setItem('user', JSON.stringify(userData));
      alertDiv.className = "alert success";
      alertDiv.textContent = "✅ Đăng ký thành công!";
      form.reset();
    } else {
      alertDiv.className = "alert error";
      alertDiv.textContent = message;
    }
    alertDiv.style.display = "block";
  });
}

// ========= BÀI 3: Đồng hồ đếm ngược =========
let countdownInterval = null;

function startCountdown() {
  const display = document.getElementById('countdown-display');
  const modal = document.getElementById('timeup-modal');
  if (!display) return;

  let totalSeconds = 10 * 60; // 10 phút

  function updateTimer() {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      modal.style.display = "flex";
      return;
    }

    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    display.textContent = `${mins}:${secs}`;

    if (totalSeconds <= 60) {
      display.classList.add('warning');
    }

    totalSeconds--;
  }

  updateTimer(); // hiển thị ngay lập tức
  countdownInterval = setInterval(updateTimer, 1000);
}

// Đóng modal
function closeModal() {
  document.getElementById('timeup-modal').style.display = "none";
  // Có thể reset timer hoặc redirect ở đây
}

// Khởi chạy các chức năng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  // Xác định trang hiện tại qua đường dẫn
  const path = window.location.pathname.split('/').pop();

  if (path === 'baitap01.html') {
    handleSearch();
  } else if (path === 'baitap02.html') {
    validateForm();
  } else if (path === 'baitap03.html') {
    startCountdown();
  }
});