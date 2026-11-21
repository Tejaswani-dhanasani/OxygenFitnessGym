
// ========================================
// 1. ANIMATED LOADING SCREEN
// ========================================

const preloader = document.getElementById("preloader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercent = document.getElementById("loaderPercent");

let progress = 0;

const loadingTimer = setInterval(() => {

    progress = Math.min(
        progress + Math.ceil(Math.random() * 14),
        100
    );

    loaderProgress.style.width = `${progress}%`;

    loaderPercent.textContent =
        `${String(progress).padStart(2, "0")}%`;

    if (progress >= 100) {

        clearInterval(loadingTimer);

        window.setTimeout(() => {
            preloader.classList.add("hide");
        }, 300);
    }

}, 85);


// Hide loader when page is completely loaded

window.addEventListener("load", () => {

    window.setTimeout(() => {
        preloader.classList.add("hide");
    }, 1600);

});


// ========================================
// 2. RESPONSIVE MOBILE NAVIGATION
// ========================================

const menuButton = document.getElementById("menuButton");

const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});


// Close menu after clicking navigation links

mainNav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

    });

});


// ========================================
// 3. SCROLL REVEAL ANIMATIONS
// ========================================

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


// Select all elements with reveal class

document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// ========================================
// 4. AUTOMATIC COPYRIGHT YEAR
// ========================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ========================================
// 5. WHATSAPP ENQUIRY FORM
// ========================================

const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", (event) => {

    // Prevent default form submission

    event.preventDefault();

    const form = event.currentTarget;

    // Validate form fields

    if (!form.reportValidity()) {
        return;
    }

    // Collect form data

    const data = new FormData(form);

    const name = data.get("name");

    const phone = data.get("phone");

    const interest = data.get("interest");

    const messageText = data.get("message");

    // Prepare WhatsApp message

    const message = [

        "Hello Basha Body Care!",

        "",

        `Name: ${name}`,

        `Phone: ${phone}`,

        `Interested in: ${interest}`,

        `Message: ${messageText || "Not provided"}`,

        "",

        "Please share more details. Thank you!"

    ].join("\n");


    // Show status message

    document.getElementById("formStatus").textContent =
        "Opening WhatsApp with your enquiry. Please review and send it there.";


    // Basha Body Care WhatsApp number

    const whatsappNumber = "919666820768";


    // Generate WhatsApp URL

    const whatsappLink =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    // Open WhatsApp

    window.open(
        whatsappLink,
        "_blank",
        "noopener,noreferrer"
    );

});
