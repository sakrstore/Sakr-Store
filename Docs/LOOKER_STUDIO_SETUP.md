# 📊 Looker Studio Dashboard Setup Guide - Sakr Store

Create a beautiful, simple dashboard that shows all your metrics in one place - **no more clicking around Google Analytics!**

---

## 🎯 **What You'll Get:**

A single-page dashboard showing:
- ✅ Total visitors
- ✅ Product views by product name
- ✅ Cart adds by product name
- ✅ Conversion rates (auto-calculated)
- ✅ Traffic sources
- ✅ Daily trends
- ✅ Everything auto-updates!

**Time to setup:** 10-15 minutes
**Time saved weekly:** 30+ minutes

---

## 🚀 **Step-by-Step Setup:**

### **Step 1: Open Looker Studio**

1. Go to: **https://lookerstudio.google.com/**
2. Sign in with your **Google account** (same one you use for Google Analytics)
3. You'll see the Looker Studio home page

---

### **Step 2: Create New Report**

1. Click **"Create"** button (top left)
2. Select **"Report"**
3. A panel will open on the right saying "Add data to report"

---

### **Step 3: Connect Google Analytics**

1. In the "Add data to report" panel, search for: **"Google Analytics"**
2. Click on **"Google Analytics"** connector
3. Click **"Authorize"** (if asked)
4. Select:
   - **Account:** Your Google Analytics account
   - **Property:** Sakr Store (or your property name)
   - **Default web data stream:** Your website
5. Click **"Add"** button (bottom right)
6. Click **"Add to Report"** when prompted

You'll now see a blank canvas with a default table!

---

## 📊 **Building Your Dashboard:**

### **Part 1: Header with Big Numbers (KPIs)**

#### **Add Total Visitors:**

1. Click **"Add a chart"** (toolbar at top)
2. Select **"Scorecard"** (looks like a single number card)
3. Click on the canvas to place it (top-left area)
4. In the right panel:
   - **Metric:** Change to "Total Users"
   - **Name:** Type "Total Visitors"
5. **Style tab:**
   - Font size: 48
   - Metric font color: Blue (#1e3a8a)

#### **Add Product Views:**

1. Add another **Scorecard** (next to Total Visitors)
2. In the right panel:
   - **Metric:** Click "Add metric" → Search "Events" → Select "Event count"
   - **Add Filter:** Click "+ Add a filter"
     - Filter name: "view_item only"
     - Include → Event name → Equal to → "view_item"
   - **Name:** "Product Views"
3. **Style:** Font size 48, color #059669 (green)

#### **Add Cart Adds:**

1. Add another **Scorecard** (next to Product Views)
2. **Metric:** Event count
3. **Add Filter:** 
   - Filter name: "add_to_cart only"
   - Include → Event name → Equal to → "add_to_cart"
4. **Name:** "Cart Adds"
5. **Style:** Font size 48, color #d97706 (orange)

#### **Add WhatsApp Orders:**

1. Add another **Scorecard** (next to Cart Adds)
2. **Metric:** Event count
3. **Add Filter:**
   - Filter name: "begin_checkout only"
   - Include → Event name → Equal to → "begin_checkout"
4. **Name:** "WhatsApp Orders"
5. **Style:** Font size 48, color #dc2626 (red)

---

### **Part 2: Product Performance Table**

#### **Add the Table:**

1. Click **"Add a chart"** → **"Table"**
2. Draw a large rectangle in the middle of your canvas
3. In the right panel (**Data tab**):
   - **Dimension:** Page title (this shows product names!)
   - **Metric 1:** Event count
     - **Rename:** "Views"
     - **Add Filter:** "view_item only" (created earlier)
   - **Metric 2:** Add metric → Event count
     - **Rename:** "Cart Adds"
     - **Add Filter:** "add_to_cart only"
   - **Metric 3:** Add metric → Event count
     - **Rename:** "Checkouts"
     - **Add Filter:** "begin_checkout only"

#### **Add Calculated Fields (Conversion Rates):**

1. In the Data tab, click **"Add metric"** → **"Create field"**
2. **Field name:** Cart Rate
3. **Formula:** 
   ```
   (Cart Adds / Views) * 100
   ```
4. Click **"Save"**
5. Repeat for Checkout Rate:
   - **Field name:** Checkout Rate
   - **Formula:**
     ```
     (Checkouts / Cart Adds) * 100
     ```
6. Click **"Save"**

#### **Style the Table:**

1. Click **"Style"** tab
2. **Table header:**
   - Background: #1e3a8a (blue)
   - Text color: White
3. **Alternating row colors:** Enable
4. **Show row numbers:** Disable
5. **Compact numbers:** Enable

---

### **Part 3: Traffic Sources (Pie Chart)**

1. Click **"Add a chart"** → **"Pie chart"**
2. Place it below the scorecards (left side)
3. **Data tab:**
   - **Dimension:** Session source / medium
   - **Metric:** Sessions
4. **Style tab:**
   - **Legend:** Right
   - **Show labels:** Percentage
   - **Title:** "Traffic Sources"

---

### **Part 4: Daily Visitors (Line Chart)**

1. Click **"Add a chart"** → **"Time series chart"**
2. Place it below the pie chart
3. **Data tab:**
   - **Dimension:** Date (should be automatic)
   - **Metric:** Total Users
4. **Style tab:**
   - **Line color:** Blue
   - **Show data points:** Yes
   - **Title:** "Daily Visitors"

---

### **Part 5: Devices Breakdown (Bar Chart)**

1. Click **"Add a chart"** → **"Bar chart"**
2. Place it on the right side below scorecards
3. **Data tab:**
   - **Dimension:** Device category
   - **Metric:** Total Users
4. **Style tab:**
   - **Bars:** Horizontal
   - **Color:** Orange
   - **Title:** "Visitors by Device"

---

### **Part 6: Add Date Range Selector**

1. Click **"Add a control"** → **"Date range control"**
2. Place it at the very top of your dashboard
3. **Style:** Match your brand colors

---

## 🎨 **Final Touches:**

### **Add Title:**

1. Click **"Text"** tool (toolbar)
2. Draw a text box at the very top
3. Type: **"Sakr Store - Analytics Dashboard"**
4. **Font:** 32px, Bold, Blue (#1e3a8a)

### **Add Last Updated:**

1. Add another text box in the corner
2. Insert **"Auto-refreshed daily"**

### **Organize Layout:**

1. **Top Row:** Title + Date Range Selector
2. **Second Row:** 4 Scorecards (Visitors, Views, Carts, Orders)
3. **Third Row:** Product Performance Table (spans full width)
4. **Bottom Row:** Traffic Pie Chart | Daily Line Chart | Device Bar Chart

---

## 💾 **Save Your Dashboard:**

1. Click **"File"** → **"Rename"**
2. Name it: **"Sakr Store Analytics"**
3. Click outside to save
4. Click **"View"** to see the final dashboard

---

## 📱 **Access Your Dashboard:**

### **Desktop:**
- Bookmark the URL
- Open anytime to see updated data

### **Mobile:**
1. Download **"Looker Studio"** app from:
   - iPhone: App Store
   - Android: Google Play Store
2. Sign in with your Google account
3. Open your "Sakr Store Analytics" dashboard
4. View on the go!

---

## 🔗 **Share with Others:**

1. Click **"Share"** button (top right)
2. Click **"Manage access"**
3. Add email addresses of people you want to share with
4. Set permission: **"Viewer"** (they can view, not edit)
5. Click **"Send"**

They can now view your dashboard without accessing Google Analytics!

---

## 🎯 **Quick Reference: Filters You Created**

Save these filter configurations for future use:

### **Filter: view_item only**
- Include
- Event name
- Equal to
- view_item

### **Filter: add_to_cart only**
- Include
- Event name
- Equal to
- add_to_cart

### **Filter: begin_checkout only**
- Include
- Event name
- Equal to
- begin_checkout

---

## 🔄 **Dashboard Updates:**

Your dashboard **auto-refreshes** with new data:
- **Default:** Every 12 hours
- **Manual refresh:** Click the refresh icon (top right)
- **Real-time:** Not available (GA4 has 24-48hr delay for processing)

---

## 📊 **What Each Section Shows:**

### **Scorecards (Big Numbers):**
- **Total Visitors:** Unique people who visited your site
- **Product Views:** How many times products were viewed
- **Cart Adds:** How many times "Add to Cart" was clicked
- **WhatsApp Orders:** How many times checkout was initiated

### **Product Performance Table:**
- **Page title:** Shows product name (from page title)
- **Views:** Times this product was viewed
- **Cart Adds:** Times this product was added to cart
- **Checkouts:** Times this product led to WhatsApp order
- **Cart Rate:** (Cart Adds ÷ Views) × 100
- **Checkout Rate:** (Checkouts ÷ Cart Adds) × 100

### **Traffic Sources:**
- Shows where visitors came from
- google/organic = Google Search
- direct = Typed URL
- facebook.com/referral = Facebook
- etc.

### **Daily Visitors:**
- Line graph showing visitor trends
- See if traffic is growing

### **Devices:**
- Mobile vs Desktop vs Tablet
- Helps optimize for your audience

---

## 🎓 **Pro Tips:**

### **Tip 1: Clone for Different Views**
- Click **"File"** → **"Make a copy"**
- Create different dashboards:
  - Weekly review dashboard
  - Monthly summary
  - Product-specific analysis

### **Tip 2: Add Filters**
- Add **"Device category"** filter to see mobile-only data
- Add **"Country"** filter to see Egypt-only data

### **Tip 3: Schedule Email Reports**
1. Click **"Share"** → **"Schedule email delivery"**
2. Set frequency: Weekly (every Monday)
3. Recipients: Your email
4. Get PDF reports automatically!

### **Tip 4: Add Goals**
1. Click on a scorecard
2. **Data tab** → **Comparison type:** "Previous period"
3. Shows if you're growing vs last week/month

---

## 🚨 **Troubleshooting:**

### **"No data available"**
- Wait 24-48 hours after GA setup
- Check that your website has the GA code
- Verify events are firing in GA Realtime

### **"Product names not showing"**
- Use "Page title" dimension instead
- Wait 48 hours for GA to process items array
- Alternatively, we can add custom parameters (ask me!)

### **"Can't find a metric"**
- Search in the metric dropdown
- Some metrics take 24-48 hours to appear
- Check if events are being tracked in GA

### **"Dashboard looks messy"**
- Use the grid (View → Show grid)
- Align elements using alignment tools
- Give components breathing room

---

## 📅 **Your Weekly Routine (2 Minutes!):**

**Every Monday:**
1. Open dashboard bookmark
2. Set date range to "Last 7 days"
3. Look at:
   - Are visitors growing? ✅
   - Which products got most views? ✅
   - Which products have low cart rate? → Add discount!
   - Where is traffic coming from? → Focus marketing there!
4. Take action based on insights
5. Done! ✅

---

## 🎯 **Success Checklist:**

After setup, you should have:
- [ ] Dashboard created and named
- [ ] Connected to Google Analytics
- [ ] 4 scorecards showing key metrics
- [ ] Product performance table with conversion rates
- [ ] Traffic sources pie chart
- [ ] Daily visitors line chart
- [ ] Device breakdown bar chart
- [ ] Date range selector at top
- [ ] Dashboard bookmarked
- [ ] Shared with team (if applicable)
- [ ] Tested on mobile app

---

## 🎉 **You're Done!**

You now have a **professional analytics dashboard** that shows everything you need in one place!

**Bookmark this:** Your dashboard URL
**Check it:** Every Monday morning
**Time saved:** 30+ minutes per week
**Better decisions:** Based on real data!

---

## 🆘 **Need Help?**

If you get stuck on any step:
1. Take a screenshot of where you're stuck
2. Note which step number
3. Ask me and I'll guide you through it!

---

## 🔄 **Next Steps (Optional Enhancements):**

Once you're comfortable with the basic dashboard, you can:
1. Add a **real-time visitors** section
2. Create a **comparison dashboard** (this month vs last month)
3. Add **country breakdown map**
4. Create **product-specific pages**
5. Set up **automated alerts** (email if traffic drops)

**Want help with any of these? Just ask!** 📊

---

**Last Updated:** November 19, 2025  
**Dashboard Type:** Single-Page Overview  
**Refresh Rate:** Every 12 hours (automatic)
