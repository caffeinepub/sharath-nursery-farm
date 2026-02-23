# Specification

## Summary
**Goal:** Build a Progressive Web App (PWA) for Sharath Nursery Farm to manage inventory (plants, pots, propagation), billing, expenses, worker salaries, customer tracking, dead plant loss, and comprehensive analytics (monthly/yearly reports, ROI, CAGR).

**Planned changes:**
- Create backend data models and CRUD operations for plants, pots, propagation plants, sales, dead plants, expenses, workers, and customers
- Implement auto-incrementing billing system (#SNF-001 format) with customer toggle, discount handling, automatic stock deduction, and PDF generation
- Build dead plant tracking module with reason categorization and automatic stock/loss calculation
- Develop expense management with 12+ categories including worker salary sub-section
- Create analytics screens: monthly/yearly sales reports, ROI calculation, CAGR analysis, and dead plant loss insights
- Implement responsive dashboard with today's sales, low stock alerts, and quick actions
- Build inventory management screens for plants (7 categories), pots (size 4-22 inches, 9 types), and propagation (8 types)
- Create customer tracking with auto-aggregation of purchase history and spending
- Implement PWA features: manifest.json, service worker for offline caching, install prompt
- Apply green (#2E7D32) and brown (#5D4037) theme throughout with Indian Rupee (₹) formatting and DD/MM/YYYY dates
- Generate bill PDFs with business header (Dr. Sagar DN, address, WhatsApp, Instagram) and print/WhatsApp/download actions
- Build settings screen for business info, category management, and data backup

**User-visible outcome:** Owner can manage complete nursery operations through an installable mobile-first PWA: add/track inventory across three types, generate sequential bills with customer details or walk-in mode, record dead plants with loss tracking, manage expenses and worker salaries, view customers with purchase history, analyze business performance through monthly/yearly reports with ROI and CAGR calculations, identify high-loss products, and work offline with cached data.
