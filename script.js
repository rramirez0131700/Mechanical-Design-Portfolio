/* ==========================================
   Rafael Ramirez Portfolio
   script.js
========================================== */

// ==========================================
// Smooth fade-in animation
// ==========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll("section").forEach((section)=>{

    section.classList.add("hidden");

    observer.observe(section);

});

// ==========================================
// Header shadow while scrolling
// ==========================================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>40){

        header.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});

// ==========================================
// Highlight active navigation link
// ==========================================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        if(window.pageYOffset>=sectionTop){

            current=section.getAttribute("id");

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
// Project card hover animation
// ==========================================

document.querySelectorAll(".project-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px) scale(1)";

    });

});

// ==========================================
// Scroll to top button
// ==========================================

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.id="topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

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
