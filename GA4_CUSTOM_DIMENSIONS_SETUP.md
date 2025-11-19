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

## Solution: Register Item-Scoped Custom Dimensions

### Step 1: Access GA4 Admin Panel

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (Sakr Store)
3. Click the **Admin** gear icon (bottom left)

### Step 2: Create Custom Dimensions

1. In the Admin panel, under **Property** column, click **Custom definitions**
2. Click **Create custom dimensions**
3. Create the following dimensions one by one:

#### Dimension 1: Item Name
- **Dimension name**: `Item Name`
- **Scope**: `Event`
- **Description**: `Product name from e-commerce events`
- **Event parameter**: `items.item_name`
- Click **Save**

#### Dimension 2: Item ID
- **Dimension name**: `Item ID`
- **Scope**: `Event`
- **Description**: `Product ID from e-commerce events`
- **Event parameter**: `items.item_id`
- Click **Save**

#### Dimension 3: Item Category
- **Dimension name**: `Item Category`
- **Scope**: `Event`
- **Description**: `Product category from e-commerce events`
- **Event parameter**: `items.item_category`
- Click **Save**

#### Dimension 4: Item Price
- **Dimension name**: `Item Price`
- **Scope**: `Event`
- **Description**: `Product price from e-commerce events`
- **Event parameter**: `items.price`
- Click **Save**

#### Dimension 5: Item Quantity
- **Dimension name**: `Item Quantity`
- **Scope**: `Event`
- **Description**: `Product quantity from e-commerce events`
- **Event parameter**: `items.quantity`
- Click **Save**

### Step 3: Wait for Data Collection

⏰ **Important**: It can take **24-48 hours** for custom dimensions to start collecting data. They won't show historical data, only new data after you create them.

### Step 4: Verify in DebugView (Optional but Recommended)

To verify your events are sending the correct data RIGHT NOW:

1. Open your website with `?debug_mode=true` at the end of the URL
   - Example: `https://yourdomain.com/?debug_mode=true`
2. In GA4, go to **Admin → DebugView**
3. Perform actions (view product, add to cart)
4. Click on the events and expand the **items** array
5. You should see:
   - `item_id`
   - `item_name`
   - `item_category`
   - `price`
   - `quantity`

### Step 5: Create Reports with Custom Dimensions

Once the dimensions start collecting data:

1. Go to **Explore** in GA4
2. Create a new **Blank exploration**
3. Add your custom dimensions to see product-level data:
   - Rows: `Item Name`
   - Metrics: `Event count`, `Total revenue`
   - Filters: Event name = `add_to_cart` or `view_item`

## Expected Results

After setup, you'll be able to:
- See which products are viewed most
- Track which products are added to cart
- Calculate conversion rates per product
- Identify top-selling products
- See revenue by product category

## Troubleshooting

### Problem: Still not seeing item parameters
**Solution**: 
- Make sure you're using the correct parameter path: `items.item_name` (not just `item_name`)
- Clear your browser cache
- Wait 24-48 hours for data collection to start

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
