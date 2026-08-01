/* ==========================================
   Rafael Ramirez Mechanical Design Portfolio
   script.js
========================================== */

// ==========================================
// Fade-in animation
// ==========================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold:0.15

});

sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// ==========================================
// Sticky Header Shadow
// ==========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        header.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});


// ==========================================
// Active Navigation
// ==========================================

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        if(window.pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


// ==========================================
// Scroll To Top Button
// ==========================================

const topButton = document.createElement("button");

topButton.id="topButton";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topButton.style.opacity="1";
        topButton.style.pointerEvents="auto";

    }

    else{

        topButton.style.opacity="0";
        topButton.style.pointerEvents="none";

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// ==========================================
// Smooth Hover Animation
// ==========================================

document.querySelectorAll(".project-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});


// ==========================================
// Project Card Click Animation
// ==========================================

document.querySelectorAll(".project-card").forEach(card=>{

    card.addEventListener("mousedown",()=>{

        card.style.transform="scale(.98)";

    });

    card.addEventListener("mouseup",()=>{

        card.style.transform="scale(1)";

    });

});


// ==========================================
// Current Year in Footer
// ==========================================

const footer = document.querySelector("footer p");

if(footer){

    footer.innerHTML = footer.innerHTML.replace("2026", new Date().getFullYear());

}


// ==========================================
// Image Lightbox (Future Ready)
// ==========================================

const images = document.querySelectorAll(".gallery img");

if(images.length){

    const overlay = document.createElement("div");

    overlay.id = "lightbox";

    overlay.innerHTML = "<img>";

    document.body.appendChild(overlay);

    const lightboxImage = overlay.querySelector("img");

    images.forEach(image=>{

        image.addEventListener("click",()=>{

            overlay.style.display="flex";

            lightboxImage.src=image.src;

        });

    });

    overlay.addEventListener("click",()=>{

        overlay.style.display="none";

    });

}

console.log("Mechanical Design Portfolio Loaded Successfully");
