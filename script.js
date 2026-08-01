/* ==========================================
   Rafael Ramirez Portfolio
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Mechanical Design Portfolio Loaded");

    // ==========================================
    // Smooth Navigation Highlight
    // ==========================================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    // ==========================================
    // Reveal Sections While Scrolling
    // ==========================================

    const reveals = document.querySelectorAll("section");

    function revealSections() {

        const windowHeight = window.innerHeight;

        reveals.forEach(section => {

            const revealTop = section.getBoundingClientRect().top;

            if (revealTop < windowHeight - 100) {

                section.classList.add("show");

            }

        });

    }

    revealSections();

    window.addEventListener("scroll", revealSections);

    // ==========================================
    // Project Card Hover Effect
    // ==========================================

    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    // ==========================================
    // Dynamic Copyright Year
    // ==========================================

    const footer = document.querySelector("footer p:last-child");

    if (footer) {

        footer.innerHTML =
            "© " +
            new Date().getFullYear() +
            " Rafael Ramirez. All Rights Reserved.";

    }

});
