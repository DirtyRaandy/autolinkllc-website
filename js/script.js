/*
 * script.js — shared site behaviour: mobile menu, header scroll,
 * smooth scrolling, financing + trade-in form handlers (Formspree).
 */

function sanitizeText(str) {
  if (!str) return "";
  return String(str).trim().replace(/[<>]/g, "");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 100;
}

function validatePhone(phone) {
  return /^[\d\s\-\(\)\+\.]{7,20}$/.test(phone);
}

function validateName(name) {
  return name.trim().length >= 1 && name.trim().length <= 100;
}

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".icon-menu");
  if (menuIcon) {
    menuIcon.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle("menu-open");
    });
  }

  document.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("menu-open"));
  });

  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector(".header")?.offsetHeight || 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
          document.body.classList.remove("menu-open");
        }
      }
    });
  });

  document.querySelectorAll(".form__input, .form__textarea").forEach((input) => {
    input.addEventListener("focus", function () { this.parentElement.classList.add("focused"); });
    input.addEventListener("blur", function () { this.parentElement.classList.remove("focused"); });
  });

  /* ---------- Trade-in form ---------- */
  const TRADEIN_FORM_ENDPOINT = "https://formspree.io/f/mnjqgwkv";
  const tradeinForm = document.getElementById("tradeinForm");
  if (tradeinForm) {
    tradeinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonHTML = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `<svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...`;

      const formData = new FormData(this);
      const rawEmail = formData.get("email") || "";
      const rawPhone = formData.get("phone") || "";
      const rawName = formData.get("name") || "";

      if (!validateName(rawName)) {
        showFormMessage("tradeinMessage", "Please enter a valid name.", "error");
        submitButton.disabled = false; submitButton.innerHTML = originalButtonHTML; return;
      }
      if (!validateEmail(rawEmail)) {
        showFormMessage("tradeinMessage", "Please enter a valid email address.", "error");
        submitButton.disabled = false; submitButton.innerHTML = originalButtonHTML; return;
      }
      if (!validatePhone(rawPhone)) {
        showFormMessage("tradeinMessage", "Please enter a valid phone number.", "error");
        submitButton.disabled = false; submitButton.innerHTML = originalButtonHTML; return;
      }

      const data = {
        _subject: "Trade-In Request - Auto-link LLC",
        _replyto: sanitizeText(rawEmail),
        name: sanitizeText(rawName),
        email: sanitizeText(rawEmail),
        phone: sanitizeText(rawPhone),
        make: sanitizeText(formData.get("make")).substring(0, 50),
        model: sanitizeText(formData.get("model")).substring(0, 50),
        year: sanitizeText(formData.get("year")),
        mileage: sanitizeText(formData.get("mileage")),
        vin: sanitizeText(formData.get("vin")).substring(0, 17) || "Not provided",
        runs: sanitizeText(formData.get("runs")),
        damage: sanitizeText(formData.get("damage")),
        details: sanitizeText(formData.get("details")).substring(0, 1000) || "None"
      };

      fetch(TRADEIN_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams(data)
      })
        .then((response) => {
          if (response.ok) {
            showFormMessage("tradeinMessage", "✓ Thank you! Your trade-in request has been sent successfully. We will contact you soon.", "success");
            this.reset();
          } else { throw new Error("Form submission failed"); }
        })
        .catch(() => showFormMessage("tradeinMessage", "Please call or text us at (937) 654-9550 or email poopation@gmail.com", "error"))
        .finally(() => { submitButton.disabled = false; submitButton.innerHTML = originalButtonHTML; });
    });
  }

  /* ---------- Scroll-in animations ---------- */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("animate-in")),
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  document.querySelectorAll(".features-bar__item, .contact-section__item").forEach((el) => observer.observe(el));

  const spinnerStyle = document.createElement("style");
  spinnerStyle.textContent = `
    .spinner { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .animate-in { animation: fadeInUp 0.6s ease forwards; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .focused { transform: translateY(-2px); }
  `;
  document.head.appendChild(spinnerStyle);
});

function showFormMessage(elementId, message, type) {
  const div = document.getElementById(elementId);
  if (!div) return;
  div.textContent = message;
  div.className = `form__message form__message--${type}`;
  div.style.display = "block";
  div.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    div.style.display = "none";
    div.textContent = "";
    div.className = "form__message";
  }, 8000);
}
