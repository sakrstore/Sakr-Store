# 🎟️ Demo Coupons - Sakr Store

This file contains the **demo coupons** included in the initial implementation. These are encoded in `js/coupons.min.js`.

---

## 📋 Available Demo Coupons

### 1. **WELCOME10**
- **Type**: Percentage Discount
- **Amount**: 10% off
- **Minimum Spend**: 500 EGP
- **Category**: All Products
- **Description**: Welcome discount for first-time customers
- **Status**: ✅ Active

**Usage Example:**
- Cart Total: 600 EGP → Discount: 60 EGP → Final: 540 EGP
- Cart Total: 400 EGP → ❌ Error: "Minimum order of EGP 500.00 required"

---

### 2. **EARBUDS50**
- **Type**: Fixed Amount
- **Amount**: 50 EGP off
- **Minimum Spend**: 300 EGP
- **Category**: Airpods only
- **Description**: Special discount on Airpods category
- **Status**: ✅ Active

**Usage Example:**
- Cart with Airpods (400 EGP) → Discount: 50 EGP → Final: 350 EGP
- Cart with Chargers (400 EGP) → ❌ Error: "This coupon only works for Airpods products"

---

### 3. **FLASH20**
- **Type**: Percentage Discount
- **Amount**: 20% off
- **Minimum Spend**: None (0 EGP)
- **Category**: All Products
- **Description**: Flash sale - no minimum order required
- **Status**: ✅ Active

**Usage Example:**
- Cart Total: 200 EGP → Discount: 40 EGP → Final: 160 EGP
- Cart Total: 1000 EGP → Discount: 200 EGP → Final: 800 EGP

---

### 4. **NEWUSER15**
- **Type**: Percentage Discount
- **Amount**: 15% off
- **Minimum Spend**: 400 EGP
- **Category**: All Products
- **Description**: New user exclusive discount
- **Status**: ✅ Active

**Usage Example:**
- Cart Total: 500 EGP → Discount: 75 EGP → Final: 425 EGP

---

### 5. **MEGA100**
- **Type**: Fixed Amount
- **Amount**: 100 EGP off
- **Minimum Spend**: 1000 EGP
- **Category**: All Products
- **Description**: Big order discount for purchases over 1000 EGP
- **Status**: ✅ Active

**Usage Example:**
- Cart Total: 1200 EGP → Discount: 100 EGP → Final: 1100 EGP
- Cart Total: 800 EGP → ❌ Error: "Minimum order of EGP 1000.00 required"

---

## 🔒 Security Features

### Storage
- Coupons are stored in **plain JSON format** (`coupons.json`)
- Publicly visible but easy to manage
- No encoding overhead
- Simple and transparent

### Validation
- ✅ Minimum spend requirements
- ✅ Category restrictions
- ✅ Only one coupon per checkout
- ✅ Case-insensitive code matching
- ✅ Client-side validation (suitable for static sites)

### Single Use per Checkout
- Only **one coupon** can be applied at a time
- Customer must remove current coupon to apply a different one
- Prevents coupon stacking

---

## 🛠️ How to Add/Edit Coupons

### Option 1: Using Sakr Store Manager (Recommended)
Once the Manager integration is complete:
1. Open Sakr Store Manager
2. Go to "Coupons" tab
3. Add/Edit coupons in the UI
4. Click "Publish" to save and push to GitHub
5. Changes automatically sync to website

### Option 2: Manual Editing (Simple)
1. Open `coupons.json` in any text editor
2. Edit the JSON structure
3. Save the file
4. Commit and push to GitHub
5. Website automatically loads new coupons

**Coupon JSON Structure:**
```json
{
  "code": "YOURCODE",
  "type": "percentage|fixed",
  "amount": 10,
  "minSpend": 500,
  "category": "All|Airpods|etc",
  "description": "Your description",
  "enabled": true
}
```

---

## 📊 How Coupons Work

### Application Flow:
1. Customer enters code in cart
2. System validates:
   - Code exists
   - Coupon is enabled
   - Cart meets minimum spend
   - Cart contains valid category products
3. Discount is calculated and applied
4. Total price updates
5. Discount details included in WhatsApp checkout message

### WhatsApp Message Format:
```
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━
- 1x R50i Original - EGP 749.99
━━━━━━━━━━━━━━━━━━━━

Subtotal: EGP 749.99
Discount (WELCOME10 - 10% off): -EGP 75.00
TOTAL: EGP 674.99
```

---

## ⚠️ Important Notes

### Limitations:
- **No server-side validation** - Suitable for trust-based e-commerce
- **No usage limits per customer** - Same device can reuse codes (localStorage only)
- **No automatic expiration** - Coupons remain active until manually disabled
- **Discoverable by tech-savvy users** - Obfuscation provides basic protection only

### Best Practices:
- ✅ Change codes regularly
- ✅ Use time-limited campaigns (manually disable after date)
- ✅ Monitor coupon usage via WhatsApp orders
- ✅ Create unique codes for different marketing channels
- ✅ Keep minimum spend reasonable to prevent abuse

---

## 🔄 Future Enhancements (Optional)

### Possible Upgrades:
- ⏰ Automatic expiration dates
- 🔢 Usage limits per coupon
- 👤 User-specific codes
- 📈 Analytics tracking
- 🌐 Backend API validation (requires server)

---

## 📞 Support

For issues or questions about the coupon system:
- Check browser console for error messages
- Verify `js/coupons.min.js` is loaded correctly
- Ensure cart has products before applying coupon
- Test with demo codes above

---

**Last Updated**: November 25, 2025
**Version**: 1.0.0
