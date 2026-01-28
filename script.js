const glow = document.querySelector('.cursor-glow');
const chips = document.querySelectorAll('.chip');
const products = document.querySelectorAll('.product');
const loader = document.querySelector('.page-loader');
const cartButton = document.querySelector('.cart-button');
const cartDrawer = document.querySelector('.cart-drawer');
const cartClose = document.querySelector('.cart-close');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total-value');
const tourOverlay = document.querySelector('[data-tour-overlay]');
const tourTitle = document.querySelector('.tour-title');
const tourDesc = document.querySelector('.tour-desc');
const tourNext = document.querySelector('.tour-next');
const tourSkip = document.querySelector('.tour-skip');

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

if (glow) {
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    glow.style.opacity = '1';
  });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

function animateGlow() {
  if (!glow) {
    return;
  }
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  glow.style.transform = `translate(${glowX - 140}px, ${glowY - 140}px)`;
  requestAnimationFrame(animateGlow);
}

animateGlow();

if (chips.length && products.length) {
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      products.forEach((product) => {
        const category = product.dataset.category;
        const isMatch = filter === 'all' || category === filter;
        product.style.display = isMatch ? 'flex' : 'none';
        product.style.opacity = isMatch ? '1' : '0';
      });
    });
  });
}

const elementsToReveal = document.querySelectorAll('.product, .feature, .review, .hero-card, .section-head');

if (elementsToReveal.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    },
    { threshold: 0.1 }
  );

  [...elementsToReveal].forEach((el) => {
    el.classList.add('fade');
    observer.observe(el);
  });
}

if (loader) {
  const isHome = document.body?.dataset?.page === 'home';
  const delay = isHome ? 3000 : 0;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 800);
    }, delay);
  });
}

const cartKey = 'gympro_cart';

const formatPrice = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  } catch (error) {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(cartKey, JSON.stringify(items));
};

const renderCart = () => {
  if (!cartItems || !cartCount || !cartTotal) {
    return;
  }
  const items = readCart();
  cartItems.innerHTML = '';

  let total = 0;
  let count = 0;

  if (!items.length) {
    cartItems.innerHTML = '<p class="empty">Giỏ hàng đang trống.</p>';
  }

  items.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    count += item.qty;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)} • SL: ${item.qty}</p>
      </div>
      <div class="cart-item-actions">
        <button class="qty-button" data-action="dec" data-name="${item.name}">-</button>
        <button class="qty-button" data-action="inc" data-name="${item.name}">+</button>
      </div>
    `;
    cartItems.appendChild(el);
  });

  cartCount.textContent = String(count);
  cartTotal.textContent = formatPrice(total);
};

const updateQuantity = (name, delta) => {
  const items = readCart();
  const index = items.findIndex((item) => item.name === name);
  if (index === -1) return;
  items[index].qty += delta;
  if (items[index].qty <= 0) {
    items.splice(index, 1);
  }
  saveCart(items);
  renderCart();
};

if (cartButton && cartDrawer) {
  cartButton.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  });
}

if (cartClose && cartDrawer) {
  cartClose.addEventListener('click', () => {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  });
}

if (cartItems) {
  cartItems.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const name = target.dataset.name;
    if (!action || !name) return;
    updateQuantity(name, action === 'inc' ? 1 : -1);
  });
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    if (!name || !price) return;
    const items = readCart();
    const existing = items.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ name, price, qty: 1 });
    }
    saveCart(items);
    renderCart();
    if (cartDrawer) {
      cartDrawer.classList.add('open');
      cartDrawer.setAttribute('aria-hidden', 'false');
    }
  });
});

renderCart();

if (tourOverlay && document.body?.dataset?.page === 'home') {
  const tourSteps = [
    {
      key: 'filters',
      title: 'Lọc nhanh sản phẩm',
      desc: 'Chọn danh mục để xem đúng thiết bị bạn cần trong vài giây.'
    },
    {
      key: 'add',
      title: 'Thêm vào giỏ',
      desc: 'Bấm “Thêm” để đưa sản phẩm vào giỏ hàng.'
    },
    {
      key: 'cart',
      title: 'Kiểm tra giỏ hàng',
      desc: 'Mở giỏ để chỉnh số lượng và xem tổng tiền.'
    }
  ];

  let currentIndex = 0;
  let currentTarget = null;

  const closeTour = () => {
    if (currentTarget) {
      currentTarget.classList.remove('tour-highlight');
      currentTarget = null;
    }
    tourOverlay.classList.remove('active');
    tourOverlay.setAttribute('aria-hidden', 'true');
  };

  const showStep = (index) => {
    if (currentTarget) {
      currentTarget.classList.remove('tour-highlight');
    }

    const step = tourSteps[index];
    if (!step) {
      closeTour();
      return;
    }

    const target = document.querySelector(`[data-tour="${step.key}"]`);
    if (!target) {
      showStep(index + 1);
      return;
    }

    currentTarget = target;
    target.classList.add('tour-highlight');
    if (tourOverlay) {
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radius = Math.max(rect.width, rect.height) * 0.9 + 80;
      tourOverlay.style.setProperty('--spot-x', `${centerX}px`);
      tourOverlay.style.setProperty('--spot-y', `${centerY}px`);
      tourOverlay.style.setProperty('--spot-size', `${radius}px`);
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (tourTitle) tourTitle.textContent = step.title;
    if (tourDesc) tourDesc.textContent = step.desc;
    if (tourNext) tourNext.textContent = index === tourSteps.length - 1 ? 'Hoàn tất' : 'Tiếp theo';

    tourOverlay.classList.add('active');
    tourOverlay.setAttribute('aria-hidden', 'false');
  };

  if (tourNext) {
    tourNext.addEventListener('click', () => {
      currentIndex += 1;
      showStep(currentIndex);
    });
  }

  if (tourSkip) {
    tourSkip.addEventListener('click', closeTour);
  }

  window.addEventListener('load', () => {
    const startDelay = loader ? 3200 : 600;
    setTimeout(() => showStep(0), startDelay);
  });
}
