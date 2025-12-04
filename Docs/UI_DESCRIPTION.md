# Sakr Store - Comprehensive UI Description

> This document describes the complete visual design system, components, and user interface patterns of the Sakr Store e-commerce website. Use this guide to recreate the exact look and feel in native mobile applications (Android/iOS).

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Iconography](#4-iconography)
5. [Spacing & Layout System](#5-spacing--layout-system)
6. [Header & Navigation](#6-header--navigation)
7. [Product Cards](#7-product-cards)
8. [Product Detail Page](#8-product-detail-page)
9. [Shopping Cart](#9-shopping-cart)
10. [Forms & Inputs](#10-forms--inputs)
11. [Buttons](#11-buttons)
12. [Badges & Labels](#12-badges--labels)
13. [Footer](#13-footer)
14. [Animations & Transitions](#14-animations--transitions)
15. [Dark Mode](#15-dark-mode)
16. [Arabic/RTL Support](#16-arabicrtl-support)
17. [Mobile Responsive Patterns](#17-mobile-responsive-patterns)

---

## 1. Brand Identity

### Store Name
- **Name:** Sakr Store (صقر ستور in Arabic)
- **Logo Style:** Text-based logo with store name
- **Tagline:** Consumer electronics and accessories store

### Product Categories
The store sells:
- Airpods & Earbuds (wireless earphones)
- Headphones (over-ear, neckband)
- Smart Watches
- Power Banks
- Chargers & Adapters
- Cables
- Flash Drives & Memory Cards
- Camera Accessories (ring lights, microphones, tripods)
- OTG Adapters & Card Readers

### Currency
- **Currency:** Egyptian Pound (EGP)
- **Format:** Price displayed as `XXX.XX` followed by currency
- **Example:** `899.99 EGP` or `٨٩٩.٩٩ ج.م` in Arabic

---

## 2. Color System

### Light Mode Colors

| Token | HEX Value | Usage |
|-------|-----------|-------|
| `--primary-color` | `#2563eb` | Primary buttons, links, accents, selected states |
| `--primary-hover` | `#1d4ed8` | Button hover states |
| `--bg-color` | `#e5e7eb` | Page background |
| `--card-bg` | `#ffffff` | Card backgrounds, modals |
| `--card-hover` | `#f3f4f6` | Card hover state background |
| `--card-border` | `#d1d5db` | Card borders, dividers |
| `--text-color` | `#0f172a` | Primary text (headings, body) |
| `--secondary-text` | `#475569` | Secondary text, descriptions |
| `--muted-text` | `#94a3b8` | Placeholders, hints, disabled text |
| `--header-bg` | `#111827` | Header/footer background (dark) |
| `--header-text` | `#f9fafb` | Header/footer text (light) |

### Semantic Colors

| Token | HEX Value | Usage |
|-------|-----------|-------|
| `--price-regular` | `#2563eb` | Regular price display |
| `--price-discount` | `#dc2626` | Discounted/sale price |
| `--price-original` | `#64748b` | Original price (strikethrough) |
| `--success-color` | `#10b981` | Success states, "New" badge |
| `--error-color` | `#dc2626` | Error states, "Sale" badge |
| `--warning-color` | `#f59e0b` | Warning states, low stock |
| `--info-color` | `#2563eb` | Information messages |

### Gradient Colors

| Gradient | Value | Usage |
|----------|-------|-------|
| Primary Gradient | `linear-gradient(135deg, #2563eb 0%, #1e40af 100%)` | Primary buttons, CTA |
| WhatsApp Gradient | `linear-gradient(135deg, #25D366 0%, #128C7E 100%)` | WhatsApp buttons |
| New Badge | `linear-gradient(135deg, #10b981 0%, #059669 100%)` | "New" product badge |
| Sale Badge | `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)` | "Sale" product badge |

### Shadow System

| Shadow | Value | Usage |
|--------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle shadows |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` | Cards, elevated elements |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` | Overlays |

---

## 3. Typography

### Font Families

| Language | Primary Font | Fallback |
|----------|--------------|----------|
| English/LTR | `Inter` | `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif` |
| Arabic/RTL | `Cairo` | `Tajawal, sans-serif` |

### Font Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Page Title (H1) | `clamp(1.5rem, 5vw + 0.5rem, 2.5rem)` | 800 | 1.2 |
| Section Title (H2) | `clamp(1.25rem, 3vw + 0.5rem, 1.875rem)` | 700 | 1.3 |
| Card Title (H3) | `clamp(1rem, 2vw + 0.5rem, 1.25rem)` | 600 | 1.4 |
| Body Text | `clamp(0.9375rem, 1vw + 0.75rem, 1.0625rem)` | 400 | 1.6-1.8 |
| Small Text | `clamp(0.75rem, 1.5vw, 0.875rem)` | 400-500 | 1.5 |
| Price (Large) | `clamp(1.5rem, 3vw + 0.5rem, 2rem)` | 700 | 1.2 |
| Price (Card) | `clamp(1rem, 2vw + 0.5rem, 1.25rem)` | 700 | 1.3 |
| Badge Text | `clamp(0.625rem, 1vw + 0.2rem, 0.75rem)` | 700 | 1 |
| Button Text | `clamp(0.875rem, 1.5vw + 0.5rem, 1rem)` | 600-700 | 1 |

### Text Styles

- **Headings:** Slightly negative letter-spacing (`-0.02em`)
- **Body:** Default letter-spacing
- **Uppercase:** Used for badges with `0.05em` letter-spacing
- **Price Display:** Uses tabular numbers for alignment

---

## 4. Iconography

### Icon Library
The website uses **Feather Icons** via Lucide (open-source).

### Common Icons Used

| Icon | Usage |
|------|-------|
| 🔍 Search | Search bar, product search |
| 🛒 Shopping Cart | Cart icon in header, add-to-cart buttons |
| ☀️/🌙 Sun/Moon | Theme toggle (light/dark) |
| ❌ X | Close buttons, remove items |
| ➕/➖ Plus/Minus | Quantity selectors |
| ↗️ External Link/Share | Share product |
| 📱 WhatsApp | WhatsApp contact/order button |
| ⭐ Star | "New" product badge |
| 🏷️ Tag | "Sale" discount badge |
| 📦 Package | Shipping info, product stock |
| 💳 Credit Card | Payment methods |
| 🔒 Lock | Secure checkout |
| ✓ Check | Trust badges, validation |
| 🏠 Home | Breadcrumb home |
| ≡ Menu (Hamburger) | Mobile navigation |
| ← Arrow Left | Navigation, back button |
| → Arrow Right | Navigation, lightbox |

### Icon Sizing

| Context | Size |
|---------|------|
| Header Icons | 20-24px |
| Card Icons | 16-20px |
| Button Icons | 18-24px |
| Badge Icons | 14-16px |
| Small/Inline Icons | 12-16px |

---

## 5. Spacing & Layout System

### Spacing Scale (Using CSS clamp for fluidity)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `clamp(0.25rem, 0.5vw, 0.375rem)` | Tight spacing |
| `--space-sm` | `clamp(0.5rem, 1vw, 0.75rem)` | Small gaps |
| `--space-md` | `clamp(0.75rem, 2vw, 1rem)` | Medium gaps |
| `--space-lg` | `clamp(1rem, 3vw, 1.5rem)` | Large gaps |
| `--space-xl` | `clamp(1.5rem, 4vw, 2rem)` | Section spacing |
| `--space-2xl` | `clamp(2rem, 6vw, 3rem)` | Major sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small elements, badges |
| `--radius-md` | `8-10px` | Buttons, inputs |
| `--radius-lg` | `12-16px` | Cards, containers |
| `--radius-full` | `9999px` | Pills, circular buttons |

### Layout Constraints

| Element | Max Width |
|---------|-----------|
| Main Container | `1400px` |
| Content Width | `1200px` |
| Sidebar Width | `280px` |
| Order Summary | `380-420px` |

### Grid System

- **Product Grid:** `repeat(auto-fill, minmax(clamp(160px, 25vw, 280px), 1fr))`
- **Gap:** `clamp(1rem, 3vw, 2rem)`

---

## 6. Header & Navigation

### Desktop Header Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo: Sakr Store]      [Search Bar]      [Theme] [Cart Badge] │
│                                           [☀️/🌙]  [🛒 (3)]    │
└─────────────────────────────────────────────────────────────────┘
```

### Header Specifications

| Property | Value |
|----------|-------|
| Background | `#111827` (dark) |
| Height | `60-80px` |
| Position | Sticky at top |
| Z-Index | `1000` |
| Text Color | `#f9fafb` (light) |
| Padding | `0.75rem 1.5rem` |

### Logo

- Text-based: "Sakr Store" or "صقر ستور"
- Font Size: `clamp(1.25rem, 3vw, 1.75rem)`
- Font Weight: 700
- Color: White
- Optional: Store icon/emoji before name

### Search Bar

| Property | Value |
|----------|-------|
| Width | `clamp(200px, 40vw, 400px)` |
| Height | `40-44px` |
| Background | Semi-transparent white (`rgba(255,255,255,0.1)`) |
| Border | `1px solid rgba(255,255,255,0.2)` |
| Border Radius | `8px` |
| Placeholder | "Search products..." / "ابحث عن منتجات..." |
| Icon | Search icon on left |

### Cart Icon

| Property | Value |
|----------|-------|
| Icon Size | `24px` |
| Badge Position | Top-right corner |
| Badge Size | `18-20px` |
| Badge Background | `#dc2626` (red) |
| Badge Text | Item count, white, bold |

### Theme Toggle

| Property | Value |
|----------|-------|
| Icon | Sun (☀️) for light mode, Moon (🌙) for dark mode |
| Size | `24px` button |
| Animation | Smooth icon transition |

### Mobile Header

```
┌─────────────────────────────────────┐
│ [☰]   [Logo: Sakr Store]    [🛒]   │
└─────────────────────────────────────┘
```

- Hamburger menu on left
- Centered logo
- Cart icon on right
- Search moves to collapsible search bar or filter sheet

### Mobile Navigation (Off-Canvas)

- Slides in from left
- Full height
- Contains: Categories, Theme Toggle, Links
- Overlay backdrop (`rgba(0,0,0,0.5)`)

---

## 7. Product Cards

### Card Structure

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
│  [Only 3 left! ⚠️]                    │  ← Low stock warning
│                                      │
│  ┌──────────────────────────────┐    │
│  │  🛒  Add to Cart             │    │  ← Add to cart button
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

### Card Specifications

| Property | Value |
|----------|-------|
| Background | `#ffffff` (card-bg) |
| Border | `1px solid rgba(209, 213, 219, 0.3)` |
| Border Radius | `12-16px` |
| Shadow | `var(--shadow-md)` |
| Hover Shadow | `var(--shadow-lg)` |
| Hover Transform | `translateY(-6px)` |
| Transition | `all 0.3s ease` |

### Product Image

| Property | Value |
|----------|-------|
| Aspect Ratio | `1:1` (square) |
| Object Fit | `contain` |
| Background | Subtle gradient overlay |
| Padding | `16px` inside image area |
| Hover Effect | `scale(1.05)` |

### Product Name

| Property | Value |
|----------|-------|
| Font Size | `clamp(0.875rem, 1.5vw + 0.5rem, 1.0625rem)` |
| Font Weight | 600 |
| Max Lines | 2 |
| Overflow | Ellipsis (`-webkit-line-clamp: 2`) |
| Line Height | 1.4 |

### Price Display

| State | Style |
|-------|-------|
| Regular Price | Blue (`#2563eb`), Bold 700 |
| Discounted Price | Red (`#dc2626`), Bold 700 |
| Original Price (crossed) | Gray (`#64748b`), 500, strikethrough |
| Size | `clamp(1rem, 2vw + 0.5rem, 1.25rem)` |

### Low Stock Warning

| Property | Value |
|----------|-------|
| Condition | Show when `stock <= 5` |
| Background | `rgba(245, 158, 11, 0.1)` |
| Text Color | `#d97706` (amber) |
| Icon | ⚠️ Warning |
| Border | `1px solid rgba(245, 158, 11, 0.3)` |
| Border Radius | `6px` |
| Font Size | `0.75rem` |

---

## 8. Product Detail Page

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Category > Product Name                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │                         │  │                             │  │
│  │  [NEW ⭐]     [SALE 🏷️] │  │  Product Title Here        │  │
│  │                         │  │                             │  │
│  │    ┌───────────────┐    │  │  ̶8̶9̶9̶.̶9̶9̶ ̶E̶G̶P̶ → 749.99 EGP  │  │
│  │    │               │    │  │                             │  │
│  │    │   [Main       │    │  │  Product description text   │  │
│  │    │    Product    │    │  │  goes here with multiple    │  │
│  │    │    Image]     │    │  │  lines of detail...         │  │
│  │    │               │    │  │                             │  │
│  │    └───────────────┘    │  │  ┌─────────────────────────┐│  │
│  │                         │  │  │ [-] [Qty: 1] [+]        ││  │
│  │  [Thumb][Thumb][Thumb]  │  │  └─────────────────────────┘│  │
│  │                         │  │                             │  │
│  └─────────────────────────┘  │  [🛒 Add to Cart          ] │  │
│                               │  [📱 Ask on WhatsApp      ] │  │
│                               │  [↗️ Share               ] │  │
│                               │                             │  │
│                               │  ┌─Trust Badges───────────┐ │  │
│                               │  │✓ Fast Shipping         │ │  │
│                               │  │✓ Secure Payment        │ │  │
│                               │  │✓ Return Policy         │ │  │
│                               │  └─────────────────────────┘ │  │
│                               └─────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Related Products Section                                        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│ │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │               │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### Image Gallery

| Component | Specification |
|-----------|---------------|
| Main Image Container | `aspect-ratio: 1/1`, max-height `550px` |
| Image Object Fit | `contain` |
| Background | Subtle gradient |
| Border | `1px solid var(--card-border)` |
| Border Radius | `10-12px` |
| Click Action | Opens lightbox |

### Thumbnails

| Property | Value |
|----------|-------|
| Size | `70-90px` square |
| Border | `2px solid var(--card-border)` |
| Active Border | `3px solid var(--primary-color)` |
| Border Radius | `8-10px` |
| Spacing | `gap: 0.5-0.75rem` |
| Scroll | Horizontal with thin scrollbar |

### Lightbox

| Property | Value |
|----------|-------|
| Background | `rgba(0, 0, 0, 0.92)` with `blur(8px)` |
| Image Max Size | `90vw × 85vh` |
| Close Button | Top-right, 40-48px circle, semi-transparent |
| Navigation | Left/right arrows, circular, semi-transparent |
| Animation | Fade in overlay, scale in image |

### Quantity Selector

| Property | Value |
|----------|-------|
| Background | `var(--card-bg)` |
| Border | `2px solid var(--card-border)` |
| Border Radius | `8-10px` |
| Button Size | `36-44px` square |
| Button Style | Primary color, rounded |
| Input Width | `50-60px`, centered text |
| Font Weight | 700 |

### Trust Badges

| Property | Value |
|----------|-------|
| Layout | Grid, 2-3 columns |
| Background | Subtle primary gradient |
| Border | `1px solid` primary at 15% |
| Border Radius | `10-12px` |
| Icon Size | `40-56px` circular container |
| Icon Color | Primary blue |

---

## 9. Shopping Cart

### Cart Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Shopping Cart                           │
│                    3 items in your cart                         │
├────────────────────────────────┬────────────────────────────────┤
│                                │                                │
│  Cart Items Section            │  Order Summary                 │
│  ┌────────────────────────┐    │  ┌────────────────────────┐   │
│  │ [Img] Product Name     │    │  │ Order Summary          │   │
│  │       Price            │    │  │                        │   │
│  │       [-][1][+]  [×]   │    │  │ Subtotal:     XXX EGP  │   │
│  └────────────────────────┘    │  │ Shipping:     Free     │   │
│  ┌────────────────────────┐    │  │ ───────────────────    │   │
│  │ [Img] Product Name     │    │  │ Total:        XXX EGP  │   │
│  │       Price            │    │  │                        │   │
│  │       [-][1][+]  [×]   │    │  │ [Coupon Input] [Apply] │   │
│  └────────────────────────┘    │  └────────────────────────┘   │
│                                │                                │
│                                │  Customer Information          │
│                                │  ┌────────────────────────┐   │
│                                │  │ Name: _____________    │   │
│                                │  │ Phone: ____________    │   │
│                                │  │ Address: __________    │   │
│                                │  │ Governorate: [▼]       │   │
│                                │  │ Payment: [▼]           │   │
│                                │  │ Notes: ____________    │   │
│                                │  │                        │   │
│                                │  │ [📱 Order via WhatsApp]│   │
│                                │  └────────────────────────┘   │
│                                │                                │
└────────────────────────────────┴────────────────────────────────┘
```

### Cart Item Row

| Property | Value |
|----------|-------|
| Layout | CSS Grid: `image (75-160px) | info (1fr) | quantity | remove` |
| Background | `var(--bg-color)` |
| Border | `2px solid transparent`, hover: `var(--primary-color)` |
| Border Radius | `12px` |
| Hover Effect | `translateY(-2px)`, shadow |
| Padding | `clamp(0.75rem, 2vw, 1.5rem)` |

### Cart Item Image

| Property | Value |
|----------|-------|
| Size | `75-160px` square |
| Aspect Ratio | `1:1` |
| Object Fit | `contain` |
| Border Radius | `10px` |
| Background | Subtle gradient |

### Empty Cart State

| Property | Value |
|----------|-------|
| Icon | Empty cart illustration, `60-120px` |
| Heading | "Your cart is empty" |
| Subtext | "Browse our products and add items" |
| CTA Button | "Continue Shopping" with arrow |
| Text Align | Center |
| Min Height | `400px` |

### Order Summary Card

| Property | Value |
|----------|-------|
| Position | Sticky, `top: 100px` |
| Background | `var(--card-bg)` |
| Border Radius | `16px` |
| Shadow | `var(--shadow-md)` |
| Max Width | `380-420px` |

---

## 10. Forms & Inputs

### Text Input

| Property | Value |
|----------|-------|
| Height | `44-48px` |
| Padding | `0.625-0.875rem` horizontal, `0.75-1rem` vertical |
| Background | `var(--card-bg)` |
| Border | `2px solid var(--card-border)` |
| Border Radius | `8-10px` |
| Font Size | `16px` (prevents iOS zoom) |
| Focus Border | `var(--primary-color)` |
| Focus Shadow | `0 0 0 4px rgba(37, 99, 235, 0.1)` |

### Select Dropdown

| Property | Value |
|----------|-------|
| Appearance | Custom arrow (chevron SVG) |
| Arrow Position | Right `1rem` from edge |
| Arrow Size | `18px` |
| All other props | Same as text input |

### Textarea

| Property | Value |
|----------|-------|
| Min Height | `80px` |
| Resize | Vertical only |
| Line Height | `1.5` |
| All other props | Same as text input |

### Form Labels

| Property | Value |
|----------|-------|
| Font Size | `clamp(0.8125rem, 1.5vw, 0.9375rem)` |
| Font Weight | 600 |
| Color | `var(--text-color)` |
| Margin Bottom | `0.5rem` |
| Icon | Optional left icon, `18px`, primary color |

### Validation States

| State | Border Color | Icon |
|-------|--------------|------|
| Default | `var(--card-border)` | None |
| Focus | `var(--primary-color)` | None |
| Valid | Green tint | ✓ Checkmark |
| Invalid | Red tint | ✗ X mark |

---

## 11. Buttons

### Primary Button

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #2563eb 0%, #1e40af 100%)` |
| Color | `#ffffff` |
| Border | None |
| Border Radius | `8-12px` |
| Padding | `0.75-1rem` vertical, `1.25-2rem` horizontal |
| Font Weight | 700 |
| Shadow | `0 4px 12px rgba(37, 99, 235, 0.3)` |
| Hover Transform | `translateY(-2px)` |
| Hover Shadow | `0 6px 16px rgba(37, 99, 235, 0.4)` |

### WhatsApp Button

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #25D366 0%, #128C7E 100%)` |
| Color | `#ffffff` |
| Icon | WhatsApp icon, `18-24px` |
| All other props | Same as Primary Button |
| Hover Shadow | `0 6px 16px rgba(37, 211, 102, 0.4)` |

### Secondary/Outline Button

| Property | Value |
|----------|-------|
| Background | Transparent or `var(--card-bg)` |
| Color | `var(--primary-color)` |
| Border | `2px solid var(--primary-color)` |
| Hover Background | `var(--primary-color)` at 10% |

### Icon Button (Remove, Close)

| Property | Value |
|----------|-------|
| Size | `30-48px` square |
| Background | Transparent |
| Color | `var(--error-color)` or `var(--muted-text)` |
| Border Radius | `8px` |
| Hover Background | Error color at 10% |
| Hover Scale | `1.1` |

### Quantity Button (+/-)

| Property | Value |
|----------|-------|
| Size | `36-44px` square |
| Background | `var(--primary-color)` |
| Color | White |
| Border Radius | `6-8px` |
| Font Size | `1-1.25rem` |
| Font Weight | 700 |
| Disabled Style | Gray background, 50% opacity |

### Disabled Button State

| Property | Value |
|----------|-------|
| Background | `var(--card-border)` or original at 60% opacity |
| Cursor | `not-allowed` |
| Transform | None |
| Shadow | None |

---

## 12. Badges & Labels

### "New" Product Badge

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #10b981 0%, #059669 100%)` |
| Color | `#ffffff` |
| Font Size | `0.625-0.75rem` |
| Font Weight | 700 |
| Text Transform | Uppercase |
| Letter Spacing | `0.05em` |
| Padding | `0.375-0.5rem` horizontal, `0.25-0.4rem` vertical |
| Border Radius | `6-8px` |
| Position | Absolute, top-right of image |
| Shadow | `0 4px 12px rgba(16, 185, 129, 0.4)` |
| Icon | ⭐ Star icon before text |
| Animation | Subtle pulse |

### "Sale" Discount Badge

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)` |
| Text | "SALE" or "-XX%" |
| All other props | Same as New badge |
| Position | Top-left of image (opposite of New) |
| Shadow | `0 4px 12px rgba(220, 38, 38, 0.4)` |
| Icon | 🏷️ Tag icon before text |

### Cart Count Badge

| Property | Value |
|----------|-------|
| Size | `18-20px` |
| Background | `#dc2626` (red) |
| Color | White |
| Font Size | `0.65-0.75rem` |
| Font Weight | 700 |
| Border Radius | `50%` (circle) |
| Position | Top-right of cart icon, offset `-8px` |
| Min Content | "99+" for large numbers |

### Stock Warning Badge

| Property | Value |
|----------|-------|
| Background | `rgba(245, 158, 11, 0.1)` |
| Border | `1px solid rgba(245, 158, 11, 0.3)` |
| Text Color | `#d97706` |
| Font Size | `0.625-0.75rem` |
| Icon | ⚠️ Warning |
| Border Radius | `6px` |
| Padding | `0.25-0.375rem` vertical, `0.5rem` horizontal |

### Trust Badges (Footer/Product)

| Property | Value |
|----------|-------|
| Layout | Inline-flex with icon + text |
| Background | `rgba(255,255,255,0.1)` (on dark) or `var(--card-bg)` |
| Border Radius | `8px` |
| Icon Color | Green (`var(--success-color)`) |
| Padding | `0.5rem 1rem` |

---

## 13. Footer

### Footer Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  About Us          Quick Links       Contact          Connect  │
│  ──────────        ──────────        ──────────       ──────── │
│  Store desc...     • Home            📍 Address       [FB]     │
│                    • Products        📞 Phone         [IG]     │
│                    • FAQ             ✉️ Email          [WA]     │
│                    • Terms                            [TW]     │
│                    • Privacy                                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Trust Badges: ✓ Secure | ✓ Fast Shipping | ✓ Returns   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  © 2024 Sakr Store. All rights reserved.                       │
│  Made with ❤️ in Egypt                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Footer Specifications

| Property | Value |
|----------|-------|
| Background | `#111827` (header-bg, dark) |
| Text Color | `rgba(255, 255, 255, 0.85)` |
| Heading Color | `#ffffff` |
| Link Hover | `#ffffff` with underline |
| Padding | `3rem 0 1rem` |
| Grid | `repeat(auto-fit, minmax(250px, 1fr))` |
| Gap | `2rem` |

### Social Media Links

| Property | Value |
|----------|-------|
| Size | `2.5rem` (40px) |
| Shape | Circle |
| Background | `rgba(255, 255, 255, 0.1)` |
| Icon Size | `1.25rem` |
| Hover Background | `rgba(255, 255, 255, 0.2)` |
| Hover Transform | `translateY(-3px)` |

---

## 14. Animations & Transitions

### Transition Defaults

| Property | Value |
|----------|-------|
| Duration | `0.3s` (300ms) |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out) |
| Properties | `all` or specific: `transform, opacity, background, border, box-shadow` |

### Common Animations

| Animation | Description | CSS |
|-----------|-------------|-----|
| Hover Lift | Cards/buttons rise up | `transform: translateY(-2px) to translateY(-6px)` |
| Scale Up | Icons, thumbnails | `transform: scale(1.05) to scale(1.1)` |
| Fade In | Modals, overlays | `opacity: 0 to 1` |
| Slide In | Mobile menu, sheets | `transform: translateX(-100%) to translateX(0)` |
| Pulse | Badges | `scale(1) → scale(1.05) → scale(1)` infinite |
| Rotate | Close button on hover | `transform: rotate(90deg)` |

### Loading States

| Animation | Description |
|-----------|-------------|
| Skeleton Loader | Shimmer effect on placeholder elements |
| Spinner | Rotating circle for button loading states |
| Opacity Fade | 50% opacity during data loading |

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- Disable all transforms
- Disable all animations
- Keep color transitions at 100ms

---

## 15. Dark Mode

### Dark Mode Color Overrides

| Token | Dark Value |
|-------|------------|
| `--bg-color` | `#0a0f1a` |
| `--card-bg` | `#1a1f2e` |
| `--card-hover` | `#242a3d` |
| `--card-border` | `#2d3548` |
| `--text-color` | `#f1f5f9` |
| `--secondary-text` | `#94a3b8` |
| `--muted-text` | `#64748b` |
| `--header-bg` | `#0d1321` |
| `--sidebar-bg` | `#141925` |

### Dark Mode Specific Adjustments

- Shadows use higher opacity: `rgba(0, 0, 0, 0.3-0.5)`
- Gradients slightly adjusted for contrast
- Badge shadows slightly brighter
- Select dropdown arrow uses lighter gray (`#999`)
- Success color filter: `brightness(1.5)` in footer

### Theme Toggle

- Uses `data-theme="dark"` attribute on `<html>` or `<body>`
- Persists in `localStorage`
- Smooth color transitions on toggle

---

## 16. Arabic/RTL Support

### Direction Switch

When content is Arabic:
- `dir="rtl"` attribute on container
- `lang="ar"` for proper font selection

### RTL Adjustments

| Element | LTR → RTL |
|---------|-----------|
| Text Alignment | left → right |
| Margins/Paddings | Use `margin-inline-start/end` |
| Flexbox | `flex-direction` reverses automatically |
| Icons | Some flip horizontally (arrows) |
| Gradients | May need reversal for visual balance |

### Arabic Typography

| Property | Value |
|----------|-------|
| Font Family | `'Cairo', 'Tajawal', sans-serif` |
| Font Weight | Generally +100 for same visual weight |
| Line Height | Increased to `1.6-1.8` for readability |
| Letter Spacing | `0` (no tracking) |

### Logical Properties Used

- `inset-inline-start` / `inset-inline-end` instead of `left` / `right`
- `margin-inline-start` / `padding-inline-end`
- `border-inline-start`
- `text-align: start` / `text-align: end`

---

## 17. Mobile Responsive Patterns

### Breakpoints

| Name | Width | Purpose |
|------|-------|---------|
| Mobile Small | `< 480px` | Small phones |
| Mobile Large | `< 768px` | Large phones, small tablets |
| Tablet | `< 1024px` | Tablets, landscape phones |
| Desktop | `≥ 1024px` | Laptops and above |

### Mobile-Specific UI Elements

#### Mobile Filter Button
- Fixed position or inline above products
- Opens bottom sheet with filters/sort

#### Bottom Sheet (Filter/Sort)
- Slides up from bottom
- `max-height: 85vh`
- Rounded top corners `20px`
- Drag handle indicator at top
- Backdrop overlay

#### Floating Cart Button (FAB)

| Property | Value |
|----------|-------|
| Position | Fixed, bottom-right |
| Size | `56-60px` |
| Background | Primary gradient |
| Icon | Cart with badge |
| Shadow | Large, primary-tinted |
| Bottom Offset | `20-24px` |
| Right Offset | `16-20px` |
| Z-Index | `1000` |

#### Mobile Navigation

- Off-canvas menu (slides from left)
- Full height
- Category list with collapsible subcategories
- Theme toggle in menu
- Close button (X)

### Touch Targets

- Minimum touch target: `44×44px`
- Adequate spacing between interactive elements
- Larger buttons on mobile

### Mobile Typography Scale

- Generally 10-15% smaller than desktop
- Maintained readability (min `14px` body text)
- Tighter line heights where space is constrained

### Mobile Layout Changes

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Product Grid | 3-4 columns | 2 columns |
| Cart Layout | Side-by-side | Stacked (items first, summary below) |
| Product Detail | Two columns | Single column |
| Header | Full search bar | Collapsed/hamburger |
| Sidebar Categories | Visible on left | Off-canvas |
| Order Summary | Sticky sidebar | Full width, after cart |

---

## Quick Reference: Android/iOS Implementation

### Material 3 (Android) Mapping

| Web Component | Material 3 Equivalent |
|---------------|----------------------|
| Product Card | `ElevatedCard` or `Card` |
| Primary Button | `Button` or `FilledButton` |
| WhatsApp Button | `FilledTonalButton` with custom color |
| Text Input | `OutlinedTextField` |
| Badge | `Badge` component |
| Bottom Sheet | `ModalBottomSheet` |
| Search Bar | `SearchBar` |
| Navigation | `NavigationBar` / `NavigationRail` |
| Theme Toggle | `Switch` with custom thumb |
| FAB | `FloatingActionButton` |

### SwiftUI (iOS) Mapping

| Web Component | SwiftUI Equivalent |
|---------------|-------------------|
| Product Card | Custom `View` with `.shadow()` |
| Primary Button | `Button` with `.buttonStyle()` |
| Text Input | `TextField` with custom styling |
| Badge | `Badge` or custom overlay |
| Bottom Sheet | `.sheet()` or `.presentationDetents()` |
| Search Bar | `SearchField` |
| Navigation | `NavigationStack` |
| Theme Toggle | `Toggle` |
| FAB | Custom positioned button |

---

## Appendix: Product Data Structure

```kotlin
data class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val description: String,
    val image: String,           // Legacy: primary image path
    val images: ProductImages,   // New: structured images
    val category: String,
    val discount: Boolean,
    val discountedPrice: Double,
    val stock: Int,
    val isNew: Boolean
)

data class ProductImages(
    val primary: String,
    val gallery: List<String>
)
```

### Categories Available
- Airpods
- Headphones
- Smart Watch
- Power Bank
- Chargers
- Adapter
- Cables
- Flash
- Camera Accessories
- Earphone
- OTG
- Card Reader
- Dongle

---

*Document Version: 1.0*
*Last Updated: January 2025*
*For: Sakr Store Android/iOS App Development*
