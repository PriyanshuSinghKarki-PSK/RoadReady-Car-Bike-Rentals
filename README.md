# RoadReady — Car & Bike Rental Website

A modern, fully responsive Car & Bike rental landing page built with plain HTML5, CSS3, and Vanilla JavaScript — no frameworks, no backend required.

## Run it
Just open `index.html` in any browser. Everything works client-side.

## Structure
```
car-bike-rental/
├── index.html      → all markup/sections
├── style.css       → theme, layout, responsive rules
├── script.js       → all interactivity & data
└── assets/         → placeholder folders for real images/icons
```

## Features
- Sticky responsive navbar with mobile hamburger menu and scroll-spy active states
- Hero search form with date validation
- Vehicle catalog (6 cars + 6 bikes) with instant search, multi-filter (type/brand/price/rating), and skeleton loading
- Vehicle details modal + full booking flow with live GST/deposit/total calculation
- Wishlist & booking cart, both persisted in `localStorage`
- Pricing plans, "Why Choose Us", animated stat counters, live countdown timer
- Auto-rotating testimonial slider
- Newsletter + contact forms with validation
- Login/Signup modal with show/hide password
- Dark/light theme toggle saved to `localStorage`
- Toast notifications, scroll-reveal animations, back-to-top button

## Notes
Vehicle "images" are rendered as large emoji icons inside gradient cards (no external image assets were available in this environment). Swap in real photos by replacing the `.vehicle-img-wrap` content and pointing to files under `assets/vehicles/`.
