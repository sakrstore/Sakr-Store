# 📍 Where to Find Each Metric in Google Analytics

Exact locations for every metric you need to track your Sakr Store performance.

---

## 🚀 **Your 3 Main Goals:**

1. **Total visitors** → See how many people visit
2. **Product views** → Which products are most popular
3. **Product performance** → Views vs Cart Adds for each product

---

## 1️⃣ **TOTAL VISITORS**

### **Path:**
```
Reports → User → Overview
```

### **What You'll See:**
- **Total Users** - Unique visitors
- **Sessions** - Total visits (one person can have multiple sessions)
- **Engaged Sessions** - Visitors who stayed more than 10 seconds
- **Average Engagement Time** - How long people stay

### **Screenshot Guide:**
1. Click **"Reports"** in left sidebar
2. Click **"User"** section
3. Click **"Overview"**
4. Main number at top = Total Users

### **Pro Tip:**
- Change date range (top right) to see different time periods
- Compare to previous period to see growth

---

## 2️⃣ **WHICH PRODUCTS ARE MOST VIEWED**

### **Method A: Quick View (Page-Based)**

**Path:**
```
Reports → Engagement → Pages and screens
```

**What You'll See:**
```
Page path + query string                Views    Users
/Sakr-Store/product.html?id=1          450      380
/Sakr-Store/product.html?id=3          320      280
/Sakr-Store/product.html?id=2          200      165
```

**Note:** Shows product IDs, not names. You'll need to match:
- `?id=1` = R50i Original
- `?id=2` = R50i Semi Original
- `?id=3` = START TWS01F
- etc. (check your products.json)

---

### **Method B: Best View (Product Names!)**

**Path:**
```
Reports → Engagement → Events
```

**Steps:**
1. Click **"Events"** in the list
2. Look for event name **"view_item"**
3. Click on **"view_item"**
4. Scroll down to see dimensions
5. Click **"Item name"** dimension

**What You'll See:**
```
Item name                    Event count    Event value
R50i Original               450            EGP 405,000
START TWS01F                320            EGP 192,000
R50i Semi Original          200            EGP 120,000
Cheap Cable                 50             EGP 5,000
```

**This is THE BEST view!** Shows actual product names with view counts.

---

## 3️⃣ **PRODUCT PERFORMANCE (Views + Cart Adds)**

### **Path:**
```
Reports → Engagement → Events
```

### **Steps to Build Your Report:**

#### **Step 1: Get Product Views**
1. Go to **Reports → Engagement → Events**
2. Click **"view_item"**
3. Click **"Item name"** dimension
4. Click **Export** (top right) → Download as CSV
5. Save as `product-views.csv`

#### **Step 2: Get Cart Adds**
1. Go back to Events list
2. Click **"add_to_cart"**
3. Click **"Item name"** dimension
4. Click **Export** → Download as CSV
5. Save as `product-cart.csv`

#### **Step 3: Compare in Excel/Sheets**

Open both files and create this table:

| Product Name | Views | Cart Adds | Cart Rate % |
|--------------|-------|-----------|-------------|
| R50i Original | 450 | 120 | 26.7% |
| START TWS01F | 320 | 90 | 28.1% |
| Cheap Cable | 200 | 10 | 5% |

**Formula for Cart Rate:**
```
= (Cart Adds ÷ Views) × 100
```

---

## 4️⃣ **TRAFFIC SOURCES (Where Visitors Come From)**

### **Path:**
```
Reports → Acquisition → Traffic acquisition
```

### **What You'll See:**
```
Session source/medium             Users    Sessions    Events
google / organic                  450      520         2,400
direct / (none)                   220      240         980
facebook.com / referral           180      195         850
whatsapp / referral               95       100         420
instagram.com / referral          60       65          280
```

### **What Each Means:**
- **google / organic** = Found you via Google Search (FREE)
- **direct / (none)** = Typed URL or bookmark
- **facebook.com / referral** = Clicked link on Facebook
- **whatsapp / referral** = Clicked link from WhatsApp
- **instagram.com / referral** = Clicked link on Instagram

---

## 5️⃣ **DEVICE BREAKDOWN (Mobile vs Desktop)**

### **Path:**
```
Reports → Tech → Overview
```

### **What You'll See:**
```
Device category    Users    Sessions    Conversion rate
mobile            780       850         2.3%
desktop           180       195         3.1%
tablet            40        45          1.8%
```

**Why This Matters:**
- If 80% mobile → Ensure mobile experience is perfect
- If desktop has higher conversion → Maybe mobile has issues

---

## 6️⃣ **CHECKOUT BUTTON CLICKS (WhatsApp Orders)**

### **Path:**
```
Reports → Engagement → Events
```

### **Steps:**
1. Click **"Events"**
2. Look for **"begin_checkout"**
3. Click on it
4. See total count

**What You'll See:**
```
Event: begin_checkout
Count: 128
Total Value: EGP 38,400
```

This shows:
- **128 people** clicked "Order via WhatsApp"
- **EGP 38,400** total potential revenue

---

## 7️⃣ **CONVERSION FUNNEL (Full Journey)**

### **Path:**
```
Reports → Engagement → Events
```

### **Manual Calculation:**

Get these numbers:
1. **view_item** count = 1,250 (product views)
2. **add_to_cart** count = 285 (cart adds)
3. **begin_checkout** count = 128 (WhatsApp clicks)

### **Calculate Rates:**
```
Cart Rate = 285 ÷ 1,250 = 22.8%
Checkout Rate = 128 ÷ 285 = 44.9%
Overall Conversion = 128 ÷ 1,250 = 10.2%
```

---

## 8️⃣ **GEOGRAPHIC DATA (Where Customers Are)**

### **Path:**
```
Reports → User → User attributes → Countries
```

**Alternative Path:**
```
Reports → User → Demographics → Detail
```

### **What You'll See:**
```
Country         Users    Sessions    Engagement rate
Egypt          850       920         65%
Saudi Arabia   120       135         58%
UAE            95        105         62%
Jordan         45        50          60%
```

---

## 9️⃣ **REALTIME MONITORING (Live Visitors)**

### **Path:**
```
Reports → Realtime
```

### **What You'll See:**
- **Users in last 30 minutes** - Live count
- **Views per minute** - Activity graph
- **Top pages** - What they're viewing now
- **Top events** - Actions happening now
- **User by country** - Where they're from

**Use Case:**
- Test your changes immediately
- See if marketing posts drive instant traffic
- Monitor during promotions

---

## 🔟 **PAGE VIEWS BY PAGE TYPE**

### **Path:**
```
Reports → Engagement → Pages and screens
```

### **What You'll See:**
```
Page                              Views    Users    Avg time
/Sakr-Store/                     2,500    1,200    1:45
/Sakr-Store/product.html?id=1    450      380      2:30
/Sakr-Store/about.html           180      150      1:10
/Sakr-Store/contact.html         95       85       0:45
/Sakr-Store/cart.html            220      190      3:15
```

### **Analysis:**
- High views + High time = Good content
- High views + Low time = Problem (boring/confusing)
- Cart page with high time = Good (people reviewing order)

---

## 📊 **CREATE CUSTOM REPORT (One-Click Product Dashboard)**

### **Steps to Create:**

1. Go to **Reports** → Click **"Library"** (bottom left)
2. Click **"Create new report"**
3. Choose **"Detail report"**
4. Name it: **"Product Performance"**

### **Add These Dimensions:**
- Event name
- Item name
- Item category

### **Add These Metrics:**
- Event count
- Event value
- Users

### **Add Filter:**
- Event name = view_item OR add_to_cart

### **Save Report**

Now you have a one-click report showing all product data!

---

## 🎯 **QUICK REFERENCE CHART**

| What You Want | Where to Go |
|---------------|-------------|
| Total visitors | Reports → User → Overview |
| Product views (with names) | Reports → Engagement → Events → view_item → Item name |
| Product page views (with IDs) | Reports → Engagement → Pages and screens |
| Cart adds | Reports → Engagement → Events → add_to_cart → Item name |
| WhatsApp clicks | Reports → Engagement → Events → begin_checkout |
| Traffic sources | Reports → Acquisition → Traffic acquisition |
| Devices | Reports → Tech → Overview |
| Countries | Reports → User → Countries |
| Live visitors | Reports → Realtime |
| All events | Reports → Engagement → Events |

---

## 📝 **WEEKLY REPORTING TEMPLATE**

Copy this template for your weekly reviews:

```
Week of: [Date]

TRAFFIC:
- Total Users: ___
- Sessions: ___
- Top Source: ___

TOP 3 PRODUCTS (Views):
1. [Product]: ___ views
2. [Product]: ___ views
3. [Product]: ___ views

TOP 3 PRODUCTS (Cart Rate):
1. [Product]: ___ views, ___ carts (___ %)
2. [Product]: ___ views, ___ carts (___ %)
3. [Product]: ___ views, ___ carts (___ %)

CONVERSIONS:
- Cart Adds: ___
- WhatsApp Clicks: ___
- Cart Rate: ___ %
- Checkout Rate: ___ %

ACTION ITEMS:
- [ ] Discount for: [Low performing product]
- [ ] Promote: [High performing product]
- [ ] Fix: [Issue identified]
```

---

## 🎓 **Pro Tips**

### **Tip 1: Use Date Comparison**
- Click date range (top right)
- Select "Compare to: Previous period"
- See if you're growing!

### **Tip 2: Export Everything**
- Every report has an **Export** button (top right)
- Download as CSV for Excel analysis
- Share with partners/investors

### **Tip 3: Bookmark Key Reports**
1. Go to a report you use often
2. Click star icon (top right)
3. Appears in "Library" for quick access

### **Tip 4: Mobile App**
- Download **Google Analytics** app on phone
- Check stats on the go
- Get notifications for traffic spikes

---

## 🚨 **Common Navigation Issues**

### **"I can't find Events"**
- Make sure you're in **Reports** section (left sidebar)
- Look under **"Engagement"** section
- If missing, wait 24 hours for data to populate

### **"Item name dimension is empty"**
- Events need 24-48 hours to process
- Check Realtime first to verify tracking works
- Ensure you pushed the latest code changes

### **"Numbers don't match between reports"**
- Different reports use different metrics
- "Users" = unique visitors
- "Sessions" = total visits
- "Views" = total page loads

### **"Where is ecommerce section?"**
- Go to **Reports → Monetization**
- May be empty since you track via WhatsApp
- Use Events instead for product data

---

**Bookmark this guide and refer to it every Monday for your weekly review!** 📊

---

**Last Updated:** November 19, 2025  
**Your GA ID:** G-JBNC7WNG3M  
**Website:** https://sakrstore.github.io/Sakr-Store/
