# Maximum Discount Cap Feature for Percentage Coupons

## Overview

This document describes the maximum discount cap feature added to the Sakr Store coupon system. This feature allows store administrators to set an upper limit on percentage-based discounts, preventing unexpectedly large discounts on high-value orders.

---

## The Problem

Before this update, percentage coupons had no upper limit on the discount amount. This created a potential issue where customers with large orders could receive very high discounts.

### Example of the Issue

Consider a coupon offering 25% off with no maximum cap:

| Order Value | Discount Given | 
|-------------|----------------|
| 400 EGP     | 100 EGP        |
| 1,000 EGP   | 250 EGP        |
| 5,000 EGP   | 1,250 EGP      |
| 10,000 EGP  | 2,500 EGP      |

As you can see, the discount grows proportionally with order size. For expensive orders, this could significantly impact profit margins.

---

## The Solution

A new optional field called `maxDiscount` has been added to the coupon structure. When set, this field caps the maximum discount amount that a percentage coupon can provide, regardless of the order total.

### How It Works

1. The system calculates the percentage discount based on the cart subtotal
2. If the calculated discount exceeds the `maxDiscount` value, the discount is reduced to the maximum allowed
3. If no `maxDiscount` is set, the percentage discount has no upper limit (original behavior)

### Example with Maximum Cap

Consider a coupon offering 25% off with a maximum cap of 150 EGP:

| Order Value | Calculated Discount | Applied Discount | Savings |
|-------------|---------------------|------------------|---------|
| 400 EGP     | 100 EGP             | 100 EGP          | Full 25% |
| 600 EGP     | 150 EGP             | 150 EGP          | Full 25% |
| 800 EGP     | 200 EGP             | 150 EGP (capped) | 18.75%  |
| 1,000 EGP   | 250 EGP             | 150 EGP (capped) | 15%     |
| 2,000 EGP   | 500 EGP             | 150 EGP (capped) | 7.5%    |

The cap ensures that your maximum exposure per order is limited to 150 EGP, regardless of order size.

---

## Implementation Details

### Coupon Structure

The coupon JSON structure now supports an optional `maxDiscount` field:

```json
{
  "id": 1,
  "code": "WEEKEND",
  "type": "percentage",
  "amount": 15.00,
  "maxDiscount": 100.00,
  "minSpend": 400.00,
  "category": "All",
  "description": "Get 15% off on your order when you spend 400 EGP or more! (max 100 EGP)",
  "enabled": true
}
```

### Field Description

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `maxDiscount` | Number | No | The maximum discount amount in EGP that this coupon can provide. Only applies to percentage-type coupons. If not set or set to zero, no cap is applied. |

### Validation Logic

The discount calculation now follows this process:

1. Check if the coupon type is "percentage"
2. Calculate the raw discount: `subtotal × (percentage / 100)`
3. If `maxDiscount` is defined and greater than zero:
   - Compare the calculated discount to the maximum
   - Use the smaller of the two values
4. Ensure the final discount does not exceed the cart subtotal
5. Apply the discount to the order

### Customer-Facing Message

When a coupon with a maximum cap is applied, the success message now includes information about the cap:

- **Without maxDiscount**: "15% discount applied"
- **With maxDiscount**: "15% discount applied (max EGP 100.00)"

This transparency helps customers understand the discount terms.

---

## Current Coupon Configuration

The following coupons have been updated with maximum discount caps:

| Code | Percentage | Maximum Cap | Reasoning |
|------|------------|-------------|-----------|
| WEEKEND | 15% | 100 EGP | General promotional coupon |
| POWER25 | 25% | 150 EGP | Higher discount for specific category |
| NAJER10 | 10% | 75 EGP | Affiliate/referral coupon |
| HALAWA10 | 10% | 75 EGP | Affiliate/referral coupon |
| DRHEBA15 | 15% | 100 EGP | Affiliate/referral coupon |

---

## Setting Appropriate Maximum Caps

When deciding on maximum discount values, consider:

### Factors to Consider

1. **Average Order Value**: What is your typical order size? Set caps that provide meaningful discounts for average orders while limiting exposure on large orders.

2. **Profit Margins**: Calculate your margins and determine the maximum discount you can afford per order while remaining profitable.

3. **Coupon Purpose**: 
   - Acquisition coupons (new customers) may warrant higher caps
   - Retention coupons (repeat customers) may have lower caps
   - Category-specific coupons should consider product margins in that category

4. **Competitive Positioning**: Research what discounts competitors offer and set caps accordingly.

### Recommended Approach

A good rule of thumb is to set the maximum cap at the discount value for your target order size:

- If you want the full percentage to apply for orders up to 500 EGP with a 10% coupon
- Set `maxDiscount` to 50 EGP (10% of 500)
- Orders above 500 EGP receive a 50 EGP discount (effective percentage decreases)

---

## Fixed Amount Coupons

Note that the `maxDiscount` field only applies to percentage-type coupons. Fixed amount coupons already have an inherent maximum (the fixed amount itself), so this field is not needed for them.

---

## Removing the Cap

If you want a percentage coupon to have no upper limit (original behavior), you can:

1. Remove the `maxDiscount` field entirely from the coupon object
2. Set `maxDiscount` to `0` or `null`
3. Set `maxDiscount` to a very high number (e.g., 999999)

---

## Files Modified

The following files were updated to implement this feature:

1. **js/app.js** - Added logic in the `validateCoupon` function to check and apply the maximum discount cap for percentage coupons. Also updated the success message generation to include cap information.

2. **coupons.json** - Added `maxDiscount` field to all existing percentage coupons with appropriate values.

3. **COUPON_SYSTEM_README.md** - Updated the coupon schema documentation to include the new field.

---

## Testing the Feature

To verify the maximum discount cap is working correctly:

1. Add products to cart totaling more than the cap threshold
2. Apply a percentage coupon with a maxDiscount set
3. Verify the discount shown equals the maxDiscount value, not the full percentage
4. Check the WhatsApp message includes the capped discount amount

### Test Scenario

Using WEEKEND coupon (15% off, max 100 EGP):

| Test | Cart Value | Expected Discount |
|------|------------|-------------------|
| Below cap | 500 EGP | 75 EGP (15%) |
| At cap | 666.67 EGP | 100 EGP (15%) |
| Above cap | 1000 EGP | 100 EGP (capped) |

---

## Future Considerations

Potential enhancements to consider:

1. **Per-Category Caps**: Different maximum discounts for different product categories within the same coupon

2. **Dynamic Caps**: Maximum discount that adjusts based on customer tier or order history

3. **Minimum Discount Guarantee**: Ensure a minimum discount amount even on small orders

4. **Visual Indicator**: Show customers when their discount has been capped with a special badge or message

---

*Last Updated: December 6, 2025*
