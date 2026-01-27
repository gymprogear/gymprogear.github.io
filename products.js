// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: 'Tạ tay 10kg',
        category: 'dumbbells',
        price: 299000,
        originalPrice: 399000,
        badge: 'Hot',
        rating: 4.8,
        reviews: 125,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(50,60)"><rect x="20" y="30" width="60" height="20" fill="%23444" rx="5"/><circle cx="15" cy="40" r="15" fill="%23ff6b35"/><circle cx="85" cy="40" r="15" fill="%23ff6b35"/></g></svg>',
        description: 'Tạ tay đúc 10kg chất lượng cao với lớp phủ cao su',
        specs: [
            'Trọng lượng: 10kg',
            'Vật liệu: Đúc sắt',
            'Lớp phủ: Cao su',
            'Kích thước: 150mm'
        ]
    },
    {
        id: 2,
        name: 'Tạ tay 20kg',
        category: 'dumbbells',
        price: 599000,
        originalPrice: 799000,
        badge: 'Hot',
        rating: 4.9,
        reviews: 89,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(40,50)"><rect x="30" y="30" width="40" height="25" fill="%23444" rx="5"/><circle cx="15" cy="42" r="18" fill="%23ff5722"/><circle cx="105" cy="42" r="18" fill="%23ff5722"/></g></svg>',
        description: 'Tạ tay đúc 20kg với thiết kế ergonomic',
        specs: [
            'Trọng lượng: 20kg',
            'Vật liệu: Đúc sắt',
            'Lớp phủ: Cao su chống trơn',
            'Kích thước: 170mm'
        ]
    },
    {
        id: 3,
        name: 'Tạ đòn 30kg',
        category: 'barbells',
        price: 1299000,
        originalPrice: 1599000,
        badge: 'Sale',
        rating: 4.7,
        reviews: 156,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(20,70)"><rect x="10" y="30" width="160" height="15" fill="%23444" rx="3"/><rect x="5" y="15" width="30" height="30" fill="%23ff6b35" rx="3"/><rect x="165" y="15" width="30" height="30" fill="%23ff6b35" rx="3"/></g></svg>',
        description: 'Tạ đòn 30kg phù hợp cho tập nặng',
        specs: [
            'Trọng lượng: 30kg',
            'Chiều dài: 180cm',
            'Vật liệu: Thép chất lượng cao',
            'Khả năng chịu: 300kg'
        ]
    },
    {
        id: 4,
        name: 'Bộ tạ tay điều chỉnh',
        category: 'dumbbells',
        price: 2499000,
        originalPrice: 3299000,
        badge: 'Hot',
        rating: 4.9,
        reviews: 203,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(50,50)"><g transform="translate(0,0)"><rect x="15" y="25" width="40" height="20" fill="%23444" rx="4"/><circle cx="8" cy="35" r="12" fill="%231b998b"/><circle cx="68" cy="35" r="12" fill="%231b998b"/></g><g transform="translate(0,50)"><rect x="15" y="25" width="40" height="20" fill="%23444" rx="4"/><circle cx="8" cy="35" r="12" fill="%23004e89"/><circle cx="68" cy="35" r="12" fill="%23004e89"/></g></g></svg>',
        description: 'Bộ tạ tay điều chỉnh từ 5kg đến 25kg',
        specs: [
            'Phạm vi: 5-25kg',
            'Số bộ trong gói: 11',
            'Vật liệu: Đúc sắt + cao su',
            'Giá đỡ: Gỗ bền vững'
        ]
    },
    {
        id: 5,
        name: 'Máy đạp xe tập thể dục',
        category: 'machines',
        price: 4299000,
        originalPrice: 5999000,
        badge: 'Best',
        rating: 4.8,
        reviews: 178,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(30,30)"><circle cx="40" cy="40" r="35" fill="none" stroke="%23444" stroke-width="3"/><circle cx="40" cy="40" r="30" fill="none" stroke="%23ff6b35" stroke-width="2"/><circle cx="100" cy="60" r="25" fill="none" stroke="%23444" stroke-width="3"/><line x1="70" y1="50" x2="85" y2="55" stroke="%23444" stroke-width="2"/></g></svg>',
        description: 'Máy đạp xe tập thể dục với 20 mức kháng cự',
        specs: [
            'Mức kháng cự: 20',
            'Màn hình: LCD kỹ thuật số',
            'Giới hạn cân nặng: 150kg',
            'Kích thước: 120x60x100cm'
        ]
    },
    {
        id: 6,
        name: 'Máy chạy bộ',
        category: 'machines',
        price: 6999000,
        originalPrice: 8999000,
        badge: 'Sale',
        rating: 4.7,
        reviews: 134,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><g transform="translate(20,40)"><rect x="10" y="50" width="140" height="15" fill="%23444" rx="3"/><rect x="15" y="10" width="130" height="35" fill="none" stroke="%23444" stroke-width="2" rx="3"/><rect x="25" y="65" width="20" height="50" fill="%23ff6b35" rx="3"/><rect x="135" y="65" width="20" height="50" fill="%23ff6b35" rx="3"/></g></svg>',
        description: 'Máy chạy bộ điện tử chuyên nghiệp',
        specs: [
            'Tốc độ tối đa: 20km/h',
            'Độ dốc: 0-15%',
            'Màn hình: 7 inch LED',
            'Kích thước: 180x90x140cm'
        ]
    },
    {
        id: 7,
        name: 'Thảm yoga cao su',
        category: 'accessories',
        price: 199000,
        originalPrice: 299000,
        badge: null,
        rating: 4.6,
        reviews: 67,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><rect x="20" y="30" width="160" height="140" fill="%231b998b" opacity="0.7" rx="5"/><line x1="50" y1="30" x2="50" y2="170" stroke="%23fff" stroke-width="1" opacity="0.5"/><line x1="80" y1="30" x2="80" y2="170" stroke="%23fff" stroke-width="1" opacity="0.5"/><line x1="110" y1="30" x2="110" y2="170" stroke="%23fff" stroke-width="1" opacity="0.5"/></svg>',
        description: 'Thảm yoga cao su tự nhiên chống trơn',
        specs: [
            'Vật liệu: Cao su tự nhiên',
            'Độ dày: 6mm',
            'Kích thước: 180x60cm',
            'Trọng lượng: 2.5kg'
        ]
    },
    {
        id: 8,
        name: 'Dây kéo tập lực',
        category: 'accessories',
        price: 89000,
        originalPrice: 129000,
        badge: 'Hot',
        rating: 4.5,
        reviews: 89,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><circle cx="50" cy="100" r="12" fill="%23444"/><circle cx="150" cy="100" r="12" fill="%23444"/><path d="M 62 95 Q 100 80 138 95" stroke="%23ff6b35" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 62 105 Q 100 120 138 105" stroke="%23ff6b35" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
        description: 'Dây kéo tập lực với 5 mức kháng cự',
        specs: [
            'Số mức kháng cự: 5',
            'Vật liệu: Cao su tự nhiên',
            'Chiều dài: 30cm',
            'Tặng túi đựng'
        ]
    },
    {
        id: 9,
        name: 'Quả tạ nước',
        category: 'accessories',
        price: 249000,
        originalPrice: 349000,
        badge: 'Sale',
        rating: 4.7,
        reviews: 102,
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23e8eef5" width="200" height="200"/><path d="M 100 30 Q 130 50 130 100 Q 130 150 100 160 Q 70 150 70 100 Q 70 50 100 30" fill="%234a90e2" opacity="0.7"/><circle cx="100" cy="80" r="15" fill="%234a90e2" opacity="0.5"/></svg>',
        description: 'Quả tạ nước 12kg điều chỉnh được',
        specs: [
            'Trọng lượng cơ bản: 12kg',
            'Có thể điều chỉnh: 4-16kg',
            'Vật liệu: PVC chống thấm',
            'Kích thước: 35cm'
        ]
    }
];

// Render sản phẩm
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="rating">
                    ${generateStars(product.rating)}
                    <span style="color: var(--text-light); font-size: 0.85rem;">(${product.reviews})</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin: 0.5rem 0;">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice > product.price ? `<s style="color: var(--text-light); font-size: 0.9rem;">${formatPrice(product.originalPrice)}</s>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-small btn-view" onclick="openProductModal(${product.id})">Xem chi tiết</button>
                    <button class="btn-small btn-add" onclick="addToCart(${product.id})">Mua ngay</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Hàm trợ giúp
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(price);
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<span class="star">★</span>';
        } else if (i < rating) {
            stars += '<span class="star" style="opacity: 0.5;">★</span>';
        } else {
            stars += '<span class="star" style="opacity: 0.2;">★</span>';
        }
    }
    return stars;
}

function getCategoryName(category) {
    const names = {
        'dumbbells': 'Tạ tay',
        'barbells': 'Tạ đòn',
        'machines': 'Máy tập',
        'accessories': 'Phụ kiện'
    };
    return names[category] || category;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

// Export để sử dụng ở script.js

