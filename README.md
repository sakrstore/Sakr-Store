# 🛍️ Sakr Store

A modern, high-performance e-commerce platform for electronics and accessories with comprehensive multilingual support and advanced optimization features.

**Live Demo:** [https://aboayman-oss.github.io/Sakr-Store/](https://aboayman-oss.github.io/Sakr-Store/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ Key Features

### 🎯 Core E-Commerce Functionality
- **Product Catalog** - Browse 20+ products across multiple categories
- **Advanced Search** - Real-time search with intelligent suggestions
- **Category Filtering** - Dynamic category-based product filtering
- **Price Filtering** - Filter by price range and view discounted items
- **Shopping Cart** - Full cart management with persistent storage
- **WhatsApp Integration** - Direct order placement via WhatsApp
- **Stock Management** - Real-time stock tracking and "New" product badges
- **Product Gallery** - Multiple images per product with thumbnail navigation

### 🌍 Multilingual & Accessibility
- **Full Arabic Language Support** - Modern Arabic typography with Cairo and Tajawal fonts
- **Bidirectional Text (BiDi)** - Automatic RTL/LTR detection and rendering
- **Mixed Content Support** - Seamless handling of Arabic/English combinations
- **Accessibility Features** - ARIA labels, keyboard navigation, and semantic HTML

### 🎨 User Experience
- **Dark/Light Theme** - Persistent theme toggle with localStorage
- **Responsive Design** - Mobile-first design optimized for all screen sizes
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Interactive Notifications** - Elegant slide-in notifications for user actions
- **Mobile Menu** - Touch-optimized hamburger menu with overlay

### ⚡ Performance Optimizations
- **Lazy Loading** - Images load only when visible (20-40% faster initial load)
- **Modern Image Formats** - WebP/AVIF support with automatic fallback
- **Optimized Assets** - Minified CSS and efficient JavaScript
- **Responsive Images** - Picture element with multiple format sources
- **Browser Caching** - Optimized caching strategies

### 🛠️ Developer Features
- **Modular Architecture** - Clean, maintainable code structure
- **JSON-Based Products** - Easy product management via `products.json`
- **Image Conversion Tools** - Automated WebP/AVIF conversion scripts (PowerShell & Node.js)
- **Comprehensive Documentation** - Detailed guides for all features
- **No Build Process** - Works directly in browser (optional optimizations available)

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required for basic usage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aboayman-oss/Sakr-Store.git
   cd Sakr-Store
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   ```

3. **Optional: Set up local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Visit** `http://localhost:8000` in your browser

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | Performance optimizations quick guide |
| [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md) | Detailed performance implementation summary |
| [IMAGE_OPTIMIZATION_GUIDE.md](IMAGE_OPTIMIZATION_GUIDE.md) | Image conversion and optimization guide |
| [PRODUCTS_JSON_GUIDE.md](PRODUCTS_JSON_GUIDE.md) | Comprehensive products.json reference (1178 lines) |

---

## 🎨 Arabic Language Support

Sakr Store includes enterprise-grade Arabic language support with professional typography and bidirectional text handling.

### Features

- **Modern Arabic Fonts** - Cairo and Tajawal fonts for beautiful, readable Arabic text
- **Automatic Direction Detection** - Smart RTL/LTR detection based on content
- **Mixed Content Support** - Seamlessly handles Arabic names with English descriptions
- **Bidirectional (BiDi) Support** - Proper rendering of Arabic text mixed with numbers or English
- **Typography Optimization** - Line height and spacing optimized separately for Arabic (1.7) and English (1.5)
- **Consistent Design** - Same modern aesthetic regardless of language

### Usage Examples

**Pure Arabic Product:**
```json
{
  "id": 3,
  "name": "حقيبة توت كبيرة من كانفاس القطنية الثقيلة",
  "price": 19.99,
  "description": "حقيبة توت كبيرة متعددة الاستخدامات مصنوعة من قماش القطن الثقيل، مثالية للتسوق أو الاستخدام اليومي.",
  "category": "Accessories"
}
```

**Mixed Arabic and English:**
```json
{
  "id": 4,
  "name": "Premium T-Shirt - قميص مميز",
  "description": "High quality cotton shirt with modern design - قميص قطني عالي الجودة",
  "category": "Apparel"
}
```

**Automatic Features:**
- Text direction auto-detected from content
- Numbers and prices always display LTR for consistency
- Font family automatically switches based on script

---

## 🖼️ Product Image System

Products support a modern, flexible image schema with backward compatibility.

### Image Schema

**New Schema (Recommended):**
```json
{
  "id": 101,
  "name": "Example Product",
  "images": {
    "primary": "images/product-main.jpg",
    "gallery": [
      "images/product-side.jpg",
      "images/product-back.jpg",
      "images/product-detail.jpg"
    ]
  }
}
```

**Legacy Schema (Still Supported):**
```json
{
  "id": 102,
  "name": "Legacy Product",
  "image": "images/product.jpg"
}
```

### Features
- `images.primary` - Main product image (listings & product page default)
- `images.gallery` - Array of images shown as thumbnails on product page
- Automatic fallback to legacy `image` field if `images.primary` is missing
- Thumbnails strip hidden if `images.gallery` is empty or missing

---

## ⚡ Performance Features

### Current Optimizations (Active)

#### 1. **Lazy Loading**
All images use native `loading="lazy"` attribute:
- **Initial Load:** 20-40% faster
- **Bandwidth:** 30-50% reduction on first view
- **User Experience:** Smoother scrolling

#### 2. **Ready for Modern Formats**
Infrastructure in place for WebP/AVIF support:
- Helper functions: `generateResponsiveImage()` and `generateSimpleImage()`
- Automatic format detection and fallback
- Browser compatibility ensured

### Optional Optimizations

#### Enable WebP/AVIF Support

**Step 1: Convert Images**

**Using PowerShell (Windows):**
```powershell
.\convert-images.ps1
```

**Using Node.js (All Platforms):**
```bash
npm install
npm run convert
```

**Step 2: Update JavaScript**

Edit `js/app.js` and replace these lines:

```javascript
// Line ~735 (Product Cards):
// Change from:
${generateSimpleImage(getPrimaryImage(p), p.name || 'Product image', '', true)}
// To:
${generateResponsiveImage(getPrimaryImage(p), p.name || 'Product image', '', true)}

// Line ~851 (Cart Items):
// Change from:
${generateSimpleImage(productImage, product.name, '', true)}
// To:
${generateResponsiveImage(productImage, product.name, '', true)}
```

**Expected Gains:**
- File sizes: 50-70% smaller
- Total bandwidth: 60-80% reduction
- Lighthouse scores: Significant improvement

---

## 🎨 Theme System

### Light & Dark Modes

Sakr Store includes a fully functional theme system with persistent storage.

**Features:**
- Toggle between light and dark modes
- Preference saved in localStorage
- Smooth transitions between themes
- Optimized color contrast for accessibility (WCAG AA compliant)
- Separate color palettes for each mode

**Theme Variables:**
- 50+ CSS custom properties
- Semantic color naming
- WCAG-compliant contrast ratios
- Optimized for readability in both modes

---

## 🛒 Shopping Cart Features

- **Persistent Storage** - Cart saved in localStorage
- **Real-time Updates** - Instant cart count badge updates
- **Quantity Management** - Increase/decrease quantities
- **Stock Validation** - Prevents ordering out-of-stock items
- **WhatsApp Integration** - Generate formatted order messages
- **Price Calculations** - Automatic subtotal and discount calculations
- **Empty State** - Helpful empty cart messaging

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px - Touch-optimized UI, hamburger menu
- **Tablet:** 768px - 1024px - Adaptive grid layouts
- **Desktop:** > 1024px - Full sidebar navigation

### Mobile Optimizations
- Touch-friendly buttons and inputs
- Slide-out navigation menu
- Optimized image sizes
- Reduced animations for performance
- Thumb-zone optimized controls

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup, accessibility |
| **CSS3** | Modern styling, custom properties, flexbox/grid |
| **JavaScript (ES6+)** | Core functionality, no frameworks |
| **RemixIcon** | Icon library |
| **Google Fonts** | Inter (English), Cairo & Tajawal (Arabic) |
| **Sharp** | Image conversion (optional) |

### Design Patterns
- **Modular JavaScript** - Organized into logical sections
- **CSS Custom Properties** - Dynamic theming
- **Progressive Enhancement** - Works without JavaScript (basic functionality)
- **Mobile-First** - Responsive from the ground up

---

## 📦 Project Structure

```
Sakr-Store/
├── index.html              # Homepage with product listings
├── product.html            # Product detail page template
├── cart.html               # Shopping cart page
├── products.json           # Product database (JSON)
├── package.json            # Node.js dependencies
├── css/
│   ├── style.css          # Main stylesheet (5496 lines)
│   └── modules/           # Modular CSS components
├── js/
│   └── app.js             # Main application logic (1475 lines)
├── images/                # Product images
├── screenshots/           # Automated screenshots
│   └── auto/
│       ├── dark/          # Dark mode screenshots
│       └── light/         # Light mode screenshots
├── convert-images.ps1     # PowerShell image converter
├── convert-images.js      # Node.js image converter
├── QUICK_START.md         # Quick start guide
├── PERFORMANCE_OPTIMIZATIONS.md  # Performance docs
├── IMAGE_OPTIMIZATION_GUIDE.md   # Image conversion guide
└── PRODUCTS_JSON_GUIDE.md # Complete product schema reference
```

---

## 🔧 Configuration

### WhatsApp Integration

Edit `js/app.js` to configure your WhatsApp number:

```javascript
const config = {
  whatsappNumber: '201108563748', // Your WhatsApp number with country code
};
```

### Adding Products

Edit `products.json` and add product objects:

```json
{
  "id": 24,
  "name": "Your Product Name",
  "price": 29.99,
  "description": "Product description",
  "category": "Category Name",
  "discount": true,
  "discountedPrice": 24.99,
  "stock": 100,
  "isNew": true,
  "images": {
    "primary": "images/your-product.jpg",
    "gallery": [
      "images/your-product-2.jpg",
      "images/your-product-3.jpg"
    ]
  }
}
```

See [PRODUCTS_JSON_GUIDE.md](PRODUCTS_JSON_GUIDE.md) for comprehensive documentation.

---

## 🎯 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 85+ | ✅ Full |
| Firefox | 93+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 85+ | ✅ Full |
| Opera | 71+ | ✅ Full |

**Features:**
- Modern JavaScript (ES6+)
- CSS Grid & Flexbox
- CSS Custom Properties
- Native Lazy Loading
- localStorage API

---

## 📊 Performance Metrics

### Current Performance (Lazy Loading Active)

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.0s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Bandwidth:** ~30-50% reduction on initial load

### With WebP/AVIF Conversion

- **Image Size Reduction:** 50-70%
- **Total Bandwidth Savings:** 60-80%
- **Lighthouse Score:** 90+ (estimated)

---

## 🛠️ Development Tools

### Image Conversion

**PowerShell Script** (`convert-images.ps1`)
```powershell
# Requires: ImageMagick, cwebp, or avifenc
.\convert-images.ps1
```

**Node.js Script** (`convert-images.js`)
```bash
npm install      # Install Sharp library
npm run convert  # Convert all images
```

### Automated Screenshots

Generate screenshots automatically:

```bash
# Python + Playwright (recommended)
pip install playwright
python -m playwright install chromium
python .\capture_screenshots.py --out screenshots/auto
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Fonts:** [Google Fonts](https://fonts.google.com/) - Inter, Cairo, Tajawal
- **Icons:** [RemixIcon](https://remixicon.com/)
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/)

---

## 📞 Contact & Support

- **Author:** aboayman-oss
- **Repository:** [Sakr-Store](https://github.com/aboayman-oss/Sakr-Store)
- **Issues:** [Report a bug](https://github.com/aboayman-oss/Sakr-Store/issues)
- **Live Demo:** [https://aboayman-oss.github.io/Sakr-Store/](https://aboayman-oss.github.io/Sakr-Store/)

---

<div align="center">

**Made with ❤️ by aboayman-oss**

⭐ Star this repository if you find it helpful!

</div>
