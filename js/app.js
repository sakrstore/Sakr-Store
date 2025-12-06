// Sakr Store App Logic

// --- Configuration ---
const config = {
  whatsappNumber: '201108563748',
};

// --- Google Analytics Helper ---
/**
 * Safely sends events to Google Analytics with retry logic and console logging
 * @param {string} eventName - The GA4 event name
 * @param {object} eventData - The event parameters
 * @param {number} retries - Number of retry attempts (default: 3)
 */
function sendGAEvent(eventName, eventData, retries = 3) {
  if (typeof gtag !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    try {
      gtag('event', eventName, eventData);
      console.log(`✅ GA Event Sent: ${eventName}`, eventData);
      return true;
    } catch (error) {
      console.error(`❌ GA Event Error: ${eventName}`, error);
      return false;
    }
  } else if (retries > 0) {
    // gtag not ready yet, retry after 200ms
    console.log(`⏳ Waiting for gtag... (${retries} retries left)`);
    setTimeout(() => sendGAEvent(eventName, eventData, retries - 1), 200);
  } else {
    console.warn(`⚠️ GA Event Failed (gtag not loaded): ${eventName}`, eventData);
    // Fallback: push directly to dataLayer
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: eventName,
        ...eventData
      });
      console.log(`📊 Pushed to dataLayer: ${eventName}`);
    }
  }
}

// --- Image Helper Functions ---
/**
 * Generates responsive image HTML with WebP support
 * @param {string} src - The image source path (WebP)
 * @param {string} alt - Alt text for the image
 * @param {string} className - Optional CSS class for the img element
 * @param {boolean} lazy - Whether to use lazy loading (default: true)
 * @returns {string} HTML string for img element
 */
function generateResponsiveImage(src, alt = '', className = '', lazy = true) {
  if (!src) return `<img src="" alt="${alt}" class="${className}" loading="${lazy ? 'lazy' : 'eager'}">`;
  
  const loadingAttr = lazy ? 'loading="lazy"' : '';
  
  return `<img src="${src}" alt="${alt}" class="${className}" ${loadingAttr}>`;
}

/**
 * Creates a simple img element with lazy loading
 * @param {string} src - The image source path
 * @param {string} alt - Alt text for the image
 * @param {string} className - Optional CSS class
 * @param {boolean} lazy - Whether to use lazy loading (default: true)
 * @returns {string} HTML string for img element
 */
function generateSimpleImage(src, alt = '', className = '', lazy = true) {
  const loadingAttr = lazy ? 'loading="lazy"' : '';
  return `<img src="${src}" alt="${alt}" class="${className}" ${loadingAttr}>`;
}

// --- Arabic Language Detection ---
/**
 * Detects if text contains Arabic characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Arabic characters
 */
function hasArabic(text) {
  if (!text) return false;
  // Arabic Unicode range: \u0600-\u06FF (Arabic), \u0750-\u077F (Arabic Supplement)
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicRegex.test(text);
}

/**
 * Gets the text direction based on content
 * @param {string} text - Text to analyze
 * @returns {string} 'rtl' for Arabic, 'ltr' otherwise
 */
function getTextDirection(text) {
  return hasArabic(text) ? 'rtl' : 'ltr';
}

/**
 * Gets the language code based on content
 * @param {string} text - Text to analyze
 * @returns {string} 'ar' for Arabic, 'en' otherwise
 */
function getLanguageCode(text) {
  return hasArabic(text) ? 'ar' : 'en';
}

// --- Mobile Menu Management ---
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('menu-overlay');
  const sidebar = document.getElementById('category-sidebar');
  const sidebarInner = sidebar ? sidebar.querySelector('.sidebar-inner') : null;
  const closeButton = sidebar ? sidebar.querySelector('.close-menu') : null;

  if (!menuToggle || !menuOverlay || !sidebar) return; // safety

  function openMenu() {
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    // move focus into sidebar for accessibility
    const focusable = sidebar.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    menuToggle.focus();
  }

  function toggleMenu() {
    if (document.body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);
  if (closeButton) closeButton.addEventListener('click', closeMenu);

  // Close menu when a category is selected (on mobile)
  const categoryList = document.getElementById('category-list');
  if (categoryList) {
    categoryList.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Ensure menu is closed when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });
}

// --- Mobile Search Expansion with Overlay ---
function initMobileSearch() {
  const searchBar = document.getElementById('search-bar');
  const searchOverlay = document.getElementById('search-overlay');
  if (!searchBar) return;

  // Function to expand search with overlay
  function expandSearch() {
    if (window.innerWidth <= 768) {
      searchBar.classList.add('expanded');
      if (searchOverlay) {
        searchOverlay.classList.add('active');
      }
      // Prevent body scroll when search is expanded
      document.body.style.overflow = 'hidden';
    }
  }

  // Function to collapse search and remove overlay
  function collapseSearch() {
    searchBar.classList.remove('expanded');
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
    }
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Expand search on mobile when clicked
  searchBar.addEventListener('click', expandSearch);

  // Collapse when clicking overlay
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function() {
      if (window.innerWidth <= 768 && !searchBar.value) {
        collapseSearch();
      }
    });
  }

  // Collapse when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && searchBar && 
        !searchBar.contains(e.target) && 
        !searchBar.value &&
        e.target !== searchOverlay) {
      collapseSearch();
    }
  });

  // Collapse on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && window.innerWidth <= 768 && searchBar.classList.contains('expanded')) {
      collapseSearch();
      searchBar.blur();
    }
  });

  // Remove expanded class when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      collapseSearch();
    }
  });
}

// --- Mobile Filter Sheet Management ---
function initMobileFilterSheet() {
  const filterBtn = document.getElementById('mobile-filter-btn');
  const filterSheet = document.getElementById('filter-sheet');
  const filterOverlay = document.getElementById('filter-sheet-overlay');
  const closeBtn = document.getElementById('close-filter-sheet');
  const applyBtn = document.getElementById('apply-filters-btn');
  const mobileSortRadios = document.querySelectorAll('input[name="mobile-sort-radio"]');
  const mobilePriceSlider = document.getElementById('mobile-price-slider');
  const mobilePriceInput = document.getElementById('mobile-price-input');

  if (!filterBtn || !filterSheet || !filterOverlay) return;

  // Temporary state for the sheet (applied only when user clicks "Apply")
  let tempSortOrder = currentSortOrder;
  let tempPriceMax = currentPriceMax;

  function openFilterSheet() {
    // Sync temporary state with current state
    tempSortOrder = currentSortOrder;
    tempPriceMax = currentPriceMax;

    // Update UI to reflect current state
    mobileSortRadios.forEach(radio => {
      radio.checked = radio.value === currentSortOrder;
    });

    if (mobilePriceSlider && mobilePriceInput) {
      const maxPrice = mobilePriceSlider.max;
      const value = currentPriceMax !== null ? currentPriceMax : maxPrice;
      mobilePriceSlider.value = value;
      mobilePriceInput.value = value;
    }

    // Show sheet with animation
    filterOverlay.classList.add('active');
    filterSheet.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeFilterSheet() {
    filterOverlay.classList.remove('active');
    filterSheet.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }

  function applyFilters() {
    // Apply temporary state to actual state
    currentSortOrder = tempSortOrder;
    currentPriceMax = tempPriceMax;

    // Update desktop UI if present
    const sortOptionsEl = document.getElementById('sort-options');
    if (sortOptionsEl) {
      sortOptionsEl.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      const btn = sortOptionsEl.querySelector(`button[data-sort="${currentSortOrder}"]`);
      if (btn) btn.classList.add('active');
    }

    const desktopPriceSlider = document.getElementById('price-slider');
    const desktopPriceInput = document.getElementById('price-range-input');
    if (desktopPriceSlider && desktopPriceInput) {
      desktopPriceSlider.value = currentPriceMax;
      desktopPriceInput.value = currentPriceMax;
    }

    // Render products with new filters
    const productListContainer = document.getElementById('product-list-container');
    if (productListContainer) {
      renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
    }

    closeFilterSheet();
  }

  // Event listeners
  if (filterBtn) {
    filterBtn.addEventListener('click', openFilterSheet);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeFilterSheet);
  }

  if (filterOverlay) {
    filterOverlay.addEventListener('click', closeFilterSheet);
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', applyFilters);
  }

  // Sort radio change
  mobileSortRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        tempSortOrder = e.target.value;
      }
    });
  });

  // Price slider change - sync with input
  if (mobilePriceSlider && mobilePriceInput) {
    mobilePriceSlider.addEventListener('input', (e) => {
      const value = Number(e.target.value);
      tempPriceMax = value;
      mobilePriceInput.value = value;
    });
    
    // Price input change - sync with slider
    mobilePriceInput.addEventListener('input', (e) => {
      let value = Number(e.target.value);
      const min = Number(mobilePriceSlider.min);
      const max = Number(mobilePriceSlider.max);
      
      // Clamp value between min and max
      if (value < min) value = min;
      if (value > max) value = max;
      
      tempPriceMax = value;
      mobilePriceSlider.value = value;
      mobilePriceInput.value = value;
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterSheet.classList.contains('active')) {
      closeFilterSheet();
    }
  });

  // Update mobile slider when category changes
  window.updateMobilePriceSlider = function(maxPrice) {
    if (mobilePriceSlider && mobilePriceInput) {
      mobilePriceSlider.max = maxPrice;
      mobilePriceSlider.value = maxPrice;
      mobilePriceInput.max = maxPrice;
      mobilePriceInput.value = maxPrice;
      tempPriceMax = maxPrice;
    }
  };
}

// --- State ---
let products = []; // Cache for product data

let currentSearchTerm = ''; // New: For live search
let currentCategoryFilter = 'Featured'; // New: Default to showing featured (new) products
let currentSortOrder = 'default'; // 'default', 'price-asc', 'price-desc'
let currentPriceMax = null; // Max price from the slider

/**
 * Simple debounce helper
 * @param {Function} fn
 * @param {number} wait
 */
const debounce = (fn, wait = 250) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

// --- Images helpers (primary/gallery) ---
/**
 * Returns the primary image URL for a product, supporting the new images schema
 * with graceful fallback to legacy `image` field.
 * @param {object} product
 * @returns {string}
 */
function getPrimaryImage(product) {
  if (!product) return '';
  // New schema preferred
  if (product.images && typeof product.images === 'object') {
    if (product.images.primary) return product.images.primary;
    // If only gallery provided, pick the first item
    if (Array.isArray(product.images.gallery) && product.images.gallery.length > 0) {
      return product.images.gallery[0];
    }
  }
  // Legacy fallback
  return product.image || '';
}

// --- Cart Management ---

/**
 * Retrieves the cart from localStorage.
 * @returns {Map<string, number>} A map of product IDs to quantities.
 */
function getCart() {
  const raw = localStorage.getItem('cart');
  try {
    // Attempt to parse as a Map-like object, or an array for backward compatibility
    const data = raw ? JSON.parse(raw) : {};
    if (Array.isArray(data)) {
      // Convert old array format [1, 1, 2] to new map format {'1': 2, '2': 1}
      const newCart = new Map();
      data.forEach(id => {
        const key = String(id);
        newCart.set(key, (newCart.get(key) || 0) + 1);
      });
      return newCart;
    }
    // If it's an object, convert to a Map
    return new Map(Object.entries(data));
  } catch (err) {
    return new Map();
  }
}

/**
 * Saves the cart to localStorage.
 * @param {Map<string, number>} cart - A map of product IDs to quantities.
 */
function saveCart(cart) {
  try {
    // Convert Map to a plain object for JSON serialization
    const obj = Object.fromEntries(cart);
    localStorage.setItem('cart', JSON.stringify(obj));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

/**
 * Adds a product to the cart or increments its quantity.
 * @param {string | number} productId - The ID of the product to add.
 */
async function addToCart(productId) {
  // Ensure products are loaded first
  const allProducts = await fetchProducts();
  const product = allProducts.find(p => p.id === parseInt(productId));
  
  // Check if product is in stock
  if (product && product.stock !== undefined && product.stock === 0) {
    showToast('This product is out of stock');
    return;
  }
  
  const cart = getCart();
  const key = String(productId);
  const currentQty = cart.get(key) || 0;
  
  // Check if adding one more exceeds available stock
  if (product && product.stock !== undefined && (currentQty + 1) > product.stock) {
    showToast(`Only ${product.stock} available in stock`);
    return;
  }
  
  cart.set(key, currentQty + 1);
  saveCart(cart);
  // Show the modern notification card
  showToast(productId + ' added to cart');
  updateCartCounter();
  
  // Track add to cart in Google Analytics
  console.log('🛒 Add to cart called for product ID:', productId);
  console.log('🔍 Product found:', product);
  
  if (product) {
    sendGAEvent('add_to_cart', {
      currency: 'EGP',
      value: (product.discount ? product.discountedPrice : product.price),
      items: [{
        item_id: String(product.id),
        item_name: product.name,
        item_category: product.category || 'Uncategorized',
        price: product.discount ? product.discountedPrice : product.price,
        quantity: 1
      }]
    });
  } else {
    console.warn('⚠️ Product not found for GA tracking. Product ID:', productId);
    console.warn('Available products:', allProducts.length, 'items');
  }
  
  // Update button state after adding to cart
  updateAddToCartButton(productId, currentQty + 1);
}

/**
 * Updates the add to cart button state based on stock availability.
 * @param {string | number} productId - The ID of the product.
 * @param {number} cartQty - Current quantity in cart.
 */
function updateAddToCartButton(productId, cartQty) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product || product.stock === undefined) return;
  
  // Find all buttons for this product
  const buttons = document.querySelectorAll(`.add-to-cart[data-product-id="${productId}"]`);
  
  buttons.forEach(button => {
    const textElement = button.querySelector('.text');
    
    if (cartQty >= product.stock) {
      // Disable button when cart quantity equals or exceeds stock
      button.disabled = true;
      button.classList.add('disabled');
      if (textElement) {
        textElement.textContent = 'Out of Stock';
      }
    } else {
      // Enable button if there's still stock available
      button.disabled = false;
      button.classList.remove('disabled');
      if (textElement) {
        textElement.textContent = 'Add to Cart';
      }
    }
  });
}

/**
 * Removes a product from the cart entirely.
 * @param {string | number} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
  const cart = getCart();
  cart.delete(String(productId));
  saveCart(cart);
  updateCartCounter();
  
  // Re-enable the add to cart button
  updateAddToCartButton(productId, 0);
}

/**
 * Updates the quantity of a product in the cart.
 * @param {string | number} productId - The ID of the product to update.
 * @param {number} quantity - The new quantity. If 0, removes the item.
 */
function updateCartQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
  } else {
    const cart = getCart();
    cart.set(String(productId), quantity);
    saveCart(cart);
    updateCartCounter();
    
    // Update button state
    updateAddToCartButton(productId, quantity);
  }
}

/**
 * Clears all items from the cart.
 */
function clearCart() {
  localStorage.removeItem('cart');
  updateCartCounter();
}

// --- Product & UI Rendering ---

/**
 * Truncates text to a maximum length and adds ellipsis if needed.
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum length of the text.
 * @returns {string} The truncated text with ellipsis if needed.
 */
function truncateText(text, maxLength = 50) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Fetches products from the server.
 * @returns {Promise<Array<object>>} A promise that resolves to the products array.
 */
async function fetchProducts() {
  if (products.length > 0) {
    return products; // Return from cache
  }
  try {
    const res = await fetch('products.json');
    if (!res.ok) throw new Error('Network response was not ok');
    products = await res.json();
    return products;
  } catch (err) {
    console.error('Failed to load products', err);
    throw err; // Re-throw to handle in calling code
  }
}

/**
 * Renders a skeleton loader while products are being fetched.
 * @param {HTMLElement} container - The element to render into.
 * @param {number} count - Number of skeleton cards to show.
 */
function renderSkeletonLoader(container, count = 6) {
  if (!container) return;
  
  const loaderDiv = document.createElement('div');
  loaderDiv.className = 'skeleton-loader';
  loaderDiv.setAttribute('aria-label', 'Loading products');
  
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
      <div class="skeleton-text medium"></div>
      <div class="skeleton-button"></div>
    `;
    loaderDiv.appendChild(card);
  }
  
  container.innerHTML = '';
  container.appendChild(loaderDiv);
}

/**
 * Renders an empty state when no products match filters.
 * @param {HTMLElement} container - The element to render into.
 */
function renderEmptyState(container) {
  if (!container) return;
  
  const emptyDiv = document.createElement('div');
  emptyDiv.className = 'empty-state';
  emptyDiv.setAttribute('role', 'status');
  emptyDiv.innerHTML = `
    <div class="empty-state-icon">
      <i class="ri-search-line"></i>
    </div>
    <h2 class="empty-state-title">No Products Found</h2>
    <p class="empty-state-message">
      We couldn't find any products matching your current filters or search criteria.
    </p>
    <div class="empty-state-suggestions">
      <h4><i class="ri-lightbulb-line"></i> Try the following:</h4>
      <ul>
        <li>Clear your search or try different keywords</li>
        <li>Select a different category</li>
        <li>Adjust the price range filter</li>
        <li>Browse all products by selecting "All" category</li>
      </ul>
    </div>
  `;
  
  container.innerHTML = '';
  container.appendChild(emptyDiv);
}

/**
 * Renders an error state when products fail to load.
 * @param {HTMLElement} container - The element to render into.
 * @param {Function} retryCallback - Function to call when retry button is clicked.
 */
function renderErrorState(container, retryCallback) {
  if (!container) return;
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-state';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.innerHTML = `
    <div class="error-state-icon">
      <i class="ri-error-warning-line"></i>
    </div>
    <h2 class="error-state-title">Oops! Something Went Wrong</h2>
    <p class="error-state-message">
      We're having trouble loading the products. This could be due to a network issue or server problem.
    </p>
    <div class="error-state-details">
      <code>Failed to load products.json</code>
    </div>
    <button class="retry-button" id="retry-load-btn">
      <i class="ri-refresh-line"></i>
      <span>Try Again</span>
    </button>
  `;
  
  container.innerHTML = '';
  container.appendChild(errorDiv);
  
  // Add retry button event listener
  const retryBtn = errorDiv.querySelector('#retry-load-btn');
  if (retryBtn && retryCallback) {
    retryBtn.addEventListener('click', async () => {
      retryBtn.classList.add('loading');
      retryBtn.querySelector('span').textContent = 'Retrying...';
      await retryCallback();
      retryBtn.classList.remove('loading');
      retryBtn.querySelector('span').textContent = 'Try Again';
    });
  }
}

/**
 * Renders product cards into a container, optionally filtered by category.
 * @param {HTMLElement} container - The element to render into.
 * @param {string} [searchTerm=''] - The search term to filter by.
 * @param {string} [categoryFilter='All'] - The category to filter by.
 * @param {string} [sortOrder='default'] - The sort order.
 * @param {number|null} [priceMax=null] - The maximum price.
 */
function renderProducts(container, searchTerm = '', categoryFilter = 'All', sortOrder = 'default', priceMax = null) {
  if (!container) return;
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'product-grid';

  // 1. Filter by search term (name and description)
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
  let filteredProducts = products;
  if (lowerCaseSearchTerm) {
    filteredProducts = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (p.description && p.description.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }

  // 2. Filter by category or discounts
  filteredProducts = filteredProducts.filter(p => {
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Featured') return !!p.isNew;
    if (categoryFilter === 'Discounts') return !!p.discount;
    return p.category && p.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  // 3. Filter by price (if a max price is set)
  if (priceMax !== null) {
    filteredProducts = filteredProducts.filter(p => (Number(p.price) || 0) <= priceMax);
  }

  // 4. Sort the products
  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  }
  // 'default' order doesn't require sorting

  if (filteredProducts.length === 0) {
    renderEmptyState(container);
    return;
  }

  filteredProducts.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    
    // Detect language for product name and description
    const nameLang = getLanguageCode(p.name);
    const nameDir = getTextDirection(p.name);
    const descLang = getLanguageCode(p.description);
    const descDir = getTextDirection(p.description);
    
    let priceHtml = '';
    if (p.discount) {
      priceHtml = `
        <span class="product-original-price no-break">EGP ${(Number(p.price) || 0).toFixed(2)}</span>
        <span class="product-discounted-price no-break">EGP ${(Number(p.discountedPrice) || 0).toFixed(2)}</span>
      `;
    } else {
      priceHtml = `<span class="product-price no-break">EGP ${(Number(p.price) || 0).toFixed(2)}</span>`;
    }
    
    // Add badges for "New" and "Sale" - they can coexist
    const newBadge = p.isNew ? '<span class="new-badge">New</span>' : '';
    const saleBadge = p.discount ? '<span class="sale-badge">Sale</span>' : '';
    
    // Check current cart quantity for this product
    const cart = getCart();
    const cartQty = cart.get(String(p.id)) || 0;
    
    // Check if product is out of stock or cart is full
    const isOutOfStock = (p.stock !== undefined && p.stock === 0) || (p.stock !== undefined && cartQty >= p.stock);
    const buttonDisabled = isOutOfStock ? 'disabled' : '';
    const buttonClass = isOutOfStock ? 'CartBtn add-to-cart disabled' : 'CartBtn add-to-cart';
    const buttonText = isOutOfStock ? 'Out of Stock' : 'Add to Cart';
    
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="product-link product-card-link" aria-label="${p.name || 'View product'}">
        <div class="product-media">
          ${newBadge}
          ${saleBadge}
          ${generateSimpleImage(getPrimaryImage(p), p.name || 'Product image', '', true)}
        </div>
        <h3 class="product-name" lang="${nameLang}" dir="${nameDir}">${p.name || 'Untitled'}</h3>
        <p class="product-desc product-description" lang="${descLang}" dir="${descDir}">${truncateText(p.description)}</p>
      </a>
      <div class="product-card-footer">
        <div class="product-price-block vertical-price-block">${priceHtml}</div>
        <button class="${buttonClass}" data-product-id="${p.id}" type="button" ${buttonDisabled}>
          <span class="IconContainer"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
          </span>
          <p class="text">${buttonText}</p>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
/**
 * Renders the items in the shopping cart.
 * @param {HTMLElement} container - The cart items container.
 * @param {HTMLElement} totalSpan - The span for the total price.
 */
async function renderCart(container, totalSpan) {

  const cart = getCart();
  const allProducts = await fetchProducts();

  // Get empty cart state element
  const emptyCartState = document.getElementById('empty-cart-state');
  const subtotalSpan = document.getElementById('subtotal-price');
  const orderForm = document.getElementById('customer-form');
  const orderSummary = document.querySelector('.order-summary');

  // Empty cart state
  if (cart.size === 0) {
    container.innerHTML = '';
    if (emptyCartState) {
      emptyCartState.style.display = 'flex';
    }
    if (totalSpan) totalSpan.textContent = '0.00';
    if (subtotalSpan) subtotalSpan.textContent = 'EGP 0.00';
    
    // Hide order form when cart is empty
    if (orderForm) orderForm.style.display = 'none';
    if (orderSummary) orderSummary.style.opacity = '0.6';
    
    return;
  } else {
    if (emptyCartState) {
      emptyCartState.style.display = 'none';
    }
    if (orderForm) orderForm.style.display = 'block';
    if (orderSummary) orderSummary.style.opacity = '1';
  }

  container.innerHTML = ''; // Clear previous content
  let total = 0;

  for (const [id, qty] of cart.entries()) {
    const product = allProducts.find(p => String(p.id) === id);
    if (!product) continue;

    let itemTotal = 0;
    let priceDisplay = '';
    let unitPrice = 0;
    
    if (product.discount) {
      unitPrice = Number(product.discountedPrice) || 0;
      itemTotal = unitPrice * qty;
      const originalPrice = Number(product.price) || 0;
      priceDisplay = `
        <span class="cart-item-original-price">EGP ${originalPrice.toFixed(2)}</span>
        <span class="cart-item-discounted-price">EGP ${unitPrice.toFixed(2)}</span>
      `;
    } else {
      unitPrice = Number(product.price) || 0;
      itemTotal = unitPrice * qty;
      priceDisplay = `EGP ${unitPrice.toFixed(2)}`;
    }
    total += itemTotal;

    // Get product image using the helper function
    const productImage = getPrimaryImage(product) || 'images/placeholder.jpg';

    // Check stock status
    let stockWarning = '';
    let canIncrease = true;
    let canDecrease = qty > 1;
    
    if (product.stock !== undefined) {
      canIncrease = qty < product.stock;
      
      if (qty > product.stock) {
        stockWarning = `<p class="stock-warning error">⚠️ Only ${product.stock} available</p>`;
      } else if (product.stock <= 5 && product.stock > 0) {
        stockWarning = `<p class="stock-warning warning">⚠️ Only ${product.stock} left in stock</p>`;
      } else if (product.stock === 0) {
        stockWarning = `<p class="stock-warning out-of-stock">⛔ Out of stock</p>`;
        canIncrease = false;
      }
    }

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    
    // Detect language for product name
    const nameLang = getLanguageCode(product.name);
    const nameDir = getTextDirection(product.name);
    
    // Add badges for "New" and "Sale" - they can coexist
    const newBadge = product.isNew ? '<span class="cart-new-badge">New</span>' : '';
    const discountBadge = product.discount ? '<span class="cart-discount-badge">Sale</span>' : '';
    
    // Set direction on the cart item itself for proper RTL layout
    if (nameDir === 'rtl') {
      itemEl.setAttribute('dir', 'rtl');
    }
    
    itemEl.innerHTML = `
      <div class="cart-item-image">
        ${generateSimpleImage(productImage, product.name, '', true)}
        ${newBadge}
        ${discountBadge}
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name" lang="${nameLang}" dir="${nameDir}">${product.name}</h3>
        <p class="cart-item-price">${priceDisplay}</p>
        ${stockWarning}
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-change" data-id="${id}" data-change="-1" aria-label="Decrease quantity" ${!canDecrease ? 'disabled' : ''}>−</button>
        <span class="cart-item-qty">${qty}</span>
        <button class="quantity-change" data-id="${id}" data-change="1" aria-label="Increase quantity" ${!canIncrease ? 'disabled' : ''}>+</button>
      </div>
      <div class="cart-item-remove">
        <button class="remove-item" data-id="${id}" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `;
    container.appendChild(itemEl);
  }

  if (totalSpan) totalSpan.textContent = total.toFixed(2);
  if (subtotalSpan) subtotalSpan.textContent = `EGP ${total.toFixed(2)}`;
  
  // Update coupon discount if one is applied
  updateCartWithCoupon();
}

/**
 * Shows a modern slide-in notification card with improved logic and animations.
 * Ensures only one notification is shown at a time and handles proper cleanup.
 * @param {string|number} message The message to display (product ID or "productId added to cart").
 * @param {object} productData Optional product object to use instead of fetching.
 */
async function showToast(message, productData = null) {
  // Remove any existing notifications first
  const existingToasts = document.querySelectorAll('.notification-card');
  existingToasts.forEach(toast => {
    if (toast.parentElement) {
      toast.remove();
    }
  });
  
  // Find the product details
  const productId = parseInt(String(message).split(' ')[0]);
  let product = productData;
  
  // If product data not provided, try to find it from the global products array
  if (!product) {
    if (typeof products !== 'undefined' && products.length > 0) {
      product = products.find(p => p.id === productId);
    } else {
      // Fetch products if not available
      try {
        const response = await fetch('products.json');
        const allProducts = await response.json();
        product = allProducts.find(p => p.id === productId);
      } catch (error) {
        console.error('Error fetching product for notification:', error);
        return;
      }
    }
  }
  
  if (!product) {
    console.warn('Product not found for notification');
    return;
  }
  
  // Create notification element
  const toast = document.createElement('div');
  toast.className = 'notification-card';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  // Format price display
  let priceDisplay = '';
  if (product.discount && product.discountedPrice) {
    // Use the pre-calculated discounted price from the product data
    priceDisplay = `EGP ${(Number(product.discountedPrice) || 0).toFixed(2)}`;
  } else {
    priceDisplay = `EGP ${(Number(product.price) || 0).toFixed(2)}`;
  }
  
  toast.innerHTML = `
    <div class="notification-wrapper">
      <div class="notification-icon">
        <div class="icon-cart-box">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 576 512">
            <path fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </div>
      </div>

      <div class="notification-content">
        <div class="notification-title-wrapper">
          <span class="notification-title">Added to cart!</span>
          <button class="notification-close" aria-label="Close notification">
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
            </svg>
          </button>
        </div>
        <div class="notification-product">${product.name}</div>
        <div class="notification-price">${priceDisplay}</div>
        <button class="notification-button" type="button">
          View cart
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  // Append to body
  document.body.appendChild(toast);
  
  // Dismiss function with cleanup
  const dismissNotification = () => {
    if (!toast.parentElement) return; // Already removed
    
    toast.classList.add('slideOut');
    
    // Remove after animation completes
    const handleAnimationEnd = () => {
      toast.removeEventListener('animationend', handleAnimationEnd);
      if (toast.parentElement) {
        toast.remove();
      }
    };
    
    toast.addEventListener('animationend', handleAnimationEnd);
    
    // Fallback timeout in case animation doesn't fire
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 500);
  };

  // Close button handler
  const closeBtn = toast.querySelector('.notification-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissNotification();
    });
  }
  
  // View cart button handler
  const viewCartBtn = toast.querySelector('.notification-button');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }

  // Auto-dismiss after 5 seconds
  const autoDismissTimer = setTimeout(() => {
    if (toast.parentElement) {
      dismissNotification();
    }
  }, 5000);
  
  // Clear timer if manually closed
  toast.addEventListener('click', (e) => {
    if (e.target.closest('.notification-close') || e.target.closest('.notification-button')) {
      clearTimeout(autoDismissTimer);
    }
  });
  
  // Dismiss on escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && toast.parentElement) {
      dismissNotification();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
}

/**
 * Updates the cart counter in the header.
 */
function updateCartCounter() {
  const counters = document.querySelectorAll('.cart-count');
  if (counters.length === 0) return;

  const cart = getCart();
  const totalItems = Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);

  counters.forEach(counter => {
    counter.textContent = `${totalItems}`;
    counter.style.display = totalItems > 0 ? 'inline' : 'none';
  });
}

// --- Event Handlers & Page Initializers ---

/**
 * Initializes the main product listing page.
 */
async function initMainPage() {
      const searchBarEl = document.getElementById('search-bar');
      const productListContainer = document.getElementById('product-list-container');
      const categoryListEl = document.getElementById('category-list');
      const sortOptionsEl = document.getElementById('sort-options');
      const priceSliderEl = document.getElementById('price-slider');
      const priceInputEl = document.getElementById('price-range-input');
    
      if (!productListContainer || !categoryListEl) return;
    
      // Show skeleton loader while fetching products
      renderSkeletonLoader(productListContainer, 6);
      
      // Function to update the price slider's range and value
      const updatePriceSlider = () => {
        // Guard clause: If slider elements don't exist, do nothing.
        if (!priceSliderEl || !priceInputEl) return;

        const relevantProducts = products.filter(p => {
          if (currentCategoryFilter === 'All') return true;
          if (currentCategoryFilter === 'Featured') return !!p.isNew;
          if (currentCategoryFilter === 'Discounts') return !!p.discount;
          return p.category && p.category.toLowerCase() === currentCategoryFilter.toLowerCase();
        });
        
        if (relevantProducts.length === 0) {
          priceSliderEl.min = 0;
          priceSliderEl.max = 0;
          priceSliderEl.value = 0;
          priceInputEl.min = 0;
          priceInputEl.max = 0;
          priceInputEl.value = 0;
          currentPriceMax = 0;
          currentPriceMax = null; // Reset price filter
          // Update mobile slider
          if (window.updateMobilePriceSlider) window.updateMobilePriceSlider(0);
        } else {
          const maxPrice = Math.ceil(Math.max(0, ...relevantProducts.map(p => Number(p.price) || 0)));
          priceSliderEl.max = maxPrice;
          priceSliderEl.value = maxPrice; // Set slider to max initially
          priceInputEl.max = maxPrice;
          priceInputEl.value = maxPrice;
          currentPriceMax = maxPrice; // Update state
          // Update mobile slider
          if (window.updateMobilePriceSlider) window.updateMobilePriceSlider(maxPrice);
        }
      };
      
      // Function to load products with error handling
      const loadProducts = async () => {
        try {
          renderSkeletonLoader(productListContainer, 6);
          await fetchProducts(); // Populate the global 'products' array
          
          // Populate categories sidebar
          // Build categories: Featured, Discounts, All, then the rest
          const categories = ['Featured', 'Discounts', 'All'];
          const categorySet = new Set();
          products.forEach(p => {
            if (p.category) {
              categorySet.add(p.category);
            }
          });
          categories.push(...Array.from(categorySet));

          categoryListEl.innerHTML = '';
          categories.forEach(category => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = category;
            button.setAttribute('data-category', category);
            
            // Add language attributes for Arabic categories
            if (hasArabic(category)) {
              button.setAttribute('lang', 'ar');
              button.setAttribute('dir', 'rtl');
            }
            
            if (category === currentCategoryFilter) {
              button.classList.add('active');
            }
            li.appendChild(button);
            categoryListEl.appendChild(li);
          });
          
          // Update slider and render products
          updatePriceSlider();
          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
          
        } catch (err) {
          console.error('Error loading products:', err);
          renderErrorState(productListContainer, loadProducts);
        }
      };
      
      // Initial load
      await loadProducts();
    
      // Event listener for category clicks
      categoryListEl.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('button[data-category]')) {
          const selectedCategory = target.getAttribute('data-category');
          currentCategoryFilter = selectedCategory;
    
          categoryListEl.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
          target.classList.add('active');
    
          // Update breadcrumb on index page
          const breadcrumbCategory = document.getElementById('breadcrumb-category');
          if (breadcrumbCategory) {
            breadcrumbCategory.textContent = selectedCategory === 'All' ? 'All Products' : 
                                              selectedCategory === 'Featured' ? 'Featured Products' :
                                              selectedCategory === 'Discounts' ? 'Special Discounts' :
                                              selectedCategory;
          }

          // Update slider and re-render products
          updatePriceSlider();
          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
        }
      });

      // Event listener for sort buttons (desktop)
      if (sortOptionsEl) {
        sortOptionsEl.addEventListener('click', (e) => {
          const target = e.target;
          if (target.matches('button[data-sort]')) {
            currentSortOrder = target.getAttribute('data-sort');

            sortOptionsEl.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');

            // Keep mobile select in sync (if present)
            const mobileSortEl = document.getElementById('mobile-sort');
            if (mobileSortEl) mobileSortEl.value = currentSortOrder;

            renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
          }
        });
      }

      // Mobile compact sort control (select) — visible only on small screens via CSS
      const mobileSortEl = document.getElementById('mobile-sort');
      if (mobileSortEl) {
        // Initialize from current state
        mobileSortEl.value = currentSortOrder || 'default';
        mobileSortEl.addEventListener('change', (e) => {
          const val = e.target.value;
          currentSortOrder = val;

          // Update desktop buttons active state if present
          if (sortOptionsEl) {
            sortOptionsEl.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            const btn = sortOptionsEl.querySelector(`button[data-sort="${val}"]`);
            if (btn) btn.classList.add('active');
          }

          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
        });
      }

      // Event listener for price slider - sync with input
      if (priceSliderEl && priceInputEl) {
        priceSliderEl.addEventListener('input', (e) => {
          const value = Number(e.target.value);
          currentPriceMax = value;
          priceInputEl.value = value;
        });
        priceSliderEl.addEventListener('change', () => {
          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
        });
        
        // Event listener for price input - sync with slider
        priceInputEl.addEventListener('input', (e) => {
          let value = Number(e.target.value);
          const min = Number(priceSliderEl.min);
          const max = Number(priceSliderEl.max);
          
          // Clamp value between min and max
          if (value < min) value = min;
          if (value > max) value = max;
          
          currentPriceMax = value;
          priceSliderEl.value = value;
          priceInputEl.value = value;
        });
        priceInputEl.addEventListener('change', () => {
          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
        });
      }

      // Event listener for the search bar (debounced)
      if (searchBarEl) {
        const handleSearchInput = (e) => {
          currentSearchTerm = e.target.value;
          renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
        };
        const debouncedSearch = debounce(handleSearchInput, 250); // 250ms debounce
        searchBarEl.addEventListener('input', debouncedSearch);
      }
    
      // Event listener for add to cart buttons
      productListContainer.addEventListener('click', async (e) => {
        const btn = e.target.closest('.add-to-cart');
        if (btn) {
          const productId = btn.getAttribute('data-product-id');
          await addToCart(productId);
        }
      });
}

/**
 * Initializes the shopping cart page.
 */
async function initCartPage() {
  const cartContainer = document.getElementById('cart-items-container');
  const totalSpan = document.getElementById('total-price');
  if (!cartContainer) return;

  await renderCart(cartContainer, totalSpan);

  cartContainer.addEventListener('click', async (e) => {
    const target = e.target;
    
    // Handle remove button - check if clicked element or its parent is the remove button
    const removeBtn = target.closest('.remove-item');
    if (removeBtn) {
      const productId = removeBtn.getAttribute('data-id');
      removeFromCart(productId);
      renderCart(cartContainer, totalSpan); // Re-render
      return;
    }
    
    // Handle quantity change buttons
    const quantityBtn = target.closest('.quantity-change');
    if (quantityBtn) {
      const productId = quantityBtn.getAttribute('data-id');
      const change = parseInt(quantityBtn.getAttribute('data-change'), 10);
      const cart = getCart();
      const currentQty = cart.get(productId) || 0;
      const newQty = currentQty + change;
      
      // Check stock availability if increasing quantity
      if (change > 0) {
        const allProducts = await fetchProducts();
        const product = allProducts.find(p => String(p.id) === productId);
        if (product && product.stock !== undefined && newQty > product.stock) {
          alert(`Sorry, only ${product.stock} items available in stock.`);
          return;
        }
      }
      
      updateCartQuantity(productId, newQty);
      renderCart(cartContainer, totalSpan); // Re-render
    }
  });
}

/**
 * Validates Egyptian phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid Egyptian mobile number
 */
function validateEgyptianPhone(phone) {
  // Remove any spaces, dashes, or other formatting
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Must be exactly 11 digits and start with 01
  // Valid prefixes: 010, 011, 012, 015
  const regex = /^01[0125][0-9]{8}$/;
  return regex.test(cleaned);
}

/**
 * Initializes phone validation with real-time feedback
 */
function initPhoneValidation() {
  const phoneInput = document.getElementById('customer-phone');
  const phoneError = document.getElementById('phone-error');
  const validationIcon = phoneInput?.parentElement?.querySelector('.validation-icon');
  
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const isValid = validateEgyptianPhone(value);
    
    // Update validation icon
    if (validationIcon) {
      if (value.length === 0) {
        validationIcon.className = 'validation-icon';
      } else if (isValid) {
        validationIcon.className = 'validation-icon valid';
      } else {
        validationIcon.className = 'validation-icon invalid';
      }
    }
    
    // Update error message
    if (phoneError) {
      if (value.length > 0 && !isValid) {
        phoneError.textContent = 'Invalid Egyptian mobile number';
        phoneError.style.display = 'block';
      } else {
        phoneError.style.display = 'none';
      }
    }
  });
  
  // Validate on blur
  phoneInput.addEventListener('blur', (e) => {
    const value = e.target.value;
    if (value.length > 0 && !validateEgyptianPhone(value)) {
      phoneInput.setCustomValidity('Please enter a valid Egyptian mobile number (11 digits starting with 01)');
    } else {
      phoneInput.setCustomValidity('');
    }
  });
}

/**
 * Initializes character counter for notes field
 */
function initNotesCounter() {
  const notesField = document.getElementById('customer-notes');
  const counter = document.getElementById('notes-count');
  
  if (!notesField || !counter) return;
  
  notesField.addEventListener('input', (e) => {
    const length = e.target.value.length;
    counter.textContent = length;
    
    // Visual feedback when approaching limit
    if (length >= 180) {
      counter.style.color = 'var(--price-discount)';
    } else {
      counter.style.color = 'var(--secondary-text)';
    }
  });
}

/**
 * Initializes the checkout form.
 */
async function initCheckoutForm() {
  const form = document.getElementById('customer-form');
  if (!form) return;

  // Initialize validation helpers
  initPhoneValidation();
  initNotesCounter();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cart = getCart();
    if (cart.size === 0) {
      alert('Your cart is empty. Add products before placing an order.');
      return;
    }

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const street = (formData.get('street') || '').toString().trim();
    const governorate = (formData.get('governorate') || '').toString().trim();
    const city = (formData.get('city') || '').toString().trim();
    const notes = (formData.get('notes') || '').toString().trim();
    const payment = (formData.get('payment') || '').toString().trim();

    // Validate phone number before proceeding
    if (!validateEgyptianPhone(phone)) {
      alert('Please enter a valid Egyptian mobile number (11 digits starting with 01)');
      return;
    }

    const allProducts = await fetchProducts();
    const productMap = new Map(allProducts.map(p => [String(p.id), p]));

    let subtotal = 0;
    const lines = [];
    for (const [id, qty] of cart.entries()) {
      const product = productMap.get(id);
      if (!product) continue;
      // Use discounted price if available
      const price = product.discount ? (Number(product.discountedPrice) || 0) : (Number(product.price) || 0);
      subtotal += price * qty;
      lines.push(`- ${qty}x ${product.name} - EGP ${(price * qty).toFixed(2)}`);
    }

    // Check for applied coupon
    const appliedCoupon = getAppliedCoupon();
    let couponDiscount = 0;
    let total = subtotal;

    if (appliedCoupon) {
      // Get cart products for validation
      const cartProducts = [];
      for (const [id] of cart.entries()) {
        const product = productMap.get(id);
        if (product) cartProducts.push(product);
      }

      // Validate and calculate discount
      const couponResult = validateCoupon(appliedCoupon.code, subtotal, cartProducts);
      if (couponResult.valid) {
        couponDiscount = couponResult.discount;
        total = subtotal - couponDiscount;
      }
    }

    // Build structured WhatsApp message
    const messageParts = [
      'NEW ORDER - SAKR STORE',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      'CUSTOMER INFORMATION',
      `Name: ${name}`,
      `Phone: ${phone}`,
      '',
      'DELIVERY ADDRESS',
      `Street: ${street}`,
      `City: ${city}`,
      `Governorate: ${governorate}`
    ];

    // Add notes if provided
    if (notes) {
      messageParts.push(`Notes: ${notes}`);
    }

    messageParts.push(
      '',
      'PAYMENT METHOD',
      payment,
      '',
      'ORDER DETAILS',
      '━━━━━━━━━━━━━━━━━━━━',
      ...lines,
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      `Subtotal: EGP ${subtotal.toFixed(2)}`
    );

    // Add coupon discount if applied
    if (appliedCoupon && couponDiscount > 0) {
      const discountType = appliedCoupon.type === 'percentage' 
        ? `${appliedCoupon.amount}% off` 
        : `${appliedCoupon.amount} EGP off`;
      messageParts.push(`Discount (${appliedCoupon.code} - ${discountType}): -EGP ${couponDiscount.toFixed(2)}`);
    }

    messageParts.push(
      `TOTAL: EGP ${total.toFixed(2)}`,
      '',
      `Order Date: ${new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })}`
    );

    const message = messageParts.join('\n');
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encoded}`;

    // Track checkout steps in Google Analytics
    const items = [];
    for (const [id, qty] of cart.entries()) {
      const product = productMap.get(id);
      if (product) {
        items.push({
          item_id: String(product.id),
          item_name: product.name,
          item_category: product.category || 'Uncategorized',
          price: product.discount ? product.discountedPrice : product.price,
          quantity: qty
        });
      }
    }
    
    // Track begin_checkout event
    sendGAEvent('begin_checkout', {
      currency: 'EGP',
      value: total,
      items: items
    });

    // Track add_shipping_info event (governorate selected)
    sendGAEvent('add_shipping_info', {
      currency: 'EGP',
      value: total,
      shipping_tier: governorate,
      items: items
    });

    // Track add_payment_info event
    sendGAEvent('add_payment_info', {
      currency: 'EGP',
      value: total,
      payment_type: payment,
      items: items
    });

    // IMPORTANT UX CHANGE: Do not clear the cart automatically.
    // The user might close the WhatsApp tab without sending.
    // Let them keep their cart. You can add a "Order Sent! Clear Cart?" button on the page.
    // clearCart(); 
    window.location.href = waUrl;
  });
}

// --- Coupon Management ---

/**
 * Gets the currently applied coupon from localStorage
 */
function getAppliedCoupon() {
  const stored = localStorage.getItem('appliedCoupon');
  return stored ? JSON.parse(stored) : null;
}

/**
 * Saves the applied coupon to localStorage
 */
function setAppliedCoupon(coupon) {
  if (coupon) {
    localStorage.setItem('appliedCoupon', JSON.stringify(coupon));
  } else {
    localStorage.removeItem('appliedCoupon');
  }
}

/**
 * Validates and applies a coupon code
 * @param {string} code - The coupon code to validate
 * @param {number} subtotal - Current cart subtotal
 * @param {Array} cartProducts - Array of products in cart with categories
 * @returns {Object} - Result object with valid, message, discount, coupon
 */
function validateCoupon(code, subtotal, cartProducts) {
  if (!code || !code.trim()) {
    return { valid: false, message: 'Please enter a coupon code' };
  }

  // Load coupons from coupons.json
  let coupons = [];
  try {
    coupons = window.sakrStoreCoupons || [];
  } catch (error) {
    console.error('Failed to load coupons:', error);
    return { valid: false, message: 'Unable to load coupons. Please try again.' };
  }

  if (!coupons || coupons.length === 0) {
    return { valid: false, message: 'No coupons available at this time' };
  }

  // Find matching coupon (case-insensitive)
  const upperCode = code.trim().toUpperCase();
  const coupon = coupons.find(c => c.code.toUpperCase() === upperCode);

  if (!coupon) {
    return { valid: false, message: 'Invalid coupon code' };
  }

  // Check if coupon is enabled
  if (coupon.enabled === false) {
    return { valid: false, message: 'This coupon is no longer active' };
  }

  // Check minimum spend requirement
  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return { 
      valid: false, 
      message: `Minimum order of EGP ${coupon.minSpend.toFixed(2)} required` 
    };
  }

  // Check category restriction
  if (coupon.category && coupon.category !== 'All') {
    const hasMatchingProduct = cartProducts.some(p => 
      p.category && p.category.toLowerCase() === coupon.category.toLowerCase()
    );
    
    if (!hasMatchingProduct) {
      return { 
        valid: false, 
        message: `This coupon only works for ${coupon.category} products` 
      };
    }
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = (subtotal * coupon.amount) / 100;
    // Apply maximum discount cap if defined
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else if (coupon.type === 'fixed') {
    discountAmount = coupon.amount;
  }

  // Ensure discount doesn't exceed subtotal
  discountAmount = Math.min(discountAmount, subtotal);

  // Build success message
  let successMessage = coupon.description;
  if (!successMessage) {
    if (coupon.type === 'percentage') {
      successMessage = `${coupon.amount}% discount applied`;
      if (coupon.maxDiscount) {
        successMessage += ` (max EGP ${coupon.maxDiscount.toFixed(2)})`;
      }
    } else {
      successMessage = `${coupon.amount} EGP discount applied`;
    }
  }

  return {
    valid: true,
    message: successMessage,
    discount: discountAmount,
    coupon: coupon
  };
}

/**
 * Updates the cart display with coupon discount
 */
function updateCartWithCoupon() {
  const appliedCoupon = getAppliedCoupon();
  const discountRow = document.getElementById('discount-row');
  const discountAmount = document.getElementById('discount-amount');
  const appliedCode = document.getElementById('applied-coupon-code');
  const subtotalSpan = document.getElementById('subtotal-price');
  const totalSpan = document.getElementById('total-price');

  if (!appliedCoupon || !discountRow) return;

  const subtotalText = subtotalSpan ? subtotalSpan.textContent : 'EGP 0.00';
  const subtotal = parseFloat(subtotalText.replace('EGP', '').trim()) || 0;

  // Get cart products for validation
  const cart = getCart();
  const cartProducts = [];
  
  fetchProducts().then(allProducts => {
    for (const [id] of cart.entries()) {
      const product = allProducts.find(p => String(p.id) === id);
      if (product) cartProducts.push(product);
    }

    // Re-validate coupon with current cart
    const result = validateCoupon(appliedCoupon.code, subtotal, cartProducts);
    
    if (result.valid) {
      // Show discount row
      discountRow.style.display = 'flex';
      if (appliedCode) appliedCode.textContent = appliedCoupon.code;
      if (discountAmount) discountAmount.textContent = `-EGP ${result.discount.toFixed(2)}`;
      
      // Update total
      const newTotal = subtotal - result.discount;
      if (totalSpan) totalSpan.textContent = newTotal.toFixed(2);
    } else {
      // Coupon no longer valid, remove it
      setAppliedCoupon(null);
      discountRow.style.display = 'none';
      if (totalSpan) totalSpan.textContent = subtotal.toFixed(2);
    }
  });
}

/**
 * Loads coupons from coupons.json
 */
async function loadCoupons() {
  try {
    const response = await fetch('coupons.json');
    if (!response.ok) {
      throw new Error('Failed to fetch coupons');
    }
    window.sakrStoreCoupons = await response.json();
  } catch (error) {
    console.error('Error loading coupons:', error);
    window.sakrStoreCoupons = [];
  }
}

/**
 * Initializes coupon functionality on cart page
 */
async function initCouponSystem() {
  // Load coupons first
  await loadCoupons();
  
  const couponInput = document.getElementById('coupon-input');
  const applyBtn = document.getElementById('apply-coupon-btn');
  const removeBtn = document.getElementById('remove-coupon-btn');
  const couponMessage = document.getElementById('coupon-message');
  const discountRow = document.getElementById('discount-row');

  if (!couponInput || !applyBtn) return;

  // Check for existing applied coupon on page load
  const existingCoupon = getAppliedCoupon();
  if (existingCoupon) {
    couponInput.value = existingCoupon.code;
    updateCartWithCoupon();
  }

  // Apply coupon button
  applyBtn.addEventListener('click', async () => {
    const code = couponInput.value.trim();
    const subtotalSpan = document.getElementById('subtotal-price');
    const totalSpan = document.getElementById('total-price');
    
    if (!code) {
      showCouponMessage('Please enter a coupon code', 'error');
      return;
    }

    // Check if a coupon is already applied
    const existingCoupon = getAppliedCoupon();
    if (existingCoupon) {
      showCouponMessage('Please remove the current coupon first', 'error');
      return;
    }

    // Get subtotal
    const subtotalText = subtotalSpan ? subtotalSpan.textContent : 'EGP 0.00';
    const subtotal = parseFloat(subtotalText.replace('EGP', '').trim()) || 0;

    if (subtotal === 0) {
      showCouponMessage('Your cart is empty', 'error');
      return;
    }

    // Get cart products
    const cart = getCart();
    const cartProducts = [];
    const allProducts = await fetchProducts();
    
    for (const [id] of cart.entries()) {
      const product = allProducts.find(p => String(p.id) === id);
      if (product) cartProducts.push(product);
    }

    // Validate coupon
    applyBtn.disabled = true;
    applyBtn.innerHTML = '<span>Applying...</span>';

    setTimeout(() => {
      const result = validateCoupon(code, subtotal, cartProducts);
      
      if (result.valid) {
        // Save applied coupon
        setAppliedCoupon(result.coupon);
        
        // Show discount
        const discountAmount = document.getElementById('discount-amount');
        const appliedCode = document.getElementById('applied-coupon-code');
        
        if (discountRow) discountRow.style.display = 'flex';
        if (appliedCode) appliedCode.textContent = result.coupon.code;
        if (discountAmount) discountAmount.textContent = `-EGP ${result.discount.toFixed(2)}`;
        
        // Update total
        const newTotal = subtotal - result.discount;
        if (totalSpan) totalSpan.textContent = newTotal.toFixed(2);
        
        showCouponMessage(result.message, 'success');
        couponInput.value = result.coupon.code;
        couponInput.disabled = true;
      } else {
        showCouponMessage(result.message, 'error');
      }
      
      applyBtn.disabled = false;
      applyBtn.innerHTML = '<span>Apply</span>';
    }, 300);
  });

  // Remove coupon button
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      setAppliedCoupon(null);
      
      // Hide discount row
      if (discountRow) discountRow.style.display = 'none';
      
      // Reset total to subtotal
      const subtotalSpan = document.getElementById('subtotal-price');
      const totalSpan = document.getElementById('total-price');
      if (subtotalSpan && totalSpan) {
        const subtotalText = subtotalSpan.textContent.replace('EGP', '').trim();
        const subtotal = parseFloat(subtotalText) || 0;
        totalSpan.textContent = subtotal.toFixed(2);
      }
      
      // Clear input and enable it
      couponInput.value = '';
      couponInput.disabled = false;
      
      showCouponMessage('Coupon removed', 'info');
    });
  }

  // Allow Enter key to apply coupon
  couponInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyBtn.click();
    }
  });

  // Helper function to show messages
  function showCouponMessage(message, type) {
    if (!couponMessage) return;
    
    couponMessage.textContent = message;
    couponMessage.className = `coupon-message ${type}`;
    couponMessage.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        couponMessage.style.display = 'none';
      }, 4000);
    }
  }
}

/**
 * Simple router to initialize the correct page logic.
 */
function router() {
  const path = window.location.pathname;

  if (path.endsWith('/') || path.endsWith('/index.html')) {
    initMainPage();
  } else if (path.endsWith('/cart.html')) {
    initCartPage();
    initCheckoutForm(); // Assuming checkout is on the cart page
    initCouponSystem(); // Initialize coupon functionality
  }
}

// --- Theme Management ---

/**
 * Applies the saved theme from localStorage or detects OS preference on first visit.
 */
function applyInitialTheme() {
  let savedTheme = localStorage.getItem('theme');
  
  // If no saved preference, detect OS preference
  if (!savedTheme) {
    savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // Save the detected preference
    localStorage.setItem('theme', savedTheme);
  }
  
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    // Keep the inline SVGs and just update accessible label
    toggleBtn.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

/**
 * Sets up the event listener for the theme toggle button.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Icons are toggled by CSS; only update the accessible label
    toggleBtn.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  applyInitialTheme(); // Apply theme as soon as the DOM is ready
  initThemeToggle(); // Set up the toggle button
  updateCartCounter(); // Update counter on every page load
  initMobileMenu(); // Initialize mobile menu functionality
  initMobileSearch(); // Initialize mobile search expansion
  initMobileFilterSheet(); // Initialize mobile filter sheet

  // Run the logic for the current page
  router();

  // --- Sort filter logic ---
  const sortRadios = document.querySelectorAll('.mydict input[type="radio"]');
  const sortDropdown = document.getElementById('mobile-sort');
  const productListContainer = document.getElementById('product-list-container');

  function updateSort(order) {
    currentSortOrder = order;
    renderProducts(productListContainer, currentSearchTerm, currentCategoryFilter, currentSortOrder, currentPriceMax);
    // Update radio checked state
    sortRadios.forEach(r => { r.checked = r.value === order; });
    // Update dropdown value
    if (sortDropdown) sortDropdown.value = order;
  }

  // Desktop radio buttons
  sortRadios.forEach(radio => {
    radio.addEventListener('change', e => {
      if (radio.checked) updateSort(radio.value);
    });
  });

  // Mobile dropdown
  if (sortDropdown) {
    sortDropdown.addEventListener('change', e => {
      updateSort(sortDropdown.value);
    });
  }

  // Initial sync
  updateSort(currentSortOrder);
});

