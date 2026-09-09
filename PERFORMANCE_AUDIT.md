# Performance & Bug Audit Report
**Website:** https://pankaj-photo-colour-lab.vercel.app  
**Repo:** kartikey052003/pankaj-photo-colour-lab-website  
**Date:** 2026-09-09

---

## 🐛 CRITICAL BUGS FOUND

### 1. **Mobile Text Resizing Issues** (HIGH PRIORITY)
**Problem:** Text doesn't scale optimally on mobile devices (< 680px)
- H1 headings become too large on small phones (>5rem)
- H2 copy text overflow on narrow screens
- Brand name truncates poorly on screens < 380px

**Impact:** Poor user experience on iPhone SE, older Android devices

**Location:** `styles.css` lines 309-317, 855-861

---

### 2. **Google Maps Iframe Not Responsive** (HIGH PRIORITY)
**Problem:** Embedded Google Maps iframe has fixed dimensions
- Width: 100% (good) but height: 420px (bad)
- Creates layout shift on mobile
- No aspect ratio container

**Location:** `index.html` lines 414-426

**Fix:** Add responsive wrapper and aspect-ratio

---

### 3. **Button Touch Targets Below 48px on Mobile** (MEDIUM PRIORITY)
**Problem:** Buttons in mobile menu and floating WhatsApp button too small
- Floating WhatsApp on small screens: 50x50px (line 896)
- Mobile buttons: 50px min-height (line 870)

**Location:** `styles.css` lines 868-900

---

### 4. **Missing Preload for Critical Images** (MEDIUM PRIORITY)
**Problem:** Hero image preload lacks type specification
- Only webp version preloaded
- PNG fallback not optimized

**Location:** `index.html` line 35

---

### 5. **Unused CSS Causing Bloat** (LOW PRIORITY)
**Problem:** CSS classes defined but never used
- `.reason-grid` (lines 463, 593)
- Multiple selector chains could be consolidated

**Location:** `styles.css` multiple locations

---

### 6. **JavaScript Global Scope Pollution** (MEDIUM PRIORITY)
**Problem:** All variables created in global scope
- Could conflict with third-party scripts
- No module encapsulation

**Location:** `script.js` lines 1-21

**Fix:** Wrap in IIFE or use modules

---

### 7. **Missing Lazy Loading on Portfolio Images** (LOW PRIORITY)
**Problem:** Only some images use lazy loading
- Baby shower and birthday celebration images missing `loading="lazy"`

**Location:** `index.html` lines 284, 291

---

### 8. **Suboptimal Viewport Fit** (MEDIUM PRIORITY)
**Problem:** viewport-fit=cover may cause issues on notched devices
- Should be `viewport-fit=contain` for better compatibility
- Safe-area insets not fully optimized

**Location:** `index.html` line 5

---

## ⚡ PERFORMANCE ISSUES

### 1. **Excessive Re-renders on Scroll**
**Problem:** `setHeaderState()` called on every scroll event
- No throttle/debounce implemented
- Can fire 60+ times per second

**Severity:** Medium - causes janky scrolling

**Location:** `script.js` lines 115-118

---

### 2. **Missing Image Optimization**
**Problem:** No image compression strategy
- PNG files used instead of WebP in main image references
- Picture element uses both formats but fallback inefficient

**Severity:** Medium - impacts Core Web Vitals (LCP)

---

### 3. **Unused Transitions on Scroll**
**Problem:** Header transitions run on scroll-triggered class toggle
- 260ms transition × 60fps = unnecessary GPU work
- Better to use `will-change: auto` by default

**Location:** `styles.css` lines 95-103

---

## 🔧 RESPONSIVE DESIGN BUGS

### 1. **Text Overflow on 320px Width**
- Hero heading clamp: `clamp(3.5rem, 18vw, 5.4rem)`
- At 320px: 18vw = 57.6px = too large
- Should be `clamp(2.8rem, 14vw, 4rem)`

**Location:** `styles.css` line 856

---

### 2. **Service Grid Cards Too Small**
**Problem:** 1-column grid on mobile 
- No minimum width defined
- Text cramped without padding adjustment

**Location:** `styles.css` lines 878-879

---

### 3. **Missing XL Breakpoint**
**Problem:** No optimization for desktop > 1920px
- Text sizes max out at 5.4rem
- Could use full width more effectively

---

## 🔐 ACCESSIBILITY ISSUES

### 1. **Missing ARIA Labels on Interactive Elements**
- Floating WhatsApp button has label (good)
- Nav toggle needs better label updates

**Location:** `index.html` line 431, `script.js` lines 43-44

---

### 2. **Image Alt Text Truncation**
**Problem:** Some alt text is cut off
- Line 284: "Baby shower photography in Kanpur by Pankaj Photo colour lab & Digital Photo Studio" (good)
- But title attributes should match alt text

---

### 3. **Color Contrast on Small Text**
**Problem:** Small gray text (#3a332c) on cream background
- Ratio: ~4.2:1 (passes WCAG AA but fails AAA)
- Should be darker for small copy

**Location:** `styles.css` lines 428, 525

---

## 📊 SEO ISSUES

### 1. **Missing og:url Meta Tag**
**Problem:** Open Graph missing og:url property
- Will default to referring URL, not site URL

**Location:** `index.html` line 19

---

### 2. **Canonical URL Missing Domain**
**Problem:** Line 17: `href="/"`
- Should be: `href="https://pankaj-photo-colour-lab.vercel.app/"`

---

---

## ✅ FIXES PRIORITY

| Priority | Issue | Impact | Fix Time |
|----------|-------|--------|----------|
| 🔴 CRITICAL | Google Maps responsive | Layout shift | 5 min |
| 🔴 CRITICAL | H1 text overflow mobile | UX broken | 10 min |
| 🟠 HIGH | Scroll event throttle | Performance | 10 min |
| 🟠 HIGH | Lazy loading portfolio images | LCP metric | 5 min |
| 🟡 MEDIUM | Button touch targets | Mobile usability | 10 min |
| 🟡 MEDIUM | Global JS scope | Maintenance | 15 min |
| 🟢 LOW | Unused CSS cleanup | Bundle size | 20 min |

---

## 📋 TESTING CHECKLIST

- [ ] Test on iPhone SE (375px)
- [ ] Test on iPhone 12 (390px)
- [ ] Test on Samsung Galaxy S21 (360px)
- [ ] Test on iPad (768px)
- [ ] Test on 4K desktop (2560px)
- [ ] Lighthouse audit (target 90+ all metrics)
- [ ] Page load on slow 4G
- [ ] Scroll performance (DevTools FPS)
- [ ] Touch interaction responsiveness

---

## 🚀 NEXT STEPS

1. Apply all fixes in priority order
2. Run Lighthouse audit after each section
3. Test on real devices with DevTools throttling
4. Verify Google PageSpeed scores improve
5. Check Core Web Vitals (LCP, CLS, FID)

