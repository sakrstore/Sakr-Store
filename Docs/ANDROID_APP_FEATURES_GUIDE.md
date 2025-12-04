# Sakr Store Android App - Missing Features Implementation Guide

> This document provides detailed descriptions (style and function) of features that need to be added or fixed in the Android app to match the web experience.

---

## Table of Contents

1. [Hamburger Menu Sidebar](#1-hamburger-menu-sidebar)
2. [Product Card (Main Page Style)](#2-product-card-main-page-style)
3. [Checkout Flow](#3-checkout-flow)
4. [Contact Us Screen](#4-contact-us-screen)
5. [Privacy Policy Screen](#5-privacy-policy-screen)
6. [Terms & Conditions Screen](#6-terms--conditions-screen)
7. [Return Policy Screen](#7-return-policy-screen)

---

## 1. Hamburger Menu Sidebar

### Overview
The hamburger menu provides access to product categories, navigation links, and settings. It slides in from the left side of the screen.

### Visual Design Specifications

#### Hamburger Icon (in Header/TopAppBar)
| Property | Value |
|----------|-------|
| Icon | Three horizontal lines (☰) |
| Icon Size | 24dp |
| Touch Target | 44×44dp minimum |
| Color | White (`#FFFFFF`) on dark header |
| Background | Semi-transparent on hover/press: `rgba(255, 255, 255, 0.1)` |
| Border Radius | 10dp |
| Animation | Lines animate to X when open |

#### Sidebar Container
| Property | Value |
|----------|-------|
| Width | 300dp (or 80% of screen width, max 300dp) |
| Height | Full screen height |
| Background | Light Mode: `#FFFFFF` / Dark Mode: `#1A1F2E` |
| Slide Animation | 300ms, `cubic-bezier(0.4, 0, 0.2, 1)` |
| Shadow | `elevation: 16dp` |
| Border Right | 1px solid `#D1D5DB` (light) / `#2D3548` (dark) |

#### Overlay/Scrim
| Property | Value |
|----------|-------|
| Background | `rgba(0, 0, 0, 0.5)` |
| Animation | Fade in/out 300ms |
| Behavior | Tap to close sidebar |

#### Close Button
| Property | Value |
|----------|-------|
| Position | Top-right of sidebar |
| Icon | X (close) |
| Size | 40dp × 40dp |
| Color | `#64748B` (muted) |
| Touch Target | 48dp × 48dp |

### Content Structure

#### Header Section
```
┌─────────────────────────────────┐
│  [X Close]                      │
│                                 │
│  Categories                     │
│  ─────────────────────────────  │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Title | "Categories" |
| Font Size | 20sp |
| Font Weight | 700 (Bold) |
| Color | Primary text color |
| Padding | 16dp horizontal, 24dp top |

#### Category List
Each category item:

| Property | Value |
|----------|-------|
| Height | 48dp minimum |
| Padding | 16dp horizontal, 12dp vertical |
| Font Size | 16sp |
| Font Weight | 500 (Medium) |
| Color | `#334155` (light) / `#E5E7EB` (dark) |
| Selected State | Primary color (`#2563EB`) with background tint |
| Hover/Press State | Background `#F3F4F6` (light) / `#242A3D` (dark) |
| Ripple | Primary color at 10% opacity |
| Icon (optional) | 20dp, left-aligned with 12dp gap |

#### Categories to Include
1. All Products (default)
2. Airpods
3. Headphones
4. Earphone
5. Smart Watch
6. Power Bank
7. Chargers
8. Adapter
9. Cables
10. Flash (USB Drives)
11. Camera Accessories
12. OTG
13. Card Reader
14. Dongle

#### Divider
| Property | Value |
|----------|-------|
| Height | 1dp |
| Color | `#E5E7EB` (light) / `#2D3548` (dark) |
| Margin | 16dp horizontal, 8dp vertical |

#### Quick Links Section
```
┌─────────────────────────────────┐
│  Quick Links                    │
│  ─────────────────────────────  │
│  🏠 Home                        │
│  ℹ️ About Us                    │
│  📧 Contact Us                  │
│  ❓ FAQ                         │
│  ─────────────────────────────  │
│  📜 Privacy Policy              │
│  📋 Terms & Conditions          │
│  ↩️ Return Policy               │
└─────────────────────────────────┘
```

#### Theme Toggle (Bottom Section)
| Property | Value |
|----------|-------|
| Position | Bottom of sidebar, fixed |
| Layout | Row with icon, label, and switch |
| Icon | ☀️ (light) / 🌙 (dark) |
| Label | "Dark Mode" |
| Switch | Material 3 Switch component |
| Background | Slightly elevated `#F3F4F6` (light) / `#242A3D` (dark) |
| Padding | 16dp all sides |

### Functionality

#### Opening the Sidebar
- Tap hamburger icon in header
- Swipe from left edge of screen (gesture navigation)

#### Closing the Sidebar
- Tap X close button
- Tap outside (on scrim/overlay)
- Swipe left on sidebar
- Navigate to any item

#### Category Selection
- Tap a category to filter products
- Close sidebar automatically
- Update main product list
- Show category name in breadcrumb or subtitle

#### State Persistence
- Remember last selected category
- Remember theme preference (in SharedPreferences/DataStore)

### Jetpack Compose Implementation Hint
```kotlin
// Use ModalNavigationDrawer with DrawerState
ModalNavigationDrawer(
    drawerState = drawerState,
    drawerContent = {
        ModalDrawerSheet {
            // Sidebar content
        }
    }
) {
    // Main content
}
```

---

## 2. Product Card (Main Page Style)

### Overview
Product cards display product information in a grid layout. They must be visually appealing, touch-friendly, and consistent with the web design.

### Card Layout Structure
```
┌──────────────────────────────────────┐
│  [NEW ⭐]                   [SALE 🏷️] │  ← Badges (absolute positioned)
│                                      │
│         ┌──────────────────┐         │
│         │                  │         │
│         │   [Product       │         │
│         │    Image]        │         │
│         │                  │         │
│         └──────────────────┘         │
│                                      │
│  Product Name Here That May          │  ← Max 2 lines, ellipsis
│  Wrap to Second Line                 │
│                                      │
│  ┌──────────────────────────────┐    │
│  │  ̶8̶9̶9̶.̶9̶9̶ ̶E̶G̶P̶                │    │  ← Original price (if discounted)
│  │  749.99 EGP                  │    │  ← Current/discounted price
│  └──────────────────────────────┘    │
│                                      │
│  [Only 3 left! ⚠️]                    │  ← Low stock warning (stock ≤ 5)
│                                      │
│  ┌──────────────────────────────┐    │
│  │  🛒  Add to Cart             │    │  ← Add to cart button
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

### Card Container Specifications

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` (light) / `#1A1F2E` (dark) |
| Border | 1.5dp solid `#D1D5DB` at 30% opacity (light) / `#2D3548` (dark) |
| Border Radius | 12-16dp |
| Shadow | `elevation: 4dp` (light) / `elevation: 6dp` (dark) |
| Padding | 0 (content handles its own padding) |
| Min Width | 160dp |
| Max Width | 280dp |
| Tap Animation | Slight lift: `translationY: -4dp`, increased shadow |
| Transition | 300ms `cubic-bezier(0.4, 0, 0.2, 1)` |

### Product Image

| Property | Value |
|----------|-------|
| Aspect Ratio | 1:1 (square) |
| Object Fit | `ContentScale.Fit` (contain, no cropping) |
| Background | Subtle dotted pattern or gradient: `#F3F4F6` |
| Padding | 8dp inside image container |
| Border Radius | 8dp (top corners if image is at top) |
| Placeholder | Shimmer loading effect |
| Error State | Store icon with muted color |
| Hover/Press | `scale(1.05)` animation on image only |

### "NEW" Badge

| Property | Value |
|----------|-------|
| Position | Absolute, top: 12dp, right: 12dp |
| Background | Gradient: `#10B981` → `#059669` (135deg) |
| Text | "NEW" |
| Text Color | `#FFFFFF` |
| Font Size | 10sp |
| Font Weight | 700 (Bold) |
| Letter Spacing | 0.5sp |
| Text Transform | UPPERCASE |
| Padding | 6dp horizontal, 4dp vertical |
| Border Radius | 6dp |
| Shadow | `0 4px 12px rgba(16, 185, 129, 0.4)` |
| Icon | Star (⭐) before text, 12dp |
| Animation | Subtle pulse (2s infinite) |

### "SALE" Badge

| Property | Value |
|----------|-------|
| Position | Absolute, top: 12dp, left: 12dp |
| Background | Gradient: `#DC2626` → `#B91C1C` (135deg) |
| Text | "SALE" or "-XX%" |
| Text Color | `#FFFFFF` |
| Font Size | 10sp |
| Font Weight | 700 (Bold) |
| Letter Spacing | 0.5sp |
| Text Transform | UPPERCASE |
| Padding | 6dp horizontal, 4dp vertical |
| Border Radius | 6dp |
| Shadow | `0 4px 12px rgba(220, 38, 38, 0.4)` |
| Icon | Tag (🏷️) before text, 12dp |
| Animation | Subtle pulse (2s infinite) |
| Condition | Show when `discount == true` |

### When Both Badges Present
- NEW badge: top-right
- SALE badge: below NEW badge (top: 48dp) OR top-left

### Product Name

| Property | Value |
|----------|-------|
| Font Size | 14-16sp |
| Font Weight | 600 (Semi-Bold) |
| Color | Primary text: `#0F172A` (light) / `#F1F5F9` (dark) |
| Line Height | 1.4 |
| Max Lines | 2 |
| Overflow | Ellipsis (`...`) |
| Padding | 12dp horizontal, 8dp top |
| Min Height | 40dp (for consistent card heights) |

### Price Display

#### Regular Price (No Discount)
| Property | Value |
|----------|-------|
| Font Size | 18sp |
| Font Weight | 700 (Bold) |
| Color | Emerald green: `#059669` (light) / `#10B981` (dark) |
| Format | `XXX.XX EGP` |

#### Discounted Price Display
| Component | Style |
|-----------|-------|
| Original Price | Font: 14sp, Weight: 500, Color: `#DC2626`, Strikethrough, 60% opacity |
| Sale Price | Font: 18sp, Weight: 700, Color: `#059669` (light) / `#10B981` (dark) |
| Layout | Vertical stack (original on top, sale price below) |
| Gap | 4dp |

### Low Stock Warning

| Property | Value |
|----------|-------|
| Condition | Show when `stock <= 5` |
| Background | `rgba(245, 158, 11, 0.1)` |
| Border | 1dp solid `rgba(245, 158, 11, 0.3)` |
| Text Color | `#D97706` (amber) |
| Font Size | 12sp |
| Font Weight | 500 |
| Icon | ⚠️ Warning, 14dp |
| Text | "Only X left!" |
| Border Radius | 6dp |
| Padding | 4dp vertical, 8dp horizontal |
| Margin | 8dp horizontal, 4dp vertical |

### Add to Cart Button

| Property | Value |
|----------|-------|
| Background | Gradient: `#2563EB` → `#1E40AF` (135deg) |
| Text Color | `#FFFFFF` |
| Text | "Add to Cart" |
| Font Size | 14sp |
| Font Weight | 600 |
| Icon | 🛒 Cart, 18dp, before text |
| Height | 44dp |
| Border Radius | 8dp |
| Shadow | `0 4px 12px rgba(37, 99, 235, 0.3)` |
| Margin | 12dp horizontal, 12dp bottom |
| Hover/Press | `translationY: -2dp`, increased shadow |
| Ripple | White at 20% opacity |
| Disabled State | Gray background, 50% opacity |

### Grid Layout

| Property | Value |
|----------|-------|
| Type | `LazyVerticalGrid` |
| Columns | Adaptive, minSize: 160dp |
| Gap/Spacing | 12-16dp |
| Content Padding | 16dp |
| Item Animation | Fade in + slight slide up on load |

### Tap/Click Behavior
- Entire card is tappable
- Navigate to Product Detail screen
- Show ripple effect on touch

### Jetpack Compose Hint
```kotlin
@Composable
fun ProductCard(
    product: Product,
    onAddToCart: (Product) -> Unit,
    onProductClick: (Product) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onProductClick(product) },
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column {
            // Image with badges
            Box {
                AsyncImage(...)
                if (product.isNew) NewBadge()
                if (product.discount) SaleBadge()
            }
            // Name
            Text(product.name, maxLines = 2, overflow = TextOverflow.Ellipsis)
            // Price
            PriceDisplay(product)
            // Low stock
            if (product.stock <= 5) LowStockWarning(product.stock)
            // Add to Cart
            AddToCartButton(onClick = { onAddToCart(product) })
        }
    }
}
```

---

## 3. Checkout Flow

### Overview
The checkout flow is a WhatsApp-based ordering system. Users fill out their details in the cart screen, and the order is sent via WhatsApp message.

### Cart Screen Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Shopping Cart                           │
│                    3 items in your cart                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cart Items Section (Scrollable)                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ [Img] Product Name                            [×]          │ │
│  │       899.99 EGP                                           │ │
│  │       [-] [1] [+]                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ [Img] Product Name                            [×]          │ │
│  │       499.99 EGP                                           │ │
│  │       [-] [2] [+]                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Order Summary                                                  │
│  ─────────────────────────────────────────                      │
│  Subtotal:                                      1,899.97 EGP    │
│                                                                 │
│  ┌─Coupon─────────────────────────────────────────────────────┐ │
│  │ [Enter coupon code        ] [Apply]                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Discount (SAVE10):                              -189.99 EGP    │
│  Shipping:                            Confirmed via WhatsApp    │
│  ─────────────────────────────────────────                      │
│  Total:                                         1,709.98 EGP    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Your Details                                                   │
│  ─────────────────────────────────────────                      │
│                                                                 │
│  Contact Information                                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 👤 Full Name *                                             │ │
│  │ [                                          ]               │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📞 Phone Number *                                          │ │
│  │ [01XXXXXXXXX                              ]                │ │
│  │ Egyptian mobile (11 digits starting with 01)               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Delivery Address                                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🏠 Street Address *                                        │ │
│  │ [                                          ]               │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────┐ ┌──────────────────────┐             │
│  │ 📍 Governorate *     │ │ 🏘️ City/District *   │             │
│  │ [Select ▼          ] │ │ [                  ] │             │
│  └──────────────────────┘ └──────────────────────┘             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📝 Address & Landmarks *                                   │ │
│  │ [                                          ]               │ │
│  │ [                                          ]               │ │
│  │                                          0/200             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Payment Method                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 💳 Preferred Payment Method *                              │ │
│  │ [Select ▼                                  ]               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📱 Complete Order via WhatsApp                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Cart Item Row

| Property | Value |
|----------|-------|
| Background | `#E5E7EB` (light) / `#1A1F2E` (dark) |
| Border | 2dp solid transparent → Primary on hover |
| Border Radius | 12dp |
| Padding | 12-16dp |
| Image Size | 80dp × 80dp |
| Image Border Radius | 10dp |
| Layout | Grid: Image | Info (flex) | Quantity | Remove |
| Elevation on Press | Slight lift |

#### Quantity Selector
| Property | Value |
|----------|-------|
| Background | Card background |
| Border | 2dp solid `#D1D5DB` (light) / `#2D3548` (dark) |
| Border Radius | 8-10dp |
| Button Size | 36-44dp square |
| Button Background | Primary color |
| Button Icon | + / - |
| Input Width | 50-60dp |
| Input Alignment | Center |
| Font Weight | 700 |

#### Remove Button
| Property | Value |
|----------|-------|
| Size | 32dp × 32dp |
| Icon | X (close) |
| Color | Error red `#DC2626` |
| Background | Transparent → Red at 10% on press |
| Border Radius | 8dp |

### Order Summary Card

| Property | Value |
|----------|-------|
| Background | `#FFFFFF` (light) / `#1A1F2E` (dark) |
| Border Radius | 16dp |
| Shadow | `elevation: 4dp` |
| Padding | 20dp |

#### Summary Rows
| Component | Style |
|-----------|-------|
| Label | Font: 14sp, Color: Secondary text |
| Value | Font: 16sp, Weight: 600, Color: Primary text |
| Divider | 1dp solid border color, 8dp margin vertical |
| Total Row | Font: 18sp, Weight: 700, Primary color |

### Coupon Section

| Property | Value |
|----------|-------|
| Input Field | Same as other form inputs |
| Input Placeholder | "Enter coupon code" |
| Apply Button | Primary color, "Apply" text, 600 weight |
| Success Message | Green text, check icon |
| Error Message | Red text |
| Applied Discount Row | Shows code with remove (X) button |

### Customer Form Fields

#### Text Input
| Property | Value |
|----------|-------|
| Height | 48dp |
| Padding | 12-16dp horizontal |
| Background | Card background |
| Border | 2dp solid `#D1D5DB` (light) / `#2D3548` (dark) |
| Border Radius | 10dp |
| Font Size | 16sp (prevents iOS zoom issues) |
| Focus Border | Primary color `#2563EB` |
| Focus Shadow | `0 0 0 4px rgba(37, 99, 235, 0.1)` |

#### Labels
| Property | Value |
|----------|-------|
| Font Size | 14sp |
| Font Weight | 600 |
| Color | Primary text |
| Icon | 18dp, primary color, before label text |
| Margin Bottom | 8dp |

#### Dropdown/Spinner
| Property | Value |
|----------|-------|
| Same as text input |
| Arrow Icon | Chevron down, 18dp, right-aligned |

#### Textarea (Notes)
| Property | Value |
|----------|-------|
| Min Height | 80dp |
| Resize | Vertical only (if supported) |
| Character Counter | Bottom-right, "X/200" |

### Governorates Dropdown Options
```
Cairo (القاهرة)
Giza (الجيزة)
Alexandria (الإسكندرية)
Dakahlia (الدقهلية)
Red Sea (البحر الأحمر)
Beheira (البحيرة)
Fayoum (الفيوم)
Gharbia (الغربية)
Ismailia (الإسماعيلية)
Menofia (المنوفية)
Minya (المنيا)
Qaliubiya (القليوبية)
New Valley (الوادي الجديد)
Suez (السويس)
Aswan (أسوان)
Assiut (أسيوط)
Beni Suef (بني سويف)
Port Said (بورسعيد)
Damietta (دمياط)
Sharkia (الشرقية)
South Sinai (جنوب سيناء)
Kafr El Sheikh (كفر الشيخ)
Matrouh (مطروح)
Luxor (الأقصر)
Qena (قنا)
North Sinai (شمال سيناء)
Sohag (سوهاج)
```

### Payment Methods Dropdown Options
```
Cash on Delivery (الدفع عند الاستلام)
InstaPay
Vodafone Cash
Orange Cash
Etisalat Cash
```

### Order via WhatsApp Button

| Property | Value |
|----------|-------|
| Background | WhatsApp gradient: `#25D366` → `#128C7E` (135deg) |
| Text Color | `#FFFFFF` |
| Text | "Complete Order via WhatsApp" |
| Font Size | 16sp |
| Font Weight | 700 |
| Icon | WhatsApp icon, 24dp, before text |
| Height | 56dp |
| Border Radius | 12dp |
| Shadow | `0 4px 12px rgba(37, 211, 102, 0.4)` |
| Full Width | Yes |
| Disabled State | Gray, 50% opacity |

### WhatsApp Message Format
When the button is pressed, generate this message:
```
*🛒 New Order from SAKR STORE App*

*Customer Details:*
👤 Name: [Customer Name]
📞 Phone: [Phone Number]

*Delivery Address:*
🏠 [Street Address]
📍 [City/District], [Governorate]
📝 Landmarks: [Notes]

*Payment Method:* [Selected Payment]

*Order Items:*
━━━━━━━━━━━━━━━━━━━━
1. [Product Name]
   Qty: [X] × [Price] EGP = [Subtotal] EGP

2. [Product Name]
   Qty: [X] × [Price] EGP = [Subtotal] EGP
━━━━━━━━━━━━━━━━━━━━

*Subtotal:* [Amount] EGP
*Discount ([Code]):* -[Amount] EGP
*Total:* [Final Amount] EGP

Thank you for shopping with SAKR STORE! 🙏
```

### WhatsApp Integration
```kotlin
val whatsappNumber = "201108563748"
val encodedMessage = URLEncoder.encode(message, "UTF-8")
val intent = Intent(Intent.ACTION_VIEW).apply {
    data = Uri.parse("https://wa.me/$whatsappNumber?text=$encodedMessage")
}
startActivity(intent)
```

### Empty Cart State

| Property | Value |
|----------|-------|
| Icon | Empty cart SVG/illustration, 80-120dp |
| Heading | "Your cart is empty" |
| Subtext | "Add some products to get started!" |
| CTA Button | "Continue Shopping" with arrow icon |
| Layout | Centered, min height 400dp |

### Form Validation

| Field | Validation Rules |
|-------|------------------|
| Name | Required, min 2 characters |
| Phone | Required, 11 digits, starts with "01", pattern: `^01[0125][0-9]{8}$` |
| Street | Required, min 5 characters |
| Governorate | Required, must select |
| City | Required, min 2 characters |
| Notes/Landmarks | Required, min 10 characters, max 200 |
| Payment | Required, must select |

Show inline error messages below invalid fields in red.

---

## 4. Contact Us Screen

### Overview
A contact page with multiple contact methods and a contact form that sends messages via WhatsApp.

### Screen Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                       Contact Us                                │
│  We're here to help! Reach out through any channel below.       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Get In Touch                                                   │
│  ─────────────────────────────────────────                      │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📞  Call Us                                                │ │
│  │     Speak directly with our team                           │ │
│  │     01070289832                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📱  WhatsApp                                               │ │
│  │     Quick and easy messaging                               │ │
│  │     01108563748                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📧  Email                                                  │ │
│  │     Send us a detailed message                             │ │
│  │     sakrstore2@gmail.com                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📍  Location                                               │ │
│  │     Based in El Shorouk & Zagazig                          │ │
│  │     Nationwide Delivery Across Egypt                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Send Us a Message                                              │
│  Fill out the form and we'll respond within 24 hours.          │
│  ─────────────────────────────────────────                      │
│                                                                 │
│  Your Name *                                                    │
│  [                                              ]               │
│                                                                 │
│  Email Address *                                                │
│  [                                              ]               │
│                                                                 │
│  Phone Number (Optional)                                        │
│  [                                              ]               │
│                                                                 │
│  Subject *                                                      │
│  [                                              ]               │
│                                                                 │
│  Message *                                                      │
│  [                                              ]               │
│  [                                              ]               │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📱 Send Message via WhatsApp                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      Business Hours                             │
│                  ┌───────────────────┐                          │
│                  │  🕐 24/7 Available │                          │
│                  └───────────────────┘                          │
│        We're always here to help with your tech needs!          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Contact Method Card

| Property | Value |
|----------|-------|
| Background | Card background |
| Border Radius | 12dp |
| Padding | 16dp |
| Shadow | `elevation: 2dp` |
| Margin Bottom | 12dp |
| Tap Action | Opens phone/WhatsApp/email/maps app |
| Hover State | Slight translateX(-4dp) |

| Element | Style |
|---------|-------|
| Icon | 24dp, primary color, circular background with 10% primary |
| Title | 16sp, 600 weight, primary text |
| Description | 14sp, secondary text |
| Link/Value | 14sp, primary color, underline on tap |

### Contact Form

Same input styles as checkout form.

| Field | Type | Required |
|-------|------|----------|
| Name | Text | Yes |
| Email | Email | Yes |
| Phone | Tel | No |
| Subject | Text | Yes |
| Message | Textarea | Yes |

### WhatsApp Message Format (Contact Form)
```
*New Contact Form Submission*

*Name:* [Name]
*Email:* [Email]
*Phone:* [Phone if provided]
*Subject:* [Subject]

*Message:*
[Message content]
```

### Business Hours Badge

| Property | Value |
|----------|-------|
| Background | Primary gradient |
| Text | "24/7 Available" |
| Text Color | White |
| Font Size | 18sp |
| Font Weight | 700 |
| Icon | 🕐 Clock, 24dp |
| Padding | 16dp horizontal, 12dp vertical |
| Border Radius | 12dp |
| Shadow | Primary shadow |
| Layout | Centered |

### Social Media Links
Display icons for:
- Facebook
- Instagram
- YouTube
- TikTok

| Property | Value |
|----------|-------|
| Size | 40dp × 40dp |
| Background | `rgba(255, 255, 255, 0.1)` or card hover |
| Icon Size | 20dp |
| Border Radius | 50% (circular) |
| Margin | 8dp between icons |
| Tap Action | Open respective app/URL |

---

## 5. Privacy Policy Screen

### Overview
A scrollable legal document screen displaying the privacy policy.

### Screen Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                     🛡️ Privacy Policy                           │
│                   Effective Date: November 11, 2025             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  (Scrollable Content)                                           │
│                                                                 │
│  ℹ️ Introduction                                                 │
│  ──────────────────────────────────────────                     │
│  At SAKR STORE, we are committed to protecting your privacy...  │
│                                                                 │
│  📋 Information We Collect                                       │
│  ──────────────────────────────────────────                     │
│  Personal Information:                                          │
│  • Name: To identify you...                                     │
│  • Email Address: To send order confirmations...                │
│  • Phone Number: To contact you...                              │
│  ...                                                            │
│                                                                 │
│  ⚙️ How We Use Your Information                                  │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  🛡️ How We Protect Your Data                                    │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  🍪 Cookies Policy                                               │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  🌐 Third-Party Services                                         │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  🔗 Data Sharing and Disclosure                                  │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  👤 Your Rights                                                  │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  ⏱️ Data Retention                                               │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  👶 Children's Privacy                                           │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  🔄 Changes to This Policy                                       │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  ⚖️ Governing Law                                                │
│  ──────────────────────────────────────────                     │
│  ...                                                            │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          Questions About Your Privacy?                     │ │
│  │  [📱 WhatsApp] [📧 Email] [📞 Contact Page]                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Styling

#### Header Section
| Property | Value |
|----------|-------|
| Background | Gradient: `rgba(30, 58, 138, 0.1)` → `rgba(37, 99, 235, 0.1)` |
| Border Radius | 12dp |
| Padding | 24dp |
| Title Font | 24sp, 700 weight |
| Title Icon | 🛡️ Shield, 28dp, primary color |
| Subtitle | 14sp, secondary text |

#### Content Card
| Property | Value |
|----------|-------|
| Background | Card background |
| Border Radius | 12dp |
| Shadow | `elevation: 4dp` |
| Padding | 24dp |
| Margin | 16dp horizontal |

#### Section Headers
| Property | Value |
|----------|-------|
| Font Size | 20sp |
| Font Weight | 700 |
| Color | Primary text |
| Icon | Before text, 20dp, primary color |
| Border Bottom | 2dp solid primary color |
| Padding Bottom | 8dp |
| Margin Top | 24dp |
| Margin Bottom | 12dp |

#### Body Text
| Property | Value |
|----------|-------|
| Font Size | 16sp |
| Line Height | 1.8 |
| Color | Secondary text |
| Margin Bottom | 12dp |

#### Bullet Lists
| Property | Value |
|----------|-------|
| Bullet | • |
| Indent | 16dp |
| Item Spacing | 8dp |
| Bold Labels | Within list items for key terms |

#### Highlight Box (Info)
| Property | Value |
|----------|-------|
| Background | Info background `#DBEAFE` (light) / `#1E3A8A` (dark) |
| Border Left | 4dp solid info color `#2563EB` |
| Padding | 16dp |
| Border Radius | 8dp |
| Margin | 16dp vertical |

#### Warning Box
| Property | Value |
|----------|-------|
| Background | Warning background `#FEF3C7` (light) / `#78350F` (dark) |
| Border Left | 4dp solid warning color `#D97706` |
| Padding | 16dp |
| Border Radius | 8dp |
| Margin | 16dp vertical |

#### Contact CTA Box
| Property | Value |
|----------|-------|
| Background | Primary gradient |
| Text Color | White |
| Border Radius | 12dp |
| Padding | 24dp |
| Title | 20sp, 600 weight, white |
| Buttons | Row of action buttons (WhatsApp, Email, Contact) |

### Sections to Include
1. Introduction
2. Information We Collect (Personal + Automatic)
3. How We Use Your Information
4. How We Protect Your Data
5. Cookies Policy
6. Third-Party Services (WhatsApp, Payment, Shipping)
7. Data Sharing and Disclosure
8. Your Rights (Access, Correction, Deletion, etc.)
9. Data Retention
10. Children's Privacy
11. Changes to This Privacy Policy
12. Governing Law
13. Contact CTA

---

## 6. Terms & Conditions Screen

### Overview
Similar structure to Privacy Policy screen, displaying terms of service.

### Sections to Include
1. Introduction
2. About SAKR STORE (Business info)
3. Website Usage (Acceptance, Prohibited Activities)
4. Orders and Purchases (Placement, Acceptance, Availability)
5. Pricing and Payments (Pricing, Methods, Terms)
6. Shipping and Delivery (Coverage, Timeframes, Costs, Responsibilities)
7. Product Warranties (Store, Manufacturer, Claims, Exclusions)
8. Returns and Exchanges (Link to Return Policy)
9. Intellectual Property
10. Limitation of Liability
11. Indemnification
12. Third-Party Links
13. Privacy and Data Protection (Link to Privacy Policy)
14. Changes to Terms
15. Severability
16. Entire Agreement
17. Governing Law and Jurisdiction
18. Contact Information

### Same styling as Privacy Policy screen

---

## 7. Return Policy Screen

### Overview
Displays the return and exchange policy with clear eligibility criteria.

### Sections to Include
1. Our Commitment
2. Return Policy (7 Days)
   - Eligibility
   - How to Initiate
   - Refund Process
3. Exchange Policy (15 Days)
   - Eligibility
   - How to Request
4. Non-Returnable Items
5. Defective or Damaged Products
6. Warranty Information (30-day store warranty)
7. Important Notes
8. Contact CTA

### Key Visual Elements

#### Policy Timeframes
Create prominent badges/cards for:

| Badge | Style |
|-------|-------|
| "7-Day Returns" | Green gradient badge, large |
| "15-Day Exchanges" | Blue gradient badge, large |
| "30-Day Warranty" | Primary gradient badge, large |

#### Eligibility Checklist
Display eligibility items as checklist with ✓ icons:
- ✓ Original, new, unused condition
- ✓ Factory seal intact (if applicable)
- ✓ Original packaging included
- ✓ All accessories included

#### Non-Returnable Warning
Use warning box styling to highlight items that cannot be returned.

### Same overall styling as Privacy Policy screen

---

## Implementation Priority

1. **High Priority**
   - Hamburger Menu Sidebar (core navigation)
   - Product Card (main feature)
   - Checkout Flow (revenue generation)

2. **Medium Priority**
   - Contact Us Screen (customer support)
   - Return Policy Screen (builds trust)

3. **Lower Priority**
   - Privacy Policy Screen
   - Terms & Conditions Screen

---

## Color Reference Quick Guide

### Light Mode
| Token | Hex |
|-------|-----|
| Background | `#E5E7EB` |
| Card Background | `#FFFFFF` |
| Primary | `#2563EB` |
| Primary Text | `#0F172A` |
| Secondary Text | `#334155` |
| Border | `#D1D5DB` |
| Success/Price | `#059669` |
| Error | `#DC2626` |
| Warning | `#D97706` |

### Dark Mode
| Token | Hex |
|-------|-----|
| Background | `#0A0F1A` |
| Card Background | `#1A1F2E` |
| Primary | `#3B82F6` |
| Primary Text | `#F1F5F9` |
| Secondary Text | `#E5E7EB` |
| Border | `#2D3548` |
| Success/Price | `#10B981` |
| Error | `#FCA5A5` |
| Warning | `#FCD34D` |

---

*Document Version: 1.0*
*Last Updated: November 29, 2025*
*For: Sakr Store Android App Development*
