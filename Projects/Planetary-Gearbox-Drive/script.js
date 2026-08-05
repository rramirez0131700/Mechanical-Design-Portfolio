/*=========================================================
    PLANETARY GEARBOX DRIVE
    JAVASCRIPT
    Part 1 of 4
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeAnimations();

    initializeSections();

});


/*=========================================================
    SMOOTH NAVIGATION
=========================================================*/

function initializeNavigation() {

    const links = document.querySelectorAll(".sidebar a");

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetID = this.getAttribute("href");

            const target = document.querySelector(targetID);

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 30,

                behavior: "smooth"

            });

        });

    });

}


/*=========================================================
    ACTIVE SIDEBAR
=========================================================*/

window.addEventListener("scroll", highlightCurrentSection);

function highlightCurrentSection() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".sidebar a");

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}


/*=========================================================
    SECTION FADE ANIMATION
=========================================================*/

function initializeAnimations() {

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    document.querySelectorAll(".section").forEach(section => {

        observer.observe(section);

    });

}


/*=========================================================
    INITIAL HERO ANIMATION
=========================================================*/

function initializeSections() {

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.opacity = "0";

        hero.style.transform = "translateY(40px)";

        hero.style.transition = "1s";

        setTimeout(() => {

            hero.style.opacity = "1";

            hero.style.transform = "translateY(0px)";

        }, 250);

    }

}


/*=========================================================
    PARALLAX HERO
=========================================================*/

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const y = window.scrollY;

    hero.style.transform = `translateY(${y * 0.15}px)`;

});


/*=========================================================
    CARD HOVER EFFECT
=========================================================*/

const cards = document.querySelectorAll(

    ".gallery-card, .info-card, .card, .download-card"

);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".35s";

    });

});


/*=========================================================
    ACTIVE LINK CSS CLASS
=========================================================*/

const style = document.createElement("style");

style.innerHTML = `

.sidebar a.active{

    background:#2563eb;

    color:white;

    font-weight:600;

}

`;

document.head.appendChild(style);


/*=========================================================
    WINDOW RESIZE
=========================================================*/

window.addEventListener("resize", () => {

    highlightCurrentSection();

});


/*=========================================================
    END OF PART 1
=========================================================*/
/*=========================================================
    PART 2 OF 4
    IMAGE LIGHTBOX
=========================================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

let currentScale = 1;
let translateX = 0;
let translateY = 0;

const zoomableImages = document.querySelectorAll(".zoomable");

/*-----------------------------------
OPEN LIGHTBOX
-----------------------------------*/

zoomableImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImg.src = image.src;

        resetImageTransform();

    });

});

/*-----------------------------------
CLOSE
-----------------------------------*/

function closeLightbox(){

    lightbox.classList.remove("active");

    lightboxImg.src="";

    resetImageTransform();

}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function(e){

    if(e.target===lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown", function(e){

    if(e.key==="Escape"){

        closeLightbox();

    }

});

/*-----------------------------------
ZOOM
-----------------------------------*/

function updateTransform(){

    lightboxImg.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;

}

function resetImageTransform(){

    currentScale = 1;

    translateX = 0;

    translateY = 0;

    updateTransform();

}

/*-----------------------------------
MOUSE WHEEL
-----------------------------------*/

lightboxImg.addEventListener("wheel", function(e){

    e.preventDefault();

    if(e.deltaY < 0){

        currentScale += 0.15;

    }else{

        currentScale -= 0.15;

    }

    currentScale = Math.max(1, Math.min(currentScale,5));

    updateTransform();

});

/*-----------------------------------
DOUBLE CLICK
-----------------------------------*/

lightboxImg.addEventListener("dblclick",function(){

    if(currentScale===1){

        currentScale=2;

    }else{

        currentScale=1;

        translateX=0;

        translateY=0;

    }

    updateTransform();

});

/*-----------------------------------
DRAG IMAGE
-----------------------------------*/

let dragging=false;

let startX=0;

let startY=0;

lightboxImg.addEventListener("mousedown",(e)=>{

    if(currentScale<=1) return;

    dragging=true;

    startX=e.clientX-translateX;

    startY=e.clientY-translateY;

    lightboxImg.style.cursor="grabbing";

});

document.addEventListener("mousemove",(e)=>{

    if(!dragging) return;

    translateX=e.clientX-startX;

    translateY=e.clientY-startY;

    updateTransform();

});

document.addEventListener("mouseup",()=>{

    dragging=false;

    lightboxImg.style.cursor="grab";

});

/*-----------------------------------
PREVENT IMAGE DRAG
-----------------------------------*/

lightboxImg.addEventListener("dragstart",function(e){

    e.preventDefault();

});

/*=========================================================
    END OF PART 2
=========================================================*/
/*=========================================================
    PART 3 OF 4
    VIDEO & PAGE ENHANCEMENTS
=========================================================*/


/*=========================================================
    VIDEO AUTO PLAY / PAUSE
=========================================================*/

const videos = document.querySelectorAll("video");

const videoObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const video = entry.target;

        if (entry.isIntersecting) {

            video.setAttribute("playsinline", "");

        } else {

            video.pause();

        }

    });

}, {

    threshold: 0.5

});

videos.forEach(video => {

    videoObserver.observe(video);

});


/*=========================================================
    LAZY LOAD IMAGES
=========================================================*/

const lazyImages = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const image = entry.target;

        image.classList.add("loaded");

        observer.unobserve(image);

    });

}, {

    threshold: 0.15

});

lazyImages.forEach(image => {

    imageObserver.observe(image);

});


/*=========================================================
    BACK TO TOP BUTTON
=========================================================*/

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "backToTop";

document.body.appendChild(topButton);

Object.assign(topButton.style, {

    position: "fixed",

    bottom: "35px",

    right: "35px",

    width: "55px",

    height: "55px",

    borderRadius: "50%",

    border: "none",

    background: "#2563eb",

    color: "#fff",

    fontSize: "24px",

    cursor: "pointer",

    display: "none",

    zIndex: "9999",

    boxShadow: "0 10px 30px rgba(0,0,0,.35)",

    transition: ".3s"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=========================================================
    SCROLL PROGRESS BAR
=========================================================*/

const progressBar = document.createElement("div");

progressBar.id = "scrollProgress";

document.body.appendChild(progressBar);

Object.assign(progressBar.style, {

    position: "fixed",

    top: "0",

    left: "0",

    height: "4px",

    width: "0%",

    background: "#2563eb",

    zIndex: "10000",

    transition: "width .1s linear"

});

window.addEventListener("scroll", () => {

    const winScroll = document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight -

                   document.documentElement.clientHeight;

    const progress = (winScroll / height) * 100;

    progressBar.style.width = progress + "%";

});


/*=========================================================
    IMAGE FADE-IN
=========================================================*/

lazyImages.forEach(img => {

    img.style.opacity = "0";

    img.style.transition = ".6s";

});

const fadeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

        }

    });

}, {

    threshold: 0.1

});

lazyImages.forEach(img => {

    fadeObserver.observe(img);

});


/*=========================================================
    CARD LIFT EFFECT
=========================================================*/

const hoverCards = document.querySelectorAll(

    ".gallery-card, .prototype-card, .video-card"

);

hoverCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.transformOrigin = `${x}px ${y}px`;

    });

});


/*=========================================================
    PAGE TITLE ANIMATION
=========================================================*/

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {

    heroTitle.animate([

        {

            opacity: 0,

            transform: "translateY(30px)"

        },

        {

            opacity: 1,

            transform: "translateY(0px)"

        }

    ], {

        duration: 900,

        easing: "ease-out"

    });

}


/*=========================================================
    CONSOLE SIGNATURE
=========================================================*/

console.log(
"%cPlanetary Gearbox Drive Portfolio",
"color:#2563eb;font-size:18px;font-weight:bold;"
);

console.log(
"%cDesigned by Rafael Ramirez",
"color:#22c55e;font-size:14px;"
);


/*=========================================================
    END OF PART 3
=========================================================*/
/*=========================================================
    PART 4 OF 4
    SECURITY DETERRENTS & FINAL INITIALIZATION
=========================================================*/


/*=========================================================
    DISABLE RIGHT CLICK
=========================================================*/

document.addEventListener("contextmenu", function (e) {

    e.preventDefault();

});


/*=========================================================
    DISABLE COMMON SHORTCUTS
=========================================================*/

document.addEventListener("keydown", function (e) {

    const key = e.key.toLowerCase();

    // F12
    if (e.key === "F12") {

        e.preventDefault();

        return;

    }

    // Ctrl + S
    if (e.ctrlKey && key === "s") {

        e.preventDefault();

        return;

    }

    // Ctrl + P
    if (e.ctrlKey && key === "p") {

        e.preventDefault();

        return;

    }

    // Ctrl + U
    if (e.ctrlKey && key === "u") {

        e.preventDefault();

        return;

    }

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && key === "i") {

        e.preventDefault();

        return;

    }

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && key === "j") {

        e.preventDefault();

        return;

    }

    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && key === "c") {

        e.preventDefault();

        return;

    }

});


/*=========================================================
    PREVENT IMAGE DRAGGING
=========================================================*/

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

    img.addEventListener("dragstart", function (e) {

        e.preventDefault();

    });

});


/*=========================================================
    DISABLE TEXT SELECTION
=========================================================*/

document.addEventListener("selectstart", function (e) {

    e.preventDefault();

});


/*=========================================================
    PDF VIEWER SETTINGS
=========================================================*/

document.querySelectorAll(".pdf-viewer").forEach(pdf => {

    const src = pdf.getAttribute("src");

    if (src && !src.includes("#toolbar=0")) {

        pdf.setAttribute(
            "src",
            src + "#toolbar=0&navpanes=0&scrollbar=1"
        );

    }

});


/*=========================================================
    PREVENT DOUBLE-TAP IMAGE DRAG
=========================================================*/

document.querySelectorAll(".zoomable").forEach(image => {

    image.addEventListener("mousedown", function (e) {

        if (e.detail > 1) {

            e.preventDefault();

        }

    });

});


/*=========================================================
    RESET LIGHTBOX WHEN WINDOW RESIZES
=========================================================*/

window.addEventListener("resize", function () {

    if (typeof resetImageTransform === "function") {

        resetImageTransform();

    }

});


/*=========================================================
    SIMPLE PAGE LOADER
=========================================================*/

window.addEventListener("load", function () {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity 0.5s ease";

    requestAnimationFrame(() => {

        document.body.style.opacity = "1";

    });

});


/*=========================================================
    SCROLL TO HASH ON INITIAL LOAD
=========================================================*/

window.addEventListener("load", function () {

    if (window.location.hash) {

        const target = document.querySelector(window.location.hash);

        if (target) {

            setTimeout(() => {

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }, 300);

        }

    }

});


/*=========================================================
    UTILITY: DEBOUNCE
=========================================================*/

function debounce(func, delay) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}


/*=========================================================
    DEBOUNCED SCROLL EVENTS
=========================================================*/

window.addEventListener(
    "scroll",
    debounce(() => {

        // Reserved for future enhancements

    }, 50)
);


/*=========================================================
    FINAL STARTUP MESSAGE
=========================================================*/

console.log(
    "%cPortfolio Ready",
    "color:#22c55e;font-size:16px;font-weight:bold;"
);

console.log(
    "%cPlanetary Gearbox Drive loaded successfully.",
    "color:#60a5fa;font-size:14px;"
);


/*=========================================================
    END OF SCRIPT
=========================================================*/
