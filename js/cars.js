/*
 * cars.js — Renders inventory cards, detail modal, photo lightbox,
 * search and sort controls. Data comes from cars-data.js (window.CARS_DATA).
 */

(function () {
  "use strict";

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }

  function formatNumber(n) {
    if (n === null || n === undefined || isNaN(n)) return "";
    return parseInt(n, 10).toLocaleString();
  }

  function formatPrice(car) {
    if (car.price === null || car.price === undefined) return "Contact for price";
    if (car.price <= 1) return "Contact for price";
    return "$" + formatNumber(car.price);
  }

  function carTitle(car) {
    const parts = [car.year, car.make, car.model];
    if (car.submodel && car.submodel.toLowerCase() !== String(car.model).toLowerCase()) {
      parts.push(car.submodel);
    }
    return parts.filter(Boolean).join(" ");
  }

  function primaryImage(car) {
    // Prefer an explicit thumbnail filename if one is set on the car object.
    // This lets us guarantee a front 3/4 view as the card image even if the
    // photos array is in chronological/file-name order.
    if (car.thumbnail && car.photos && car.photos.indexOf(car.thumbnail) !== -1) {
      return car.photoDir + "/" + car.thumbnail;
    }
    if (car.photos && car.photos.length > 0) {
      return car.photoDir + "/" + car.photos[0];
    }
    return null;
  }

  function getCars() {
    return Array.isArray(window.CARS_DATA) ? window.CARS_DATA.slice() : [];
  }

  function sortCarsByMode(cars, mode) {
    const c = cars.slice();
    switch (mode) {
      case "year-asc":
        return c.sort((a, b) => a.year - b.year);
      case "year-desc":
        return c.sort((a, b) => b.year - a.year);
      case "price-asc":
        return c.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
      case "price-desc":
        return c.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "mileage-asc":
        return c.sort((a, b) => (a.mileage || Infinity) - (b.mileage || Infinity));
      case "mileage-desc":
        return c.sort((a, b) => (b.mileage || 0) - (a.mileage || 0));
      case "make":
        return c.sort((a, b) => String(a.make).localeCompare(String(b.make)) || b.year - a.year);
      default:
        return c.sort((a, b) => b.year - a.year);
    }
  }

  function sortCars(cars, mode) {
    const available = sortCarsByMode(cars.filter((car) => !car.sold), mode);
    const sold = sortCarsByMode(cars.filter((car) => car.sold), mode);
    return available.concat(sold);
  }

  function filterCars(cars, term) {
    if (!term) return cars;
    const t = term.toLowerCase();
    return cars.filter((car) => {
      const haystack = [
        car.year,
        car.make,
        car.model,
        car.submodel,
        car.vin,
        car.specs && car.specs.bodyClass,
        car.specs && car.specs.engine,
        car.specs && car.specs.drive
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(t);
    });
  }

  function renderCard(car, index) {
    const title = carTitle(car);
    const imgSrc = primaryImage(car);
    const photoCount = (car.photos && car.photos.length) || 0;
    const animDelay = (index * 0.08).toFixed(2);
    const priceDisplay = car.sold ? "Sold" : formatPrice(car);
    const soldOverlay = car.sold
      ? `<div class="car-card__sold-overlay" aria-hidden="true"><span class="car-card__sold-label">SOLD</span></div>`
      : "";

    const imageMarkup = imgSrc
      ? `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(title)}" loading="lazy">
         ${soldOverlay}
         ${photoCount > 1 ? `<span class="car-card__photo-count">${photoCount} photos</span>` : ""}`
      : `<div class="car-card__no-photo">
           <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
           <div class="car-card__no-photo-title">Photos coming soon</div>
           <div class="car-card__no-photo-text">Call or text us to schedule a viewing</div>
         </div>${soldOverlay}`;

    const detailChips = [];
    if (car.mileage) {
      detailChips.push(`<span class="car-card__detail"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${escapeHtml(formatNumber(car.mileage))} mi</span>`);
    }
    if (car.specs && car.specs.drive) {
      detailChips.push(`<span class="car-card__detail">${escapeHtml(car.specs.drive)}</span>`);
    }
    if (car.specs && car.specs.bodyClass) {
      detailChips.push(`<span class="car-card__detail">${escapeHtml(car.specs.bodyClass)}</span>`);
    }

    return `
    <article class="car-card${car.sold ? " car-card--sold" : ""}" style="animation: fadeInUp 0.5s ease ${animDelay}s both;" data-car-id="${escapeHtml(car.id)}">
      <span class="car-card__badge${car.sold ? " car-card__badge--sold" : ""}">${car.sold ? "Sold" : "Available"}</span>
      <div class="car-card__image" data-action="open-detail" data-car-id="${escapeHtml(car.id)}">
        ${imageMarkup}
      </div>
      <div class="car-card__content">
        <h3 class="car-card__title">${escapeHtml(title)}</h3>
        <div class="car-card__details">${detailChips.join("")}</div>
        <div class="car-card__price${car.sold ? " car-card__price--sold" : ""}">${escapeHtml(priceDisplay)}</div>
        <div class="car-card__footer">
          <button type="button" class="car-card__button button" data-action="open-detail" data-car-id="${escapeHtml(car.id)}">View Details</button>
          <a href="tel:9376549550" class="car-card__button button button--outline" aria-label="Call or text Auto-link LLC">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Call or Text
          </a>
        </div>
      </div>
    </article>`;
  }

  function renderCars() {
    const grid = document.getElementById("carsGrid");
    const empty = document.getElementById("noCars");
    const count = document.getElementById("inventoryCount");
    if (!grid) return;

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const term = searchInput ? searchInput.value.trim() : "";
    const mode = sortSelect ? sortSelect.value : "year-desc";

    let cars = getCars();
    cars = filterCars(cars, term);
    cars = sortCars(cars, mode);

    if (count) {
      const all = getCars();
      const total = all.length;
      const soldCount = all.filter((car) => car.sold).length;
      const availableCount = total - soldCount;
      if (cars.length !== total) {
        count.textContent = `Showing ${cars.length} of ${total} vehicles`;
      } else if (soldCount > 0) {
        count.textContent = `${total} vehicles · ${availableCount} available · ${soldCount} sold`;
      } else {
        count.textContent = `${total} ${total === 1 ? "vehicle" : "vehicles"} available`;
      }
    }

    if (cars.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.style.display = "block";
      return;
    }

    if (empty) empty.style.display = "none";
    grid.innerHTML = cars.map(renderCard).join("");
  }

  /* ---------------- Detail modal + lightbox ---------------- */

  function findCarById(id) {
    return getCars().find((c) => c.id === id);
  }

  function renderSpecRow(label, value) {
    if (!value) return "";
    return `<div class="detail__spec-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
  }

  function openDetail(id) {
    const car = findCarById(id);
    if (!car) return;
    const modal = document.getElementById("carDetailModal");
    const body = document.getElementById("carDetailBody");
    if (!modal || !body) return;

    const title = carTitle(car);
    const photos = car.photos || [];
    const hasPhotos = photos.length > 0;
    // Honor an explicit thumbnail so the modal opens to the same image
    // the user clicked on the card.
    let startIndex = 0;
    if (car.thumbnail) {
      const idx = photos.indexOf(car.thumbnail);
      if (idx !== -1) startIndex = idx;
    }

    const galleryMarkup = hasPhotos
      ? `<div class="detail__gallery">
           <div class="detail__main-photo">
             <img id="detailMainPhoto" src="${escapeHtml(car.photoDir + "/" + photos[startIndex])}" alt="${escapeHtml(title)}" data-action="open-lightbox" data-index="${startIndex}">
             ${photos.length > 1 ? `
             <button type="button" class="detail__nav detail__nav--prev" data-action="prev-photo" aria-label="Previous photo">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
             </button>
             <button type="button" class="detail__nav detail__nav--next" data-action="next-photo" aria-label="Next photo">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             </button>` : ""}
           </div>
           ${photos.length > 1 ? `
           <div class="detail__thumbs">
             ${photos.map((p, i) => `<img src="${escapeHtml(car.photoDir + "/" + p)}" alt="${escapeHtml(title)} photo ${i + 1}" class="detail__thumb${i === startIndex ? " is-active" : ""}" data-action="select-photo" data-index="${i}" loading="lazy">`).join("")}
           </div>` : ""}
         </div>`
      : `<div class="detail__no-photo">
           <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
           <h3>Photos coming soon</h3>
           <p>Call or text (937) 654-9550 to schedule a viewing.</p>
         </div>`;

    const descriptionMarkup = car.description
      ? `<p class="detail__description">${escapeHtml(car.description)}</p>`
      : "";

    const mediaMarkup = galleryMarkup + descriptionMarkup;

    const specs = car.specs || {};
    const specRows = [
      renderSpecRow("Body Style", specs.bodyClass),
      renderSpecRow("Engine", specs.engine),
      renderSpecRow("Fuel", specs.fuel),
      renderSpecRow("Transmission", specs.transmission),
      renderSpecRow("Drivetrain", specs.drive),
      renderSpecRow("Doors", specs.doors),
      renderSpecRow("Seats", specs.seats),
      renderSpecRow("Assembly Plant", specs.plant)
    ].filter(Boolean).join("");

    const optionsMarkup = (car.options && car.options.length)
      ? `<div class="detail__section">
           <h3 class="detail__heading">Features &amp; Options</h3>
           <ul class="detail__options">
             ${car.options.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}
           </ul>
         </div>`
      : "";

    const noticeBlocks = [];
    if (car.yearNote) noticeBlocks.push(`<div class="detail__notice">${escapeHtml(car.yearNote)}</div>`);
    if (car.vinNote) noticeBlocks.push(`<div class="detail__notice detail__notice--warn">${escapeHtml(car.vinNote)}</div>`);
    if (car.priceNote) noticeBlocks.push(`<div class="detail__notice">${escapeHtml(car.priceNote)}</div>`);

    const infoBody = car.noInfo
      ? `<div class="detail__notice detail__notice--warn">Information coming soon — please call or text (937) 654-9550 for full vehicle details.</div>`
      : `
        ${noticeBlocks.join("")}
        <div class="detail__price">${escapeHtml(formatPrice(car))}</div>
        <dl class="detail__specs">
          ${renderSpecRow("Mileage", car.mileage ? formatNumber(car.mileage) + " mi" : null)}
          ${renderSpecRow("VIN", car.vin)}
          ${specRows}
        </dl>
        ${optionsMarkup}`;

    body.innerHTML = `
      <h2 class="detail__title">${escapeHtml(title)}</h2>
      <div class="detail__grid">
        <div class="detail__media">${mediaMarkup}</div>
        <div class="detail__info">
          ${infoBody}
          <div class="detail__actions">
            <a href="tel:9376549550" class="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              (937) 654-9550
            </a>
            <a href="#financing" class="button button--outline" data-action="close-detail">Get Financing</a>
          </div>
        </div>
      </div>
    `;

    modal.dataset.carId = car.id;
    modal.dataset.photoIndex = String(startIndex);
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeDetail() {
    const modal = document.getElementById("carDetailModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  function setMainPhoto(index) {
    const modal = document.getElementById("carDetailModal");
    if (!modal) return;
    const car = findCarById(modal.dataset.carId);
    if (!car || !car.photos || car.photos.length === 0) return;
    const len = car.photos.length;
    const i = ((index % len) + len) % len;
    modal.dataset.photoIndex = String(i);
    const main = document.getElementById("detailMainPhoto");
    if (main) {
      main.src = car.photoDir + "/" + car.photos[i];
      main.dataset.index = String(i);
    }
    document.querySelectorAll(".detail__thumb").forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.index) === i);
    });
  }

  /* ---------------- Lightbox ---------------- */

  function updateLightboxNav(photoCount) {
    const showNav = photoCount > 1;
    document.querySelectorAll(".lightbox__nav").forEach((btn) => {
      btn.classList.toggle("is-hidden", !showNav);
    });
  }

  function openLightbox(index) {
    const modal = document.getElementById("carDetailModal");
    if (!modal) return;
    const car = findCarById(modal.dataset.carId);
    if (!car || !car.photos || car.photos.length === 0) return;
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImage");
    if (!lightbox || !img) return;
    const i = Math.max(0, Math.min(index, car.photos.length - 1));
    lightbox.dataset.index = String(i);
    img.src = car.photoDir + "/" + car.photos[i];
    img.alt = carTitle(car) + " photo " + (i + 1);
    updateLightboxNav(car.photos.length);
    lightbox.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    if (!document.getElementById("carDetailModal").classList.contains("is-open")) {
      document.body.classList.remove("modal-open");
    }
  }

  function shiftLightbox(delta) {
    const modal = document.getElementById("carDetailModal");
    const lightbox = document.getElementById("lightbox");
    if (!modal || !lightbox) return;
    const car = findCarById(modal.dataset.carId);
    if (!car || !car.photos || car.photos.length === 0) return;
    const len = car.photos.length;
    const current = parseInt(lightbox.dataset.index || "0", 10);
    const next = ((current + delta) % len + len) % len;
    openLightbox(next);
  }

  /* ---------------- Event wiring ---------------- */

  function attachEvents() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.addEventListener("input", renderCars);

    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.addEventListener("change", renderCars);

    document.addEventListener("click", function (e) {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;

      if (action === "open-detail") {
        const id = target.dataset.carId;
        if (id) openDetail(id);
      } else if (action === "close-detail") {
        closeDetail();
      } else if (action === "next-photo") {
        const modal = document.getElementById("carDetailModal");
        setMainPhoto(parseInt(modal.dataset.photoIndex || "0", 10) + 1);
      } else if (action === "prev-photo") {
        const modal = document.getElementById("carDetailModal");
        setMainPhoto(parseInt(modal.dataset.photoIndex || "0", 10) - 1);
      } else if (action === "select-photo") {
        setMainPhoto(parseInt(target.dataset.index || "0", 10));
      } else if (action === "open-lightbox") {
        openLightbox(parseInt(target.dataset.index || "0", 10));
      } else if (action === "close-lightbox") {
        closeLightbox();
      } else if (action === "lightbox-next") {
        shiftLightbox(1);
      } else if (action === "lightbox-prev") {
        shiftLightbox(-1);
      }
    });

    const modal = document.getElementById("carDetailModal");
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeDetail();
      });
    }

    document.addEventListener("keydown", function (e) {
      const lightbox = document.getElementById("lightbox");
      const detail = document.getElementById("carDetailModal");
      if (lightbox && lightbox.classList.contains("is-open")) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowRight") shiftLightbox(1);
        else if (e.key === "ArrowLeft") shiftLightbox(-1);
      } else if (detail && detail.classList.contains("is-open")) {
        if (e.key === "Escape") closeDetail();
        else if (e.key === "ArrowRight") setMainPhoto(parseInt(detail.dataset.photoIndex || "0", 10) + 1);
        else if (e.key === "ArrowLeft") setMainPhoto(parseInt(detail.dataset.photoIndex || "0", 10) - 1);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCars();
    attachEvents();
  });
})();
