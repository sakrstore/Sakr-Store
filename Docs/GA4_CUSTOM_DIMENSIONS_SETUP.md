# Google Analytics 4 - Custom Dimensions Setup Guide

## Why You Need This

Your `view_item` and `add_to_cart` events ARE sending product information (item_name, item_category, etc.), but GA4 doesn't automatically show these in reports. You need to register them as **custom dimensions**.

## Current Issue

When you check your events, you only see these default parameters:
- batch_ordering_id
- batch_page_id
- currency
- engagement_time_msec
- ga_session_id
- page_location
- value

But you're NOT seeing:
- item_name (product name)
- item_category
- item_id
- quantity

## Solution: GA4 Already Has These Dimensions Built-In!

### ✅ GOOD NEWS: You Don't Need to Create Custom Dimensions!

GA4 **automatically collects** these item parameters for e-commerce events:
- ✅ `item_name` - Already built-in
- ✅ `item_id` - Already built-in  
- ✅ `item_category` - Already built-in
- ✅ `price` - Already built-in
- ✅ `quantity` - Already built-in

These are **standard e-commerce dimensions** and are available immediately in your reports!

### How to Access Built-In Item Dimensions:

#### Method 1: Exploration Reports (Best!)

1. Go to **Explore** (left sidebar)
2. Click **Create a new exploration** (or use a template)
3. Click **Blank** exploration
4. In the **Variables** panel on the left, click the **+** next to **Dimensions**
5. Search for these dimensions:
   - `Item name`
   - `Item ID`
   - `Item category`
   - `Price`
   - `Quantity`
6. Select them and click **Import**
7. Drag `Item name` to **Rows**
8. Drag any metrics you want to **Values** (like Event count)
9. Add a filter: Event name = `view_item` or `add_to_cart`

#### Method 2: Standard Reports

1. Go to **Reports** → **Monetization** → **Ecommerce purchases**
2. You'll see item-level data with:
   - Item name
   - Item category
   - Item revenue
   - Items purchased

### Step 1: Verify Your Events Are Sending Item Data

Before checking reports, verify your events include the items array:

1. Go to **Admin** → **DebugView**
2. Trigger a `view_item` or `add_to_cart` event
3. Click on the event
4. Expand the **items** parameter
5. You should see:
   ```
   items: [
     {
       item_id: "1"
       item_name: "R50i Original"
       item_category: "Headphones"
       price: 900
       quantity: 1
     }
   ]
   ```

### Step 2: Check Realtime Item Data

1. Go to **Reports** → **Realtime**
2. Scroll to **Event count by Event name**
3. Click on `view_item` or `add_to_cart`
4. You should see item details appear

### Step 3: Wait for Historical Reports (24-48 hours)

Standard reports take time to populate. Check these after 24-48 hours:
- **Monetization** → **Ecommerce purchases**
- **Monetization** → **Item promotion**
- **Engagement** → **Events** → Click on event → View item dimensions

### Step 3: Wait for Data Collection

⏰ **Important**: It can take **24-48 hours** for custom dimensions to start collecting data. They won't show historical data, only new data after you create them.

### Step 4: Enable Debug Mode

**IMPORTANT:** GA4 requires a special cookie to enable debug mode, not just a URL parameter.

#### Option 1: Use Chrome Extension (EASIEST)
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Click the extension icon to turn it ON (it turns green)
3. Reload your website
4. Open Chrome DevTools (F12) → Console tab
5. You should see GA debug messages

#### Option 2: Add Debug Parameter to gtag.js
Add this to your Google Analytics code in ALL HTML files (index.html, product.html, cart.html, etc.):

```javascript
// Find this line in your <head>:
gtag('config', 'G-JBNC7WNG3M');

// Replace it with:
gtag('config', 'G-JBNC7WNG3M', {
  'debug_mode': true
});
```

**Note:** Remember to remove `'debug_mode': true` when you're done testing!

### Step 5: Verify in DebugView

1. Enable debug mode using one of the methods above
2. In GA4, go to **Admin → DebugView** (or **Reports → Realtime → DebugView**)
3. Perform actions on your site (view product, add to cart)
4. You should see events appearing in real-time
5. Click on the events and expand the **items** array
6. You should see:
   - `item_id`
   - `item_name`
   - `item_category`
   - `price`
   - `quantity`

### Step 4: Create Reports with Built-In Dimensions

Create a custom report to see product performance:

1. Go to **Explore** in GA4
2. Create a new **Blank exploration**
3. Add the built-in item dimensions:
   - Click **+** next to Dimensions
   - Search and add: `Item name`, `Item category`
   - Click **Import**
4. Add metrics:
   - Click **+** next to Metrics
   - Search and add: `Event count`, `Event value`
   - Click **Import**
5. Build your report:
   - Drag `Item name` to **Rows**
   - Drag `Event count` to **Values**
   - Add filter: Event name = `view_item` or `add_to_cart`
6. Save your exploration

You'll see exactly which products are viewed/added to cart most!

## Expected Results

After setup, you'll be able to:
- See which products are viewed most
- Track which products are added to cart
- Calculate conversion rates per product
- Identify top-selling products
- See revenue by product category

## Troubleshooting

### Problem: Can't create custom dimensions for item_name, item_id, etc.
**Solution**: 
- These are **built-in dimensions** - you don't need to create them!
- They're automatically available in Exploration reports
- Just search for "Item name", "Item ID", etc. when building reports
- No custom dimension creation needed!

### Problem: DebugView not showing events
**Solution**:
- Make sure you have `?debug_mode=true` in the URL
- Check browser console for errors
- Verify gtag.js is loaded (check Network tab in DevTools)

### Problem: Events showing but items array is empty
**Solution**:
- Check browser console logs (should see "✅ GA Event Sent" messages)
- Verify products.json is loading correctly
- Make sure the product exists in your products array

## Need More Help?

Check these GA4 resources:
- [GA4 Custom Dimensions Documentation](https://support.google.com/analytics/answer/10075209)
- [GA4 E-commerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 DebugView Guide](https://support.google.com/analytics/answer/7201382)
