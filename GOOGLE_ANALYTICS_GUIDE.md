# 📊 Google Analytics Guide for Sakr Store

Complete guide on how to use Google Analytics to track and improve your e-commerce store performance.

---

## 🚀 Getting Started (First 24-48 Hours)

After you push your changes and they go live, you need to wait **24-48 hours** for data to start appearing. In the meantime, you can test with **Realtime reports**.

---

## 1️⃣ REALTIME REPORTS (Test Immediately)

### How to Access:
1. Go to **https://analytics.google.com/**
2. Click **"Reports"** (left sidebar)
3. Click **"Realtime"**

### What You'll See:
- 👥 **Live visitors** on your site RIGHT NOW
- 📄 **Which pages** they're viewing
- 🌍 **Where they're from** (Cairo, Alexandria, etc.)
- 📱 **What devices** they're using (mobile/desktop)

### Test Your Tracking:
1. Open your website in another tab: `https://sakrstore.github.io/Sakr-Store/`
2. Click around (view products, add to cart)
3. Refresh the Realtime report
4. You should see:
   - "1 user" active
   - Events like `view_item`, `add_to_cart` appearing
   - Page views updating

---

## 2️⃣ TRAFFIC REPORTS (Where Visitors Come From)

### How to Access:
**Reports** → **Acquisition** → **Traffic acquisition**

### What You'll See:
```
Source/Medium           Users    Sessions    Events
google / organic        450      520         2,400  ← Google Search
direct / (none)         220      240         980    ← Typed URL directly
facebook.com / referral 180      195         850    ← From Facebook
whatsapp / referral     95       100         420    ← From WhatsApp links
```

### What This Means:
- **google / organic** = People found you via Google Search (FREE traffic - this is what SEO helps with!)
- **direct** = People typed your URL directly or used a bookmark
- **facebook.com / referral** = Clicked a link from Facebook
- **whatsapp / referral** = Clicked a link from WhatsApp

### 💡 Business Use:
- If Google Search is low → Need better SEO or content
- If social media is high → Your social strategy is working!
- If direct is high → People remember your brand name

---

## 3️⃣ PAGE VIEWS (Most Popular Pages)

### How to Access:
**Reports** → **Engagement** → **Pages and screens**

### What You'll See:
```
Page                                    Views    Users    Avg Time
/Sakr-Store/                           2,500    1,200    1:45
/Sakr-Store/product.html?id=1          450      380      2:30  ← R50i Original
/Sakr-Store/product.html?id=3          320      280      2:15  ← START TWS01F
/Sakr-Store/about.html                 180      150      1:10
/Sakr-Store/contact.html               95       85       0:45
```

### 💡 Business Use:
- **High views + High time** = Great product! People are interested
- **High views + Low time** = Bad description/images? People leave quickly
- **Low views** = Product needs better marketing or placement

---

## 4️⃣ E-COMMERCE EVENTS (The Gold!)

### How to Access:
**Reports** → **Engagement** → **Events**

### What You'll See:
```
Event Name           Count    Event Value
page_view           3,500     -
view_item           1,250     -              ← Product page views
add_to_cart         285       EGP 45,600    ← Cart adds
begin_checkout      128       EGP 38,400    ← WhatsApp clicks
```

### Click on "view_item" to See Per-Product:
```
Product Name              Count    Value
R50i Original            500      EGP 450,000
START TWS01F             300      EGP 180,000
R50i Semi Original       200      EGP 120,000
```

### 💡 Calculate Conversion Rates:
```
Funnel:
1,250 views → 285 cart adds → 128 checkouts

Cart Rate = 285 ÷ 1,250 = 22.8%
Checkout Rate = 128 ÷ 285 = 44.9%
Overall Conversion = 128 ÷ 1,250 = 10.2%
```

---

## 5️⃣ AUDIENCE INSIGHTS

### Demographics (Where Your Customers Are):
**Reports** → **User** → **User attributes** → **Countries**

```
Country         Users    Sessions
Egypt          850       920      ← Most customers
Saudi Arabia   120       135
UAE            95        105
```

### Devices:
**Reports** → **Tech** → **Overview**

```
Device          Users    Sessions
Mobile         780       850      ← 78% mobile!
Desktop        180       195
Tablet         40        45
```

### 💡 Business Use:
- If 78% mobile → Make sure your site looks PERFECT on phones
- If Egypt is 85% → Focus marketing in Egypt

---

## 6️⃣ HOW TO IDENTIFY PROBLEM PRODUCTS

### Step-by-Step:

1. Go to **Events** → Click **"view_item"**
2. Sort by **Event count** (highest first)
3. Look for products with:
   - ✅ **High views + High cart adds** = Winner!
   - ⚠️ **High views + Low cart adds** = Problem (price? description?)
   - ❌ **Low views** = Needs better marketing

### Example Analysis:

```
Product              Views    Cart Adds    Cart %    Action Needed
R50i Original        500      120         24%       ✅ Great! No changes
START TWS01F         300      90          30%       ✅ Even better!
Cheap Cable          150      15          10%       ⚠️ Add discount or improve images
New Headphones       50       5           10%       ❌ Needs promotion/better placement
```

---

## 7️⃣ WEEKLY ROUTINE (What to Check)

### Every Monday Morning:

1. **Check Traffic (5 min):**
   - Are visitors increasing week-over-week?
   - Where are they coming from?

2. **Check Top Products (5 min):**
   - Which products got the most views?
   - Which got the most cart adds?

3. **Check Conversion Rates (5 min):**
   - View → Cart rate
   - Cart → Checkout rate
   - Are they improving?

4. **Take Action:**
   - Add discounts to low-performing products
   - Promote high-converting products more
   - Improve descriptions for products with high views but low carts

---

## 8️⃣ CUSTOM REPORTS (Advanced)

### Create a Product Performance Dashboard:

1. **Reports** → Click **"Library"** (left sidebar)
2. Click **"Create new report"**
3. Add these metrics:
   - Event name: `view_item`
   - Item name
   - Event count
   - Event value

This creates a one-click report showing all product performance!

---

## 🎯 QUICK WIN CHECKLIST

After 1 week of data:

- [ ] Find your **top 3 most viewed products**
- [ ] Find your **top 3 best cart-rate products**
- [ ] Find **1 product with high views but low cart rate** → Add discount
- [ ] Check if traffic is mostly mobile → Ensure mobile experience is perfect
- [ ] See which traffic source brings most users → Double down on that channel

---

## ❓ Common Questions

**Q: Why is my data empty?**  
A: Wait 24-48 hours after pushing changes. Check Realtime first.

**Q: How do I see revenue?**  
A: You can't automatically track revenue since payment happens via WhatsApp. But `begin_checkout` event value shows potential revenue.

**Q: Can I see individual customer names?**  
A: No, Google Analytics is anonymous for privacy.

**Q: How far back can I see data?**  
A: Up to 14 months of historical data.

---

## 📊 What We're Tracking

### Automatic Events:
- ✅ **page_view** - Every page visit
- ✅ **view_item** - Product page views (with product name, ID, category, price)
- ✅ **add_to_cart** - When someone adds to cart (with product details)
- ✅ **begin_checkout** - When someone clicks "Order via WhatsApp" (with cart total)

### Conversion Funnel:
```
Homepage Visit
    ↓
Product View (view_item)
    ↓
Add to Cart (add_to_cart)
    ↓
WhatsApp Checkout (begin_checkout)
    ↓
Order Complete (tracked manually via WhatsApp)
```

---

## 🎓 Learning Resources

- **Google Analytics Official Help**: https://support.google.com/analytics
- **GA4 Demo Account**: Practice with Google's sample data
- **YouTube**: Search "Google Analytics 4 for beginners"

---

## 📝 Notes

- Data refreshes every 24-48 hours for standard reports
- Realtime reports update within seconds
- Export reports as PDF or CSV for presentations
- Set up email alerts for weekly summaries: **Admin** → **Property** → **Data Streams** → **Enhanced Measurement**

---

**Last Updated:** November 18, 2025  
**Your Measurement ID:** G-JBNC7WNG3M  
**Your Website:** https://sakrstore.github.io/Sakr-Store/
