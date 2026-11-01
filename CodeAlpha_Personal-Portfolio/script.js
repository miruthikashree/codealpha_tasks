
// ==================================
// 1. MOBILE NAVIGATION MENU
// ==================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ==================================
// 2. SCROLL REVEAL ANIMATIONS
// ==================================

const revealElements = document.querySelectorAll(
    "section, .skill-card, .project-card, .education-card"
);

revealElements.forEach(function (element) {

    element.classList.add("reveal");

});

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.1
});

revealElements.forEach(function (element) {

    observer.observe(element);

});


// ==================================
// 3. ACTIVE NAVIGATION HIGHLIGHT
// ==================================

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navigationLinks.forEach(function (link) {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active-link");

        }

    });

});


// ==================================
// 4. FOOTER CURRENT YEAR
// ==================================

const year = new Date().getFullYear();

document.querySelector("footer p").textContent =
    `© ${year} Miruthika Shree. All Rights Reserved.`;

