// 1. Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Đóng menu khi click vào một link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// 2. Smooth Scroll cho các link neo (#)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 3. Hiệu ứng header khi cuộn
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(5px)";
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// 4. Xử lý form liên hệ (gửi thông báo)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Lấy thông tin từ form
    const name = this.querySelector('input[placeholder="Họ tên"]')?.value || "";
    const email = this.querySelector('input[placeholder="Email"]')?.value || "";
    const phone =
      this.querySelector('input[placeholder="Số điện thoại"]')?.value || "";
    const message = this.querySelector("textarea")?.value || "";

    // Hiển thị thông báo đơn giản
    alert(`Cảm ơn ${name} đã liên hệ! Tôi sẽ phản hồi sớm nhất.`);

    // (Tùy chọn) Xóa form sau khi gửi
    this.reset();
  });
}

// 5. Animation khi cuộn xuống các phần (optional)
// Thêm class 'fade-in' cho các phần khi xuất hiện trong viewport
const fadeElements = document.querySelectorAll(
  ".service-card, .gallery-item, .about-content",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

fadeElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});
// ===== HIỆU ỨNG THÔNG BÁO KHI CLICK VÀO GÓI DỊCH VỤ =====

// Lấy tất cả các gói dịch vụ
const serviceCards = document.querySelectorAll(".service-card");

// Thêm hiệu ứng click cho từng gói
serviceCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // Lấy tên gói dịch vụ
    const packageName = this.querySelector("h3").innerText;

    // Hiển thị thông báo
    showNotification(`Bạn đã chọn ${packageName}`);
  });
});

// Hàm hiển thị thông báo
function showNotification(message) {
  // Tạo phần tử thông báo
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-camera"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Hiệu ứng xuất hiện
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Tự động ẩn sau 2 giây
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}
// Thêm vào file script.js

// Xử lý khi click vào nút "Đặt ngay"
document.querySelectorAll('.btn-small[href="#contact"]').forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định (nhảy đột ngột)

    // Lấy tên gói từ thuộc tính data-package
    const packageName = this.getAttribute("data-package");

    // Tìm phần tử select và chọn gói tương ứng
    const packageSelect = document.getElementById("packageSelect");
    if (packageSelect) {
      for (let i = 0; i < packageSelect.options.length; i++) {
        if (packageSelect.options[i].value === packageName) {
          packageSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Cuộn mượt đến phần liên hệ
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // (Tùy chọn) Thêm hiệu ứng nhấp nháy cho form để thu hút
      const form = document.getElementById("bookingForm");
      form.style.transition = "all 0.3s";
      form.style.boxShadow = "0 0 0 3px #e67e22";
      setTimeout(() => {
        form.style.boxShadow = "";
      }, 1000);
    }
  });
});
// ========== HIỆU ỨNG NỀN CHUYỂN ĐỘNG ==========
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

if (slides.length > 0) {
  // Khởi tạo ảnh đầu tiên
  slides[0].classList.add("active");

  // Chuyển ảnh mỗi 4 giây
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000);
}
// ===== LIGHTBOX GALLERY =====
// Lấy tất cả ảnh trong gallery
const galleryItems = document.querySelectorAll(".gallery-item");
let currentImageIndex = 0;
let imagesList = [];

// Lấy danh sách ảnh
galleryItems.forEach((item, index) => {
  const imgSrc =
    item.getAttribute("data-image") || item.querySelector("img").src;
  const imgTitle = item.querySelector(".image-info h4")?.innerText || "Ảnh đẹp";
  const imgDesc = item.querySelector(".image-info p")?.innerText || "";

  imagesList.push({
    src: imgSrc,
    title: imgTitle,
    desc: imgDesc,
  });

  // Thêm sự kiện click cho từng ảnh
  item.addEventListener("click", () => {
    currentImageIndex = index;
    openLightbox(currentImageIndex);
  });
});

// Hàm mở lightbox
function openLightbox(index) {
  // Tạo overlay
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  // Lấy thông tin ảnh hiện tại
  const image = imagesList[index];

  // Nội dung lightbox
  overlay.innerHTML = `
        <div class="lightbox-container">
            <img class="lightbox-image" src="${image.src}" alt="${image.title}">
            <div class="lightbox-info">
                <strong>${image.title}</strong> ${image.desc ? " - " + image.desc : ""}
            </div>
            <div class="lightbox-close">✕</div>
            <div class="lightbox-prev">‹</div>
            <div class="lightbox-next">›</div>
        </div>
    `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  // Thêm class active để hiện overlay
  setTimeout(() => overlay.classList.add("active"), 10);

  // Xử lý nút đóng
  const closeBtn = overlay.querySelector(".lightbox-close");
  closeBtn.addEventListener("click", () => closeLightbox(overlay));

  // Xử lý nút previous
  const prevBtn = overlay.querySelector(".lightbox-prev");
  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + imagesList.length) % imagesList.length;
    updateLightboxImage(overlay, currentImageIndex);
  });

  // Xử lý nút next
  const nextBtn = overlay.querySelector(".lightbox-next");
  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    updateLightboxImage(overlay, currentImageIndex);
  });

  // Bấm phím ESC để đóng
  const handleKeydown = (e) => {
    if (e.key === "Escape") closeLightbox(overlay);
    if (e.key === "ArrowLeft") {
      currentImageIndex =
        (currentImageIndex - 1 + imagesList.length) % imagesList.length;
      updateLightboxImage(overlay, currentImageIndex);
    }
    if (e.key === "ArrowRight") {
      currentImageIndex = (currentImageIndex + 1) % imagesList.length;
      updateLightboxImage(overlay, currentImageIndex);
    }
  };
  document.addEventListener("keydown", handleKeydown);

  // Lưu lại hàm để xóa sau khi đóng
  overlay.handleKeydown = handleKeydown;

  // Đóng khi click vào overlay (không phải container)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox(overlay);
  });
}

// Hàm cập nhật ảnh trong lightbox
function updateLightboxImage(overlay, index) {
  const image = imagesList[index];
  const imgElement = overlay.querySelector(".lightbox-image");
  const infoElement = overlay.querySelector(".lightbox-info");

  // Hiệu ứng chuyển ảnh
  imgElement.style.opacity = "0";
  setTimeout(() => {
    imgElement.src = image.src;
    imgElement.alt = image.title;
    infoElement.innerHTML = `<strong>${image.title}</strong> ${image.desc ? " - " + image.desc : ""}`;
    imgElement.style.opacity = "1";
  }, 200);
}

// Hàm đóng lightbox
function closeLightbox(overlay) {
  overlay.classList.remove("active");
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", overlay.handleKeydown);
  }, 300);
}
// ===== NÚT QUAY LẠI ĐẦU TRANG =====
const backToTopBtn = document.getElementById("backToTop");

// Lắng nghe sự kiện cuộn trang
window.addEventListener("scroll", () => {
  // Nếu cuộn xuống quá 300px thì hiện nút
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Xử lý khi bấm nút
backToTopBtn.addEventListener("click", () => {
  // Cuộn mượt mà lên đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// ===== ĐĂNG NHẬP / ĐĂNG KÝ =====
const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginSection = document.getElementById("loginSection");
const userSection = document.getElementById("userSection");
const usernameDisplay = document.getElementById("usernameDisplay");

// Đăng nhập
if (showLoginBtn) {
  showLoginBtn.addEventListener("click", () => {
    const username = prompt("Nhập tên đăng nhập:");
    const password = prompt("Nhập mật khẩu:");

    if (username && password) {
      // Lưu thông tin đăng nhập
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      // Cập nhật giao diện
      loginSection.style.display = "none";
      userSection.style.display = "flex";
      usernameDisplay.textContent = `Xin chào, ${username}`;

      alert(`Đăng nhập thành công! Chào mừng ${username}`);
    }
  });
}

// Đăng ký
if (showRegisterBtn) {
  showRegisterBtn.addEventListener("click", () => {
    const username = prompt("Tạo tên đăng nhập:");
    const email = prompt("Nhập email:");
    const password = prompt("Tạo mật khẩu:");

    if (username && email && password) {
      alert(`Đăng ký thành công! Hãy đăng nhập để tiếp tục.`);
    }
  });
}

// Đăng xuất
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    loginSection.style.display = "flex";
    userSection.style.display = "none";

    alert("Đã đăng xuất!");
  });
}

// Kiểm tra trạng thái đăng nhập khi load trang
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true" && username) {
    loginSection.style.display = "none";
    userSection.style.display = "flex";
    usernameDisplay.textContent = `Xin chào, ${username}`;
  }
}

// Gọi kiểm tra khi trang load
checkLoginStatus();

// ===== GIỎ HÀNG =====
let cart = [];

// Lưu giỏ hàng
function saveCart() {
  localStorage.setItem("photoCart", JSON.stringify(cart));
}

// Tải giỏ hàng
function loadCart() {
  const saved = localStorage.getItem("photoCart");
  if (saved) {
    cart = JSON.parse(saved);
  }
  renderCart();
}

// Thêm vào giỏ
function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity++;
    showMessage(`📸 Đã tăng số lượng ${name}`);
  } else {
    cart.push({ name, price, quantity: 1 });
    showMessage(`✅ Đã thêm ${name} vào giỏ hàng!`);
  }

  saveCart();
  renderCart();
}

// Xóa khỏi giỏ
function removeFromCart(index) {
  const name = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  renderCart();
  showMessage(`🗑️ Đã xóa ${name} khỏi giỏ`);
}

// Cập nhật số lượng
function updateQuantity(index, change) {
  if (!cart[index]) return;

  const newQty = cart[index].quantity + change;
  if (newQty <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = newQty;
    saveCart();
    renderCart();
  }
}

// Hiển thị giỏ hàng
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total-amount");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Giỏ hàng trống</p>
                <span>Hãy chọn gói dịch vụ phù hợp nhé!</span>
            </div>
        `;
    if (totalSpan) totalSpan.textContent = "0";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}đ</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">${formatPrice(itemTotal)}đ</div>
                <div class="remove-item" onclick="removeFromCart(${index})">🗑️</div>
            </div>
        `;
  });

  container.innerHTML = html;
  if (totalSpan) totalSpan.textContent = formatPrice(total);
}

// Định dạng giá
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Thông báo
function showMessage(msg) {
  const oldMsg = document.querySelector(".cart-toast");
  if (oldMsg) oldMsg.remove();

  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = `<i class="fas fa-shopping-cart"></i> ${msg}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Thanh toán
function checkout() {
  if (cart.length === 0) {
    showMessage("⚠️ Giỏ hàng trống!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const modal = document.createElement("div");
  modal.className = "payment-modal";
  modal.innerHTML = `
        <div class="modal-box">
            <i class="fas fa-check-circle"></i>
            <h3>Thanh toán thành công!</h3>
            <p>Cảm ơn bạn đã tin tưởng!</p>
            <p class="modal-total">Tổng tiền: <strong>${formatPrice(total)}đ</strong></p>
            <button onclick="closeModal()">Xác nhận</button>
        </div>
    `;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("show"), 10);
}

// Đóng modal
function closeModal() {
  const modal = document.querySelector(".payment-modal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => modal.remove(), 300);
  }

  cart = [];
  saveCart();
  renderCart();
  showMessage("✅ Đặt hàng thành công!");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Khởi tạo nút thêm vào giỏ
function initButtons() {
  const btns = document.querySelectorAll(".cart-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"));
      if (name && price) addToCart(name, price);
    });
  });

  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
}

// Khởi tạo khi load trang
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  initButtons();
});

// Thêm CSS động cho toast và modal
if (!document.querySelector("#dynamic-styles")) {
  const style = document.createElement("style");
  style.id = "dynamic-styles";
  style.textContent = `
        .cart-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-weight: 500;
        }
        .cart-toast.show {
            opacity: 1;
            transform: translateX(0);
        }
        .payment-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        }
        .payment-modal.show {
            display: flex;
        }
        .modal-box {
            background: white;
            border-radius: 24px;
            padding: 30px;
            text-align: center;
            max-width: 380px;
            width: 90%;
            animation: zoomIn 0.3s;
        }
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        .modal-box i {
            font-size: 70px;
            color: #27ae60;
            margin-bottom: 15px;
        }
        .modal-box h3 {
            font-size: 24px;
            color: #27ae60;
            margin-bottom: 10px;
        }
        .modal-box .modal-total {
            font-size: 18px;
            margin: 15px 0;
        }
        .modal-box .modal-total strong {
            color: #ff9800;
            font-size: 22px;
        }
        .modal-box button {
            background: linear-gradient(135deg, #ff9800, #f57c00);
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 50px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }
        .modal-box button:hover {
            transform: scale(1.02);
        }
    `;
  document.head.appendChild(style);
}
