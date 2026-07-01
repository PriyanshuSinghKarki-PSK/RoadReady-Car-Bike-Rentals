/* =====================================================
   ROADREADY — CAR & BIKE RENTAL WEBSITE
   Vanilla JS — no frameworks
===================================================== */

/* ---------- VEHICLE DATA ---------- */
const vehicles = [
  { id: 1, name: "Hyundai Creta", type: "Car", brand: "Hyundai", price: 3200, rating: 4.6, fuel: "Petrol", seats: 5, transmission: "Automatic", image: "./assets/images/creata.jpeg", desc:"A stylish compact SUV with a smooth ride, perfect for city drives and weekend getaways." },
  { id: 2, name: "Mahindra Thar", type: "Car", brand: "Mahindra", price: 4500, rating: 4.8, fuel: "Diesel", seats: 4, transmission: "Manual", image: "./assets/images/thar.jpeg", desc:"A rugged off-roader built for adventure trails and mountain escapes." },
  { id: 3, name: "Honda City", type: "Car", brand: "Honda", price: 2800, rating: 4.5, fuel: "Petrol", seats: 5, transmission: "Automatic", image: "./assets/images/honda_city.jpeg", desc:"A refined sedan offering comfort and efficiency for everyday commutes." },
  { id: 4, name: "Toyota Fortuner", type: "Car", brand: "Toyota", price: 5800, rating: 4.9, fuel: "Diesel", seats: 7, transmission: "Automatic", image: "./assets/images/fortuner.jpeg", desc:"A commanding full-size SUV with premium comfort for long family trips." },
  { id: 5, name: "Maruti Baleno", type: "Car", brand: "Maruti", price: 1800, rating: 4.3, fuel: "Petrol", seats: 5, transmission: "Manual", image: "./assets/images/baleno.jpeg", desc:"A peppy hatchback that's easy on fuel and easy to park." },
  { id: 6, name: "Kia Seltos", type: "Car", brand: "Kia", price: 3400, rating: 4.7, fuel: "Petrol", seats: 5, transmission: "Automatic", image: "./assets/images/seltos.jpeg", desc:"A feature-packed SUV with a bold design and connected tech." },
  { id: 7, name: "Royal Enfield Classic 350", type: "Bike", brand: "Royal Enfield", price: 1200, rating: 4.7, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/classic350.jpeg", emoji:"🏍️", desc:"The iconic thump — a timeless cruiser for relaxed long rides." },
  { id: 8, name: "KTM Duke 390", type: "Bike", brand: "KTM", price: 1500, rating: 4.6, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/duke390.jpeg", desc:"A sharp, aggressive streetfighter built for thrill seekers." },
  { id: 9, name: "Yamaha R15", type: "Bike", brand: "Yamaha", price: 1300, rating: 4.5, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/yamaha_r15.jpeg", desc:"A track-bred sportbike that loves corners as much as straights." },
  { id: 10, name: "Bajaj Pulsar", type: "Bike", brand: "Bajaj", price: 700, rating: 4.2, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/pulser.jpeg", desc:"A reliable everyday performer with sporty styling." },
  { id: 11, name: "TVS Apache", type: "Bike", brand: "TVS", price: 800, rating: 4.3, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/apache.jpeg", desc:"A racing-inspired bike with sharp handling for the city and highway." },
  { id: 12, name: "Honda CB350", type: "Bike", brand: "Honda", price: 1100, rating: 4.6, fuel: "Petrol", seats: 2, transmission: "Manual", image: "./assets/images/honda_cb350.jpeg", desc:"A retro-modern roadster blending heritage looks with refined performance." },
];

const reviews = [
  { name:"Aarav Mehta", rating:5, text:"Booked a Thar for a weekend trip — spotless vehicle, smooth pickup. Would rent again in a heartbeat." },
  { name:"Sneha Kapoor", rating:4.5, text:"The Creta was super comfortable for our family road trip. Great support team too." },
  { name:"Rohan Verma", rating:5, text:"Rented the KTM Duke for a solo ride to the hills. Felt brand new, very well maintained." },
  { name:"Priya Nair", rating:4.5, text:"Booking took less than a minute and the price was exactly what was quoted. No surprises." },
  { name:"Karan Singh", rating:5, text:"24/7 support actually works — had a query at midnight and got a quick reply." },
];

/* ---------- STATE ---------- */
const GST_RATE = 0.18;
const SECURITY_DEPOSIT = 2000;
let wishlist = JSON.parse(localStorage.getItem("rr_wishlist") || "[]");
let cart = JSON.parse(localStorage.getItem("rr_cart") || "[]");
let currentReviewIndex = 0;
let activeBookingVehicle = null;

/* ---------- UTIL ---------- */
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return document.querySelectorAll(sel); }
function formatINR(n){ return "₹" + Number(n).toLocaleString("en-IN"); }
function findVehicle(id){ return vehicles.find(v => v.id === Number(id)); }
function saveWishlist(){ localStorage.setItem("rr_wishlist", JSON.stringify(wishlist)); }
function saveCart(){ localStorage.setItem("rr_cart", JSON.stringify(cart)); }

function showToast(message, type = "success"){
  const container = $("#toast-container");
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " error" : "");
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function openModal(modal){ modal.classList.add("show"); document.body.style.overflow = "hidden"; }
function closeModal(modal){ modal.classList.remove("show"); document.body.style.overflow = ""; }

/* ---------- LOADER ---------- */
window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 600);
});

/* ---------- THEME TOGGLE ---------- */
function initTheme(){
  const saved = localStorage.getItem("rr_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  $("#themeToggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("rr_theme", next);
  });
}

/* ---------- NAVBAR ---------- */
function initNavbar(){
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  $all(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.classList.remove("open");
      $all(".nav-link").forEach(l => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const filterType = e.currentTarget.dataset.filterLink;
      if (filterType) {
        $("#filterType").value = filterType;
        applyFilters();
      }
    });
  });

  $all("[data-filter-link]").forEach(link => {
    if (!link.classList.contains("nav-link")) {
      link.addEventListener("click", () => {
        $("#filterType").value = link.dataset.filterLink;
        applyFilters();
      });
    }
  });

  // active link highlight on scroll
  const sections = $all("section[id]");
  window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    $all(".nav-link[data-link]").forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current && !l.dataset.filterLink);
    });
  });
}

/* ---------- HERO SEARCH FORM ---------- */
function initSearchForm(){
  const today = new Date().toISOString().split("T")[0];
  $("#pickupDate").min = today;
  $("#returnDate").min = today;
  $("#pickupDate").value = today;

  $("#pickupDate").addEventListener("change", () => {
    $("#returnDate").min = $("#pickupDate").value;
  });

  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const errorEl = $("#searchError");
    const pickup = $("#pickupDate").value;
    const ret = $("#returnDate").value;
    const location = $("#pickupLocation").value.trim();

    if (!location) { errorEl.textContent = "Please enter a pickup location."; return; }
    if (!pickup || !ret) { errorEl.textContent = "Please select both pickup and return dates."; return; }
    if (new Date(ret) < new Date(pickup)) { errorEl.textContent = "Return date cannot be before pickup date."; return; }

    errorEl.textContent = "";
    $("#filterType").value = $("#vehicleType").value;
    applyFilters();
    document.getElementById("vehicles").scrollIntoView({ behavior: "smooth" });
    showToast(`Showing available vehicles in ${location}`);
  });
}

/* ---------- RENDER VEHICLES ---------- */
function renderSkeletons(count = 6){
  const grid = $("#vehicleGrid");
  grid.innerHTML = Array.from({ length: count }).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-block skeleton-img"></div>
      <div class="skeleton-block skeleton-line" style="width:60%"></div>
      <div class="skeleton-block skeleton-line" style="width:40%"></div>
      <div class="skeleton-block skeleton-line" style="width:80%"></div>
    </div>
  `).join("");
}

// function vehicleCard(v){
//   const isWished = wishlist.includes(v.id);
//   return `
//   <div class="vehicle-card" data-id="${v.id}">
//     <div class="vehicle-img-wrap">
//       <span class="type-tag">${v.type}</span>
//       <button class="wish-btn ${isWished ? "active" : ""}" data-wish="${v.id}" aria-label="Toggle wishlist">${isWished ? "❤️" : "🤍"}</button>
//       <span aria-hidden="true">${v.emoji}</span>
//     </div>
//     <div class="vehicle-body">
//       <div class="vehicle-top">
//         <div>
//           <div class="vehicle-name">${v.name}</div>
//           <div class="vehicle-brand">${v.brand}</div>
//         </div>
//         <div class="rating">⭐ ${v.rating}</div>
//       </div>
//       <div class="vehicle-specs">
//         <span>⛽ ${v.fuel}</span>
//         <span>👤 ${v.seats} seats</span>
//         <span>⚙️ ${v.transmission}</span>
//       </div>
//       <div class="vehicle-price">${formatINR(v.price)} <small>/ day</small></div>
//       <div class="vehicle-actions">
//         <button class="btn btn-ghost" data-details="${v.id}">View Details</button>
//         <button class="btn btn-primary" data-book="${v.id}">Book Now</button>
//       </div>
//     </div>
//   </div>`;
// }

function vehicleCard(v){
  const isWished = wishlist.includes(v.id);
  // Check if image exists, otherwise use emoji
  const mediaContent = v.image ? `<img src="${v.image}" alt="${v.name}">` : `<span aria-hidden="true">${v.emoji}</span>`;

  return `
  <div class="vehicle-card" data-id="${v.id}">
    <div class="vehicle-img-wrap" style="${v.image ? 'background: #fff;' : ''}">
      <span class="type-tag">${v.type}</span>
      <button class="wish-btn ${isWished ? "active" : ""}" data-wish="${v.id}" aria-label="Toggle wishlist">${isWished ? "❤️" : "🤍"}</button>
      ${mediaContent}
    </div>
    <div class="vehicle-body">
      <div class="vehicle-top">
        <div>
          <div class="vehicle-name">${v.name}</div>
          <div class="vehicle-brand">${v.brand}</div>
        </div>
        <div class="rating">⭐ ${v.rating}</div>
      </div>
      <div class="vehicle-specs">
        <span>⛽ ${v.fuel}</span>
        <span>👤 ${v.seats} seats</span>
        <span>⚙️ ${v.transmission}</span>
      </div>
      <div class="vehicle-price">${formatINR(v.price)} <small>/ day</small></div>
      <div class="vehicle-actions">
        <button class="btn btn-ghost" data-details="${v.id}">View Details</button>
        <button class="btn btn-primary" data-book="${v.id}">Book Now</button>
      </div>
    </div>
  </div>`;
}

function getFilteredVehicles(){
  const search = $("#liveSearch").value.trim().toLowerCase();
  const type = $("#filterType").value;
  const brand = $("#filterBrand").value;
  const priceRange = $("#filterPrice").value;
  const minRating = parseFloat($("#filterRating").value);

  return vehicles.filter(v => {
    const matchesSearch = !search ||
      v.name.toLowerCase().includes(search) ||
      v.brand.toLowerCase().includes(search) ||
      v.type.toLowerCase().includes(search);
    const matchesType = type === "All" || v.type === type;
    const matchesBrand = brand === "All" || v.brand === brand;
    let matchesPrice = true;
    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = v.price >= min && v.price <= max;
    }
    const matchesRating = v.rating >= minRating;
    return matchesSearch && matchesType && matchesBrand && matchesPrice && matchesRating;
  });
}

function renderVehicles(){
  const grid = $("#vehicleGrid");
  const noResults = $("#noResults");
  const list = getFilteredVehicles();

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;
  grid.innerHTML = list.map(vehicleCard).join("");
}

function applyFilters(){ renderVehicles(); }

function populateBrandFilter(){
  const brands = [...new Set(vehicles.map(v => v.brand))].sort();
  const select = $("#filterBrand");
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b; opt.textContent = b;
    select.appendChild(opt);
  });
}

function initVehicleControls(){
  populateBrandFilter();
  renderSkeletons();
  setTimeout(renderVehicles, 500); // simulate loading

  ["liveSearch"].forEach(id => $("#" + id).addEventListener("input", applyFilters));
  ["filterType","filterBrand","filterPrice","filterRating"].forEach(id => $("#" + id).addEventListener("change", applyFilters));

  $("#resetFilters").addEventListener("click", () => {
    $("#liveSearch").value = "";
    $("#filterType").value = "All";
    $("#filterBrand").value = "All";
    $("#filterPrice").value = "All";
    $("#filterRating").value = "0";
    applyFilters();
  });

  // event delegation for cards
  $("#vehicleGrid").addEventListener("click", (e) => {
    const wishBtn = e.target.closest("[data-wish]");
    const detailsBtn = e.target.closest("[data-details]");
    const bookBtn = e.target.closest("[data-book]");

    if (wishBtn) toggleWishlist(Number(wishBtn.dataset.wish));
    if (detailsBtn) openDetailsModal(Number(detailsBtn.dataset.details));
    if (bookBtn) openBookingModal(Number(bookBtn.dataset.book));
  });
}

/* ---------- WISHLIST ---------- */
function toggleWishlist(id){
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist");
  }
  saveWishlist();
  updateWishlistUI();
  renderVehicles();
}

function updateWishlistUI(){
  $("#wishlistCount").textContent = wishlist.length;
}

function renderWishlistModal(){
  const container = $("#wishlistList");
  if (wishlist.length === 0) {
    container.innerHTML = `<p class="empty-msg">Your wishlist is empty. Tap the heart on any vehicle to save it.</p>`;
    return;
  }
  container.innerHTML = wishlist.map(id => {
    const v = findVehicle(id);
    if (!v) return "";
    return `<div class="simple-item">
      <div>${v.emoji} <strong>${v.name}</strong> — ${formatINR(v.price)}/day</div>
      <button data-remove-wish="${v.id}">Remove</button>
    </div>`;
  }).join("");
}

/* ---------- CART / BOOKING SUMMARY ---------- */
function addToCart(item){
  cart.push(item);
  saveCart();
  updateCartUI();
}

function updateCartUI(){
  $("#cartCount").textContent = cart.length;
}

function calcCartItem(item){
  const v = findVehicle(item.vehicleId);
  const days = item.days;
  const base = v.price * days;
  const gst = base * GST_RATE;
  const total = base + gst + SECURITY_DEPOSIT;
  return { base, gst, total, v };
}

function renderCartModal(){
  const list = $("#cartList");
  const summary = $("#cartSummary");
  if (cart.length === 0) {
    list.innerHTML = `<p class="empty-msg">No bookings in your cart yet.</p>`;
    summary.innerHTML = "";
    return;
  }
  let grandTotal = 0;
  list.innerHTML = cart.map((item, idx) => {
    const { base, gst, total, v } = calcCartItem(item);
    grandTotal += total;
    return `<div class="simple-item">
      <div>${v.emoji} <strong>${v.name}</strong><br><small>${item.days} day(s) · ${formatINR(total)}</small></div>
      <button data-remove-cart="${idx}">Remove</button>
    </div>`;
  }).join("");
  summary.innerHTML = `
    <div><span>Items</span><span>${cart.length}</span></div>
    <div class="grand"><span>Grand Total</span><span>${formatINR(grandTotal)}</span></div>
  `;
}

/* ---------- DETAILS MODAL ---------- */
// function openDetailsModal(id){
//   const v = findVehicle(id);
//   if (!v) return;
//   const content = $("#detailsModalContent");
//   content.innerHTML = `
//     <button class="modal-close" data-close>&times;</button>
//     <div class="details-hero">${v.emoji}</div>
//     <span class="availability">✅ Available Now</span>
//     <h3>${v.name}</h3>
//     <p class="vehicle-brand">${v.brand} · ${v.type}</p>
//     <p style="margin:14px 0;color:var(--text-muted)">${v.desc}</p>
//     <div class="details-grid">
//       <div><strong>Fuel Type</strong>${v.fuel}</div>
//       <div><strong>Transmission</strong>${v.transmission}</div>
//       <div><strong>Seating</strong>${v.seats} people</div>
//       <div><strong>Rating</strong>⭐ ${v.rating}</div>
//     </div>
//     <div class="vehicle-price" style="margin:14px 0">${formatINR(v.price)} <small>/ day</small></div>
//     <button class="btn btn-primary btn-block" data-book-from-details="${v.id}">Book Now</button>
//   `;
//   openModal($("#detailsModal"));
// }

function openDetailsModal(id){
  const v = findVehicle(id);
  if (!v) return;
  
  const mediaContent = v.image ? `<img src="${v.image}" alt="${v.name}">` : v.emoji;

  const content = $("#detailsModalContent");
  content.innerHTML = `
    <button class="modal-close" data-close>&times;</button>
    <div class="details-hero" style="${v.image ? 'background: #fff;' : ''}">${mediaContent}</div>
    <span class="availability">✅ Available Now</span>
    <h3>${v.name}</h3>
    <p class="vehicle-brand">${v.brand} · ${v.type}</p>
    <p style="margin:14px 0;color:var(--text-muted)">${v.desc}</p>
    <div class="details-grid">
      <div><strong>Fuel Type</strong>${v.fuel}</div>
      <div><strong>Transmission</strong>${v.transmission}</div>
      <div><strong>Seating</strong>${v.seats} people</div>
      <div><strong>Rating</strong>⭐ ${v.rating}</div>
    </div>
    <div class="vehicle-price" style="margin:14px 0">${formatINR(v.price)} <small>/ day</small></div>
    <button class="btn btn-primary btn-block" data-book-from-details="${v.id}">Book Now</button>
  `;
  openModal($("#detailsModal"));
}

/* ---------- BOOKING MODAL ---------- */
function openBookingModal(id){
  const v = findVehicle(id);
  if (!v) return;
  activeBookingVehicle = v;
  const today = new Date().toISOString().split("T")[0];
  const content = $("#bookingModalContent");
  content.innerHTML = `
    <button class="modal-close" data-close>&times;</button>
    <h3>Book ${v.name}</h3>
    <p class="vehicle-brand" style="margin-bottom:16px">${formatINR(v.price)} / day</p>
    <form id="bookingForm">
      <div class="field"><label for="bFullName">Full Name</label><input type="text" id="bFullName" required></div>
      <div class="field"><label for="bEmail">Email</label><input type="email" id="bEmail" required></div>
      <div class="field"><label for="bMobile">Mobile Number</label><input type="tel" id="bMobile" pattern="[0-9]{10}" placeholder="10-digit number" required></div>
      <div class="field"><label for="bLocation">Pickup Location</label><input type="text" id="bLocation" required></div>
      <div class="search-grid" style="grid-template-columns:1fr 1fr;margin-top:10px">
        <div class="field"><label for="bPickupDate">Pickup Date</label><input type="date" id="bPickupDate" min="${today}" value="${today}" required></div>
        <div class="field"><label for="bReturnDate">Return Date</label><input type="date" id="bReturnDate" min="${today}" required></div>
      </div>
      <div class="booking-summary-box" id="bookingSummaryBox"></div>
      <p class="error-msg" id="bookingError"></p>
      <button type="submit" class="btn btn-primary btn-block">Confirm Booking</button>
    </form>
  `;
  openModal($("#bookingModal"));
  updateBookingSummary();
  ["bPickupDate","bReturnDate"].forEach(id => $("#" + id).addEventListener("change", updateBookingSummary));
  $("#bookingForm").addEventListener("submit", handleBookingSubmit);
}

function updateBookingSummary(){
  const box = $("#bookingSummaryBox");
  if (!box || !activeBookingVehicle) return;
  const pickup = $("#bPickupDate").value;
  const ret = $("#bReturnDate").value;
  let days = 1;
  if (pickup && ret) {
    const diff = (new Date(ret) - new Date(pickup)) / (1000 * 60 * 60 * 24);
    days = diff > 0 ? Math.ceil(diff) : 1;
  }
  const base = activeBookingVehicle.price * days;
  const gst = base * GST_RATE;
  const total = base + gst + SECURITY_DEPOSIT;
  box.innerHTML = `
    <div><span>Price per day</span><span>${formatINR(activeBookingVehicle.price)}</span></div>
    <div><span>Rental Days</span><span>${days}</span></div>
    <div><span>Subtotal</span><span>${formatINR(base)}</span></div>
    <div><span>GST (18%)</span><span>${formatINR(gst.toFixed(0))}</span></div>
    <div><span>Security Deposit</span><span>${formatINR(SECURITY_DEPOSIT)}</span></div>
    <div class="total"><span>Grand Total</span><span>${formatINR(total.toFixed(0))}</span></div>
  `;
  box.dataset.days = days;
}

function handleBookingSubmit(e){
  e.preventDefault();
  const pickup = $("#bPickupDate").value;
  const ret = $("#bReturnDate").value;
  const errorEl = $("#bookingError");
  if (new Date(ret) < new Date(pickup)) {
    errorEl.textContent = "Return date cannot be before pickup date.";
    return;
  }
  errorEl.textContent = "";
  const days = Number($("#bookingSummaryBox").dataset.days || 1);
  addToCart({ vehicleId: activeBookingVehicle.id, days, pickup, return: ret });
  closeModal($("#bookingModal"));
  showToast("Booking successful! Added to your cart.");
}

/* ---------- SHARED MODAL EVENTS ---------- */
function initModalEvents(){
  document.addEventListener("click", (e) => {
    if (e.target.matches(".modal-overlay")) {
      closeModal(e.target);
    }
    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) closeModal(closeBtn.closest(".modal-overlay"));

    const bookFromDetails = e.target.closest("[data-book-from-details]");
    if (bookFromDetails) {
      closeModal($("#detailsModal"));
      openBookingModal(Number(bookFromDetails.dataset.bookFromDetails));
    }

    const removeWish = e.target.closest("[data-remove-wish]");
    if (removeWish) {
      toggleWishlist(Number(removeWish.dataset.removeWish));
      renderWishlistModal();
    }

    const removeCart = e.target.closest("[data-remove-cart]");
    if (removeCart) {
      cart.splice(Number(removeCart.dataset.removeCart), 1);
      saveCart();
      updateCartUI();
      renderCartModal();
      showToast("Removed from booking cart");
    }
  });

  $("#wishlistBtn").addEventListener("click", () => { renderWishlistModal(); openModal($("#wishlistModal")); });
  $("#cartBtn").addEventListener("click", () => { renderCartModal(); openModal($("#cartModal")); });
}

/* ---------- STATS COUNTER ---------- */
function initCounters(){
  const counters = $all(".counter");
  let started = false;
  function animate(){
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let current = 0;
      const step = Math.ceil(target / 80);
      const tick = () => {
        current += step;
        if (current >= target) { counter.textContent = target.toLocaleString(); }
        else { counter.textContent = current.toLocaleString(); requestAnimationFrame(tick); }
      };
      tick();
    });
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) { started = true; animate(); }
    });
  }, { threshold: 0.4 });
  if (counters.length) observer.observe(counters[0].closest(".stats"));
}

/* ---------- COUNTDOWN TIMER ---------- */
function initCountdown(){
  const target = new Date();
  target.setDate(target.getDate() + 5);
  function update(){
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    $("#cd-days").textContent = String(days).padStart(2,"0");
    $("#cd-hours").textContent = String(hours).padStart(2,"0");
    $("#cd-mins").textContent = String(mins).padStart(2,"0");
    $("#cd-secs").textContent = String(secs).padStart(2,"0");
  }
  update();
  setInterval(update, 1000);
}

/* ---------- REVIEW SLIDER ---------- */
function initReviewSlider(){
  const track = $("#reviewTrack");
  const dots = $("#reviewDots");
  track.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-avatar">${r.name.split(" ").map(n=>n[0]).join("")}</div>
      <span class="rating">⭐ ${r.rating}</span>
      <p class="text">"${r.text}"</p>
      <strong>${r.name}</strong>
    </div>
  `).join("");
  dots.innerHTML = reviews.map((_, i) => `<button data-dot="${i}" class="${i===0?"active":""}"></button>`).join("");

  function goTo(index){
    currentReviewIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    $all("[data-dot]").forEach((d,i) => d.classList.toggle("active", i === index));
  }

  dots.addEventListener("click", (e) => {
    const dot = e.target.closest("[data-dot]");
    if (dot) goTo(Number(dot.dataset.dot));
  });

  setInterval(() => {
    goTo((currentReviewIndex + 1) % reviews.length);
  }, 4500);
}

/* ---------- NEWSLETTER ---------- */
function initNewsletter(){
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    showToast("Subscribed! Watch your inbox for deals.");
    $("#newsletterForm").reset();
  });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm(){
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cName").value.trim();
    const email = $("#cEmail").value.trim();
    const msg = $("#cMsg").value.trim();
    const errorEl = $("#contactError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !msg) { errorEl.textContent = "Please fill in all fields."; return; }
    if (!emailPattern.test(email)) { errorEl.textContent = "Please enter a valid email address."; return; }
    errorEl.textContent = "";
    showToast("Message sent! We'll get back to you soon.");
    $("#contactForm").reset();
  });
}

/* ---------- AUTH MODAL ---------- */
function initAuth(){
  $("#loginBtn").addEventListener("click", () => openModal($("#authModal")));

  $all(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $all(".auth-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      $("#loginForm").hidden = target !== "login";
      $("#signupForm").hidden = target !== "signup";
    });
  });

  $all(".show-pass").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = $("#" + btn.dataset.target);
      input.type = input.type === "password" ? "text" : "password";
    });
  });

  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim();
    const password = $("#loginPassword").value;
    const errorEl = $("#loginError");
    if (password.length < 6) { errorEl.textContent = "Password must be at least 6 characters."; return; }
    errorEl.textContent = "";
    closeModal($("#authModal"));
    showToast(`Welcome back, ${email.split("@")[0]}!`);
    $("#loginForm").reset();
  });

  $("#signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const mobile = $("#signupMobile").value.trim();
    const errorEl = $("#signupError");
    if (!/^[0-9]{10}$/.test(mobile)) { errorEl.textContent = "Please enter a valid 10-digit mobile number."; return; }
    errorEl.textContent = "";
    closeModal($("#authModal"));
    showToast("Account created successfully!");
    $("#signupForm").reset();
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal(){
  const elements = $all(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop(){
  const btn = $("#backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- INIT ALL ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initSearchForm();
  initVehicleControls();
  initModalEvents();
  initCounters();
  initCountdown();
  initReviewSlider();
  initNewsletter();
  initContactForm();
  initAuth();
  initScrollReveal();
  initBackToTop();
  updateWishlistUI();
  updateCartUI();
});
