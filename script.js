// Quản lý giỏ hàng
let cart = [];

// Lấy giỏ hàng từ localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} đã được thêm vào giỏ!`);
}

// Xóa khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Cập nhật số lượng giỏ
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light);">Giỏ hàng của bạn trống</p>';
        updateCartCount();
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p style="font-size: 0.9rem; color: var(--text-light);">Số lượng: ${item.quantity}</p>
                <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    updateTotal();
    updateCartCount();
}

// Cập nhật tổng tiền
function updateTotal() {
    const totalPrice = document.getElementById('totalPrice');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = formatPrice(total);
}

// Mở modal giỏ hàng
function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    updateCartUI();
    cartModal.style.display = 'flex';
}

// Đóng modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Mở modal sản phẩm
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalRating').innerHTML = generateStars(product.rating);
    document.getElementById('modalReviews').textContent = `${product.reviews} đánh giá`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalSpecs').innerHTML = product.specs
        .map(spec => `<li>${spec}</li>`)
        .join('');
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    
    // Cập nhật nút thêm vào giỏ
    const addBtn = document.querySelector('.add-to-cart-btn');
    addBtn.onclick = () => {
        addToCart(productId);
        closeModal('productModal');
    };

    const productModal = document.getElementById('productModal');
    productModal.style.display = 'flex';
}

// Hiển thị thông báo
function showNotification(message) {
    // Tạo thông báo toast
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Thêm animation slideOutRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    // Render sản phẩm
    renderProducts();
    loadCart();

    // Bộ lọc sản phẩm
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Giỏ hàng
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openCartModal();
    });

    // Đóng modal
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.cart-modal, .product-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Đóng modal khi click bên ngoài
    window.addEventListener('click', function(e) {
        const cartModal = document.getElementById('cartModal');
        const productModal = document.getElementById('productModal');
        
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Nút thanh toán
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Giỏ hàng của bạn trống');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            showNotification(`Đơn hàng ${formatPrice(total)} đang được xử lý...`);
            
            setTimeout(() => {
                cart = [];
                saveCart();
                updateCartCount();
                closeModal('cartModal');
                renderProducts();
                showNotification('Thanh toán thành công!');
            }, 2000);
        });
    }

    // Nút mua ngay ở hero section
    const heroBtn = document.querySelector('.hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            productsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Menu toggle cho mobile
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

// Scroll animation cho các phần tử
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animElements = document.querySelectorAll('.product-card, .feature-card');
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

