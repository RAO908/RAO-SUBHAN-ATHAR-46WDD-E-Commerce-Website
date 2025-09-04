// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        originalPrice: 399,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        rating: 4.8,
        reviews: 124,
        isNew: true,
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199,
        originalPrice: null,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        rating: 4.6,
        reviews: 89,
        isNew: false,
        description: "Track your fitness goals with this advanced smartwatch"
    },
    {
        id: 3,
        name: "Minimalist Backpack",
        price: 79,
        originalPrice: 99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        rating: 4.9,
        reviews: 156,
        isNew: false,
        description: "Stylish and functional backpack for everyday use"
    },
    {
        id: 4,
        name: "Organic Coffee Beans",
        price: 24,
        originalPrice: null,
        category: "food",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
        rating: 4.7,
        reviews: 67,
        isNew: true,
        description: "Premium organic coffee beans, freshly roasted"
    },
    {
        id: 5,
        name: "Leather Wallet",
        price: 89,
        originalPrice: 120,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
        rating: 4.5,
        reviews: 43,
        isNew: false,
        description: "Handcrafted genuine leather wallet"
    },
    {
        id: 6,
        name: "Wireless Speaker",
        price: 149,
        originalPrice: null,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        rating: 4.4,
        reviews: 91,
        isNew: false,
        description: "Portable wireless speaker with premium sound"
    }
];

// App state
let state = {
    cartItems: [],
    wishlistItems: [],
    selectedCategory: 'all',
    priceRange: [0, 1000],
    sortBy: 'featured',
    viewMode: 'grid',
    searchQuery: '',
    isCartOpen: false,
    isMobileMenuOpen: false
};

// DOM Elements
const elements = {
    productsContainer: document.getElementById('products-container'),
    cartButton: document.getElementById('cart-button'),
    closeCartButton: document.getElementById('close-cart-button'),
    closeCartOverlay: document.getElementById('close-cart-overlay'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartCount: document.getElementById('cart-count'),
    cartCountHeader: document.getElementById('cart-count-header'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartFooter: document.getElementById('cart-footer'),
    cartTotal: document.getElementById('cart-total'),
    emptyCart: document.getElementById('empty-cart'),
    wishlistButton: document.getElementById('wishlist-button'),
    wishlistCount: document.getElementById('wishlist-count'),
    searchInput: document.getElementById('search-input'),
    categoryFilters: document.getElementById('category-filters'),
    sortSelect: document.getElementById('sort-select'),
    gridView: document.getElementById('grid-view'),
    listView: document.getElementById('list-view'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    closeMobileMenu: document.getElementById('close-mobile-menu'),
    mobileMenu: document.getElementById('mobile-menu')
};

// Initialize the app
function init() {
    renderProducts();
    setupEventListeners();
    lucide.createIcons();
}

// Set up event listeners
function setupEventListeners() {
    // Cart functionality
    elements.cartButton.addEventListener('click', () => toggleCart(true));
    elements.closeCartButton.addEventListener('click', () => toggleCart(false));
    elements.closeCartOverlay.addEventListener('click', () => toggleCart(false));

    // Wishlist functionality
    elements.wishlistButton.addEventListener('click', () => alert('Wishlist feature coming soon!'));

    // Search functionality
    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderProducts();
    });

    // Category filters
    elements.categoryFilters.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            state.selectedCategory = category;
            
            // Update active state of buttons
            elements.categoryFilters.querySelectorAll('button').forEach(btn => {
                if (btn.dataset.category === category) {
                    btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg');
                    btn.classList.remove('bg-white', 'text-gray-700', 'border');
                } else {
                    btn.classList.remove('bg-blue-600', 'text-white', 'shadow-lg');
                    btn.classList.add('bg-white', 'text-gray-700', 'border');
                }
            });
            
            renderProducts();
        });
    });

    // Sort functionality
    elements.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
    });

    // View mode
    elements.gridView.addEventListener('click', () => {
        state.viewMode = 'grid';
        elements.gridView.classList.add('bg-blue-600', 'text-white');
        elements.gridView.classList.remove('text-gray-700');
        elements.listView.classList.remove('bg-blue-600', 'text-white');
        elements.listView.classList.add('text-gray-700');
        renderProducts();
    });

    elements.listView.addEventListener('click', () => {
        state.viewMode = 'list';
        elements.listView.classList.add('bg-blue-600', 'text-white');
        elements.listView.classList.remove('text-gray-700');
        elements.gridView.classList.remove('bg-blue-600', 'text-white');
        elements.gridView.classList.add('text-gray-700');
        renderProducts();
    });

    // Mobile menu
    elements.mobileMenuButton.addEventListener('click', () => toggleMobileMenu(true));
    elements.closeMobileMenu.addEventListener('click', () => toggleMobileMenu(false));
}

// Toggle cart sidebar
function toggleCart(open) {
    state.isCartOpen = open;
    if (open) {
        elements.cartSidebar.classList.remove('hidden');
        setTimeout(() => {
            elements.cartSidebar.classList.add('opacity-100');
        }, 10);
    } else {
        elements.cartSidebar.classList.remove('opacity-100');
        setTimeout(() => {
            elements.cartSidebar.classList.add('hidden');
        }, 300);
    }
}

// Toggle mobile menu
function toggleMobileMenu(open) {
    state.isMobileMenuOpen = open;
    if (open) {
        elements.mobileMenu.classList.remove('-translate-x-full');
        elements.mobileMenu.classList.add('translate-x-0');
    } else {
        elements.mobileMenu.classList.remove('translate-x-0');
        elements.mobileMenu.classList.add('-translate-x-full');
    }
}

// Add to cart
function addToCart(product) {
    const existingItem = state.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cartItems.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

// Remove from cart
function removeFromCart(productId) {
    state.cartItems = state.cartItems.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity === 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = state.cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
    }
}

// Toggle wishlist
function toggleWishlist(product) {
    const isInWishlist = state.wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
        state.wishlistItems = state.wishlistItems.filter(item => item.id !== product.id);
    } else {
        state.wishlistItems.push(product);
    }
    
    updateWishlistUI();
}

// Update cart UI
function updateCartUI() {
    const cartItemsCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart count
    if (cartItemsCount > 0) {
        elements.cartCount.textContent = cartItemsCount;
        elements.cartCount.classList.remove('hidden');
        elements.cartCountHeader.textContent = cartItemsCount;
    } else {
        elements.cartCount.classList.add('hidden');
        elements.cartCountHeader.textContent = '0';
    }
    
    // Update cart items
    elements.cartItemsContainer.innerHTML = '';
    
    if (state.cartItems.length === 0) {
        elements.emptyCart.classList.remove('hidden');
        elements.cartItemsContainer.classList.add('hidden');
        elements.cartFooter.classList.add('hidden');
    } else {
        elements.emptyCart.classList.add('hidden');
        elements.cartItemsContainer.classList.remove('hidden');
        elements.cartFooter.classList.remove('hidden');
        
        state.cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'flex items-center space-x-4 bg-gray-50 p-4 rounded-lg';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${item.name}</h4>
                    <p class="text-gray-600">$${item.price}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i data-lucide="minus" class="w-4 h-4"></i>
                        </button>
                        <span class="font-medium">${item.quantity}</span>
                        <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${item.id})">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            `;
            elements.cartItemsContainer.appendChild(cartItemElement);
        });
        
        elements.cartTotal.textContent = `$${cartTotal.toFixed(2)}`;
    }
    
    lucide.createIcons();
}

// Update wishlist UI
function updateWishlistUI() {
    if (state.wishlistItems.length > 0) {
        elements.wishlistCount.textContent = state.wishlistItems.length;
        elements.wishlistCount.classList.remove('hidden');
    } else {
        elements.wishlistCount.classList.add('hidden');
    }
}

// Filter and sort products
function getFilteredProducts() {
    let filtered = products.filter(product => {
        const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;
        const matchesPrice = product.price >= state.priceRange[0] && product.price <= state.priceRange[1];
        const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    // Sort products
    switch (state.sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Featured (no sorting)
            break;
    }

    return filtered;
}

// Render products
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const viewMode = state.viewMode;
    
    elements.productsContainer.className = viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
        : 'grid grid-cols-1 gap-6';
    
    elements.productsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const isInWishlist = state.wishlistItems.some(item => item.id === product.id);
        
        const productElement = document.createElement('div');
        productElement.className = `group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden product-card ${
            viewMode === 'list' ? 'flex' : ''
        }`;
        
        productElement.innerHTML = `
            <div class="${viewMode === 'list' ? 'w-1/3' : ''} relative">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="${viewMode === 'list' ? 'h-full' : 'h-64'} w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                ${product.isNew ? `
                    <span class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        New
                    </span>
                ` : ''}
                ${product.originalPrice ? `
                    <span class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Sale
                    </span>
                ` : ''}
                <button
                    onclick="toggleWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                    class="absolute ${product.originalPrice ? 'top-12' : 'top-3'} right-3 p-2 rounded-full transition-all ${
                        isInWishlist 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                    }"
                >
                    <i data-lucide="heart" class="w-4 h-4"></i>
                </button>
            </div>

            <div class="${viewMode === 'list' ? 'flex-1' : ''} p-6">
                <div class="flex items-center mb-2">
                    <div class="flex items-center">
                        ${Array.from({ length: 5 }, (_, i) => `
                            <i data-lucide="star" class="w-4 h-4 ${
                                i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                            }"></i>
                        `).join('')}
                    </div>
                    <span class="text-sm text-gray-600 ml-2">(${product.reviews})</span>
                </div>

                <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ${product.name}
                </h3>
                
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>

                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-2xl font-bold text-gray-900">
                            $${product.price}
                        </span>
                        ${product.originalPrice ? `
                            <span class="text-lg text-gray-500 line-through">
                                $${product.originalPrice}
                            </span>
                        ` : ''}
                    </div>
                </div>

                <div class="flex space-x-2 mt-4">
                    <button
                        onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                        class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Add to Cart
                    </button>
                    <button class="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <i data-lucide="eye" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;
        
        elements.productsContainer.appendChild(productElement);
    });
    
    lucide.createIcons();
}

// Make functions available globally for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleWishlist = toggleWishlist;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);