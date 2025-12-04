# Sakr Store Android App - GitHub Copilot Agent Mode Plan 🚀

## Quick Reference Card

```
📦 Project: Sakr Store Android App
🔗 Data URL: https://raw.githubusercontent.com/sakrstore/Sakr-Store/main/products.json
📱 WhatsApp: 201108563748
🎯 Min SDK: 24 (Android 7.0)
🎨 UI: Jetpack Compose + Material 3
🤖 Dev Mode: GitHub Copilot Agent in Android Studio
```

---

## How to Use This Plan with Copilot Agent

### Enable Copilot Agent Mode
1. Open Android Studio
2. Press `Ctrl+Shift+I` (or `Cmd+Shift+I` on Mac) to open Copilot Chat
3. Click the **Agent Mode** toggle (or type `@workspace`)
4. Copy prompts from this doc → Paste into Copilot Chat → Let it build!

### The Workflow
```
1. Create project manually (Step 1.1)
2. Give Copilot the prompts below
3. Review & accept changes
4. Run & test
```

---

## Phase 1: Project Setup (5 minutes)

### Step 1.1: Create New Project (Manual)

Open Android Studio → **New Project** → **Empty Activity** ⚠️

> **IMPORTANT:** Choose **"Empty Activity"** (the Compose one, NOT "Empty Views Activity")
> 
> If you see these options, pick **Empty Activity**:
> - ❌ No Activity
> - ❌ Basic Views Activity  
> - ❌ Empty Views Activity (this is XML-based)
> - ✅ **Empty Activity** ← THIS ONE (Compose-based)

```
Name:               Sakr Store
Package name:       com.sakrstore.app
Save location:      Your choice
Language:           Kotlin
Minimum SDK:        API 24 ("Nougat"; Android 7.0)
Build config:       Kotlin DSL (build.gradle.kts)
```

Click **Finish** ✅ → Wait for Gradle sync

---

### Step 1.2: Add Dependencies (Copilot Prompt)

**Open Copilot Agent Mode** (`Ctrl+Shift+I`) and paste this prompt:

````
@workspace Add these dependencies to app/build.gradle.kts:
- Retrofit 2.9.0 with Gson converter for API calls
- OkHttp 4.12.0 with logging interceptor
- Coil 2.5.0 for Compose image loading
- Navigation Compose 2.7.6
- DataStore Preferences 1.0.0
- Material Icons Extended for Compose

Also add INTERNET permission to AndroidManifest.xml
````

**Wait for Copilot to make changes → Click "Accept All"**

---

## Phase 2: Create the Data Layer (Copilot Prompt)

### Prompt 2.1: Product Model

Paste this into Copilot Agent:

````
@workspace Create a Product data model in com.sakrstore.app.data.model.Product.kt that matches this JSON structure from https://raw.githubusercontent.com/sakrstore/Sakr-Store/main/products.json:

{
  "id": 1,
  "name": "R50i Original",
  "price": 899.99,
  "description": "Product description here",
  "image": "images/product-1-primary.webp",
  "images": {
    "primary": "images/product-1-primary.webp",
    "gallery": ["images/product-1-gallery-0.webp"]
  },
  "category": "Airpods",
  "discount": true,
  "discountedPrice": 749.99,
  "stock": 10,
  "isNew": true
}

Use @SerializedName annotations. Add extension functions:
- getPrimaryImageUrl() - prepends "https://raw.githubusercontent.com/sakrstore/Sakr-Store/main/"
- getDisplayPrice() - returns discountedPrice if discount is true
- hasDiscount() - returns true if discount && discountedPrice < price
- getDiscountPercent() - calculates percentage off
````

---

### Prompt 2.2: API Service

````
@workspace Create a Retrofit API service in com.sakrstore.app.data.remote.ApiService.kt that:
- Has base URL "https://raw.githubusercontent.com/"
- Has a GET endpoint "sakrstore/Sakr-Store/main/products.json" that returns List<Product>
- Includes a RetrofitClient singleton with OkHttpClient (30s timeout, basic logging)
- Uses Gson converter
````

---

### Prompt 2.3: Repository

````
@workspace Create a ProductRepository in com.sakrstore.app.data.repository.ProductRepository.kt that:
- Uses the ApiService to fetch products
- Has in-memory caching (returns cache if available unless forceRefresh=true)
- Returns a sealed Result class (Success, Error, Loading)
- Runs network calls on Dispatchers.IO
- Falls back to cache on network errors
````

---

## Phase 3: ViewModel (Copilot Prompt)

````
@workspace Create a ProductViewModel in com.sakrstore.app.viewmodel.ProductViewModel.kt that:

1. Has UiState data class with: products list, isLoading, error message, selectedCategory
2. Uses StateFlow for uiState and cart (Map<Int, Int> for productId to quantity)
3. Loads products on init using the ProductRepository
4. Has these functions:
   - loadProducts(forceRefresh: Boolean)
   - selectCategory(category: String)
   - getFilteredProducts() - filters by selectedCategory
   - getCategories() - returns distinct categories with "All" first
   - addToCart(productId: Int)
   - removeFromCart(productId: Int) - decreases qty or removes if 1
   - clearCart()
   - getCartItemCount() - total items
   - getCartTotal() - total price
   - getCartProducts() - List<Pair<Product, Int>>
````

---

## Phase 4: WhatsApp Helper (Copilot Prompt)

````
@workspace Create a WhatsAppHelper object in com.sakrstore.app.utils.WhatsAppHelper.kt that:

1. Has WHATSAPP_NUMBER = "201108563748"
2. sendOrder(context: Context, items: List<Pair<Product, Int>>) function that:
   - Builds Arabic message with emoji: "🛒 *طلب جديد من تطبيق صقر ستور*"
   - Lists each product with name, price, quantity, subtotal
   - Shows total at bottom
   - Opens WhatsApp with wa.me URL
3. inquireAbout(context: Context, product: Product) function for product inquiries
````

---

## Phase 5: UI Components (Copilot Prompts)

### Prompt 5.1: Product Card

````
@workspace Create a ProductCard composable in com.sakrstore.app.ui.components.ProductCard.kt that:

1. Takes Product, onClick lambda, onAddToCart lambda
2. Uses Card with RoundedCornerShape(16.dp)
3. Shows product image using Coil AsyncImage (160.dp height)
4. Shows "NEW" green badge if isNew
5. Shows discount percentage red badge if hasDiscount()
6. Shows product name (max 2 lines), category, price
7. Shows original price with strikethrough if discounted
8. Has FilledIconButton with Add icon for add to cart
````

---

### Prompt 5.2: Cart FAB

````
@workspace Create a CartFab composable in com.sakrstore.app.ui.components.CartFab.kt that:
- Shows FloatingActionButton with ShoppingCart icon
- Uses BadgedBox to show item count badge when count > 0
- Takes itemCount: Int and onClick lambda
````

---

## Phase 6: Screens (Copilot Prompts)

### Prompt 6.1: Product List Screen

````
@workspace Create ProductListScreen composable in com.sakrstore.app.ui.screens.ProductListScreen.kt that:

1. Takes ProductViewModel, onProductClick: (Int) -> Unit, onCartClick: () -> Unit
2. Has Scaffold with TopAppBar "Sakr Store" and refresh icon
3. Shows LazyRow of FilterChips for categories
4. Shows LazyVerticalGrid (2 columns) of ProductCard components
5. Shows CircularProgressIndicator when loading
6. Shows error message with retry button on error
7. Has CartFab as floatingActionButton
````

---

### Prompt 6.2: Product Detail Screen

````
@workspace Create ProductDetailScreen composable in com.sakrstore.app.ui.screens.ProductDetailScreen.kt that:

1. Takes productId: Int, viewModel: ProductViewModel, onBack: () -> Unit
2. Gets product from viewModel.uiState by id
3. Shows full-width product image (300.dp height)
4. Shows category chip, product name, price with discount display
5. Shows stock status with CheckCircle/Cancel icons
6. Shows full description
7. Has quantity selector with +/- buttons
8. Has "Add to Cart" primary button
9. Has "Ask on WhatsApp" outlined button (green, uses WhatsAppHelper)
````

---

### Prompt 6.3: Cart Screen

````
@workspace Create CartScreen composable in com.sakrstore.app.ui.screens.CartScreen.kt that:

1. Takes viewModel: ProductViewModel, onBack: () -> Unit
2. Has TopAppBar with back arrow and clear cart button
3. Shows empty state with ShoppingCart icon when cart is empty
4. Shows LazyColumn of cart items (product image, name, price, qty controls)
5. Has bottom bar with total price and green "Order via WhatsApp" button
6. WhatsApp button calls WhatsAppHelper.sendOrder with cart products
````

---

## Phase 7: Navigation & MainActivity (Copilot Prompt)

````
@workspace Update MainActivity.kt to:

1. Create a SakrStoreApp composable with Navigation
2. Use rememberNavController and shared ProductViewModel
3. Set up NavHost with these routes:
   - "products" -> ProductListScreen
   - "product/{productId}" -> ProductDetailScreen (with Int argument)
   - "cart" -> CartScreen
4. Wire up navigation callbacks between screens
````

---

## Phase 8: Run & Test 🧪

### Run the App
1. Connect Android device OR start emulator
2. Click **Run** ▶️ (or Shift+F10)
3. Wait for build...
4. App launches! 🎉

### Test Checklist
- [ ] Products load from GitHub
- [ ] Images display correctly
- [ ] Category filters work
- [ ] Add to cart works
- [ ] Cart shows items
- [ ] Quantity +/- works
- [ ] WhatsApp opens with order
- [ ] Refresh button works

---

## Quick Fixes with Copilot

### If Build Fails

````
@workspace Fix the build errors in this project. Check imports and dependencies.
````

### If Images Don't Load

````
@workspace The images aren't loading. Check that:
1. INTERNET permission is in AndroidManifest.xml
2. Image URLs are correctly formed with the GitHub raw base URL
3. Coil AsyncImage is properly configured
````

### If Navigation Crashes

````
@workspace Fix the navigation setup. Ensure NavHost routes match the navigate() calls.
````

---

## Enhancement Prompts 💡

After the app works, use these prompts to add features:

### Add Search

````
@workspace Add a search bar to ProductListScreen that filters products by name in real-time
````

### Add Pull to Refresh

````
@workspace Add pull-to-refresh functionality to ProductListScreen using SwipeRefresh
````

### Add Dark Theme

````
@workspace Update the theme to support dark mode with Material 3 dynamic colors
````

### Add Image Gallery

````
@workspace Add a horizontal pager image gallery in ProductDetailScreen showing all product images
````

### Persist Cart

````
@workspace Save the cart to DataStore so it persists when the app closes
````

### Add Splash Screen

````
@workspace Add a splash screen with the app name "Sakr Store" using the SplashScreen API
````

### Add Arabic RTL

````
@workspace Add RTL layout support for Arabic text using CompositionLocalProvider
````

---

## File Structure (What Copilot Creates)

```
app/src/main/
├── AndroidManifest.xml              ✅ (INTERNET permission)
├── java/com/sakrstore/app/
│   ├── MainActivity.kt              ✅ (Navigation setup)
│   ├── data/
│   │   ├── model/
│   │   │   └── Product.kt           ✅ (Data class)
│   │   ├── remote/
│   │   │   └── ApiService.kt        ✅ (Retrofit)
│   │   └── repository/
│   │       └── ProductRepository.kt  ✅ (Caching)
│   ├── ui/
│   │   ├── components/
│   │   │   ├── ProductCard.kt       ✅
│   │   │   └── CartFab.kt           ✅
│   │   ├── screens/
│   │   │   ├── ProductListScreen.kt  ✅
│   │   │   ├── ProductDetailScreen.kt ✅
│   │   │   └── CartScreen.kt         ✅
│   │   └── theme/                   (auto-generated)
│   ├── viewmodel/
│   │   └── ProductViewModel.kt      ✅
│   └── utils/
│       └── WhatsAppHelper.kt        ✅
```

---

## Summary: Prompt Order

| Step | Prompt | What It Creates |
|------|--------|-----------------|
| 1 | Create project manually | Empty Compose project |
| 2 | Dependencies prompt | gradle + manifest |
| 3 | Product Model prompt | Product.kt |
| 4 | API Service prompt | ApiService.kt |
| 5 | Repository prompt | ProductRepository.kt |
| 6 | ViewModel prompt | ProductViewModel.kt |
| 7 | WhatsApp prompt | WhatsAppHelper.kt |
| 8 | ProductCard prompt | ProductCard.kt |
| 9 | CartFab prompt | CartFab.kt |
| 10 | ProductListScreen prompt | ProductListScreen.kt |
| 11 | ProductDetailScreen prompt | ProductDetailScreen.kt |
| 12 | CartScreen prompt | CartScreen.kt |
| 13 | MainActivity prompt | Navigation setup |
| 14 | **Run the app!** | 🎉 |

---

## Success! 🎉

Your app will:
- ✅ Fetch products from YOUR GitHub repo
- ✅ Display them in a beautiful grid
- ✅ Support category filtering
- ✅ Have a working shopping cart
- ✅ Send orders via WhatsApp
- ✅ Auto-update when you change products.json

**Total prompts: 13** | **Estimated time: 30-45 minutes**

When you update `products.json` on GitHub, ALL app users see the new products automatically! 🚀

---

## Next Steps

1. **Test thoroughly** on real device
2. **Add app icon:** Right-click res → New → Image Asset
3. **Generate signed APK:** Build → Generate Signed Bundle/APK
4. **Publish to Play Store:** $25 one-time fee

Good luck! 💪
