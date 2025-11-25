# 🎟️ Coupon System - Implementation Guide

## Overview

The coupon/discount code feature has been successfully integrated into Sakr Store. This document explains how the system works and how to manage coupons.

---

## 📁 File Structure

```
Sakr-Store/
├── coupons.json               ← Coupon database (plain JSON)
├── js/
│   └── app.js                 ← Updated with coupon logic
├── css/
│   └── cart.css               ← Coupon UI styles
├── cart.html                  ← Updated with coupon input
├── COUPONS_DEMO.md           ← Demo coupon documentation
└── COUPON_SYSTEM_README.md   ← This file
```

---

## ✨ Features

### ✅ Implemented Features:
- Coupon input field on cart page
- Real-time validation
- Two discount types: **Percentage** and **Fixed Amount**
- Conditional rules:
  - Minimum spend requirements
  - Category-specific coupons
- **Single coupon per checkout** (no stacking)
- Discount reflected in:
  - Cart total
  - WhatsApp checkout message
- Obfuscated storage (Base64 + XOR encryption)
- Case-insensitive code matching
- Enable/disable coupons without deletion

### ❌ Not Included:
- Expiration dates (removed per request)
- Usage limits per customer
- Server-side validation
- Automatic coupon generation

---

## 🎯 Demo Coupons

| Code | Type | Discount | Min Spend | Category |
|------|------|----------|-----------|----------|
| `WELCOME10` | Percentage | 10% | 500 EGP | All |
| `EARBUDS50` | Fixed | 50 EGP | 300 EGP | Airpods |
| `FLASH20` | Percentage | 20% | None | All |
| `NEWUSER15` | Percentage | 15% | 400 EGP | All |
| `MEGA100` | Fixed | 100 EGP | 1000 EGP | All |

See `COUPONS_DEMO.md` for detailed usage examples.

---

## 🔒 Security Approach

### Plain JSON Storage:
- Coupons stored in plain `coupons.json` file
- Easy to read and manage
- Directly editable by Sakr Store Manager
- No encoding/decoding overhead

### Trade-offs:
- ✅ No backend required (static hosting)
- ✅ Easy to manage via Sakr Store Manager or manually
- ✅ Simple and transparent
- ⚠️ Codes are publicly visible (anyone can see them)
- ⚠️ Acceptable for promotional codes (not sensitive data)

---

## 🛠️ How to Manage Coupons

### Method 1: Sakr Store Manager (Recommended)
**Status**: Ready for implementation in Manager

**Workflow:**
1. Open Manager → Coupons tab
2. Add/Edit coupons in readable form
3. Click "Publish"
4. Manager updates `coupons.json` directly
5. Git push to GitHub
6. Website automatically uses new coupons

**Next Steps for Manager:**
- Implement coupon CRUD UI (similar to products)
- Direct JSON file read/write (no encoding needed)
- Integrate with existing Git publish workflow

See the GitHub Copilot validation report for architecture details.

---

### Method 2: Manual Editing (Simple)

**You can edit coupons directly in any text editor:**

#### Step 1: Edit Coupon File
Open `coupons.json` and edit:
```json
[
  {
    "code": "YOURCODE",
    "type": "percentage",
    "amount": 10,
    "minSpend": 500,
    "category": "All",
    "description": "Your description",
    "enabled": true
  }
]
```

#### Step 2: Save File
Just save the file - no encoding needed!

#### Step 3: Commit & Push
```bash
git add js/coupons.min.js
git commit -m "Update coupon codes"
git push origin main
```

---

## 📊 Coupon Schema

```typescript
{
  code: string;           // Coupon code (uppercase recommended)
  type: 'percentage' | 'fixed';  // Discount type
  amount: number;         // 10 (%) or 50 (EGP)
  minSpend: number;       // Minimum cart total (0 = no minimum)
  category: string;       // "All" or specific category name
  description: string;    // User-friendly description
  enabled: boolean;       // Toggle without deleting
}
```

---

## 🎨 User Experience

### Cart Page:
```
┌─────────────────────────────────┐
│ Order Summary                    │
├─────────────────────────────────┤
│ Subtotal:        EGP 1,200.00   │
│                                  │
│ [Enter coupon code] [Apply]      │
│ ✅ 10% discount applied          │
│                                  │
│ Discount (WELCOME10):            │
│                    -EGP 120.00 ✕ │
│                                  │
│ Total:           EGP 1,080.00   │
└─────────────────────────────────┘
```

### WhatsApp Message:
```
NEW ORDER - SAKR STORE
━━━━━━━━━━━━━━━━━━━━

ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━
- 1x R50i Original - EGP 749.99
━━━━━━━━━━━━━━━━━━━━

Subtotal: EGP 749.99
Discount (WELCOME10 - 10% off): -EGP 75.00
TOTAL: EGP 674.99
```

---

## 🧪 Testing

### Test Scenarios:

**1. Valid Coupon:**
- Add products worth 600 EGP
- Enter code: `WELCOME10`
- Expected: 60 EGP discount applied

**2. Minimum Spend Not Met:**
- Add products worth 400 EGP
- Enter code: `WELCOME10` (requires 500 EGP)
- Expected: Error message shown

**3. Wrong Category:**
- Add Chargers to cart
- Enter code: `EARBUDS50` (Airpods only)
- Expected: Error message about category

**4. Single Coupon Enforcement:**
- Apply `WELCOME10`
- Try to apply `FLASH20`
- Expected: Error "Remove current coupon first"

**5. Remove Coupon:**
- Apply coupon
- Click ✕ button
- Expected: Total resets to subtotal

---

## 🐛 Troubleshooting

### Coupon Not Working?
1. Check browser console for errors
2. Verify `js/coupons.min.js` is loaded (Network tab)
3. Ensure cart has products
4. Clear localStorage: `localStorage.clear()`

### Codes Visible in DevTools?
- This is expected with client-side approach
- Codes are obfuscated (not encrypted)
- For true security, implement backend validation

### Discount Not Showing in WhatsApp?
- Check that coupon is still applied when clicking checkout
- Verify `getAppliedCoupon()` returns coupon object
- Check console logs for validation errors

---

## 🔄 Future Enhancements

### Possible Upgrades:
1. **Manager Integration** (Next Step)
   - Visual coupon management UI
   - Automatic encoding
   - One-click publish

2. **Analytics** (Optional)
   - Track coupon usage
   - Most popular codes
   - Revenue impact

3. **Backend API** (Major Upgrade)
   - Server-side validation
   - True usage limits
   - Automatic expiration
   - User-specific codes

---

## 📞 Support

For questions or issues:
- Review this documentation
- Check `COUPONS_DEMO.md` for examples
- Test with demo codes first
- Contact developer if errors persist

---

**Implementation Date**: November 25, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
