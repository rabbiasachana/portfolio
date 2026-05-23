// SELECTORS
const navLinks = document.querySelectorAll("header nav a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navBar = document.querySelector("header nav");

// 1. MOBILE MENU TOGGLE
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navBar.classList.toggle('active');
};

// 2. SHOW BARS ANIMATION (ONLY THIS — NO HEADER RESET)
const showBarsAnimation = () => {
    const barsBox = document.querySelector('.bars-box');

    barsBox.classList.remove('active');

    setTimeout(() => {
        barsBox.classList.add('active');
    }, 100);
};

// 3. NAV LINK CLICK
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile menu
        menuIcon.classList.remove('fa-xmark');
        navBar.classList.remove('active');

        // Run animation
        showBarsAnimation();

        // Scroll to section AFTER animation starts
        setTimeout(() => {
            sections[index].scrollIntoView({
                behavior: "smooth"
            });
        }, 200);
    });
});

// 4. LOGO CLICK (HOME)
logoLink.onclick = (e) => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');

    showBarsAnimation();

    setTimeout(() => {
        sections[0].scrollIntoView({
            behavior: "smooth"
        });
    }, 200);
};

// 5. SCROLL ACTIVE NAV (IMPORTANT FIX)
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    sections.forEach((section, index) => {
        const offsetTop = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// 6. RESUME TABS
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        resumeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeDetails[idx].classList.add('active');
    });
});

// 7. PORTFOLIO CAROUSEL
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
const imgSlide = document.querySelector('.img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');

let index = 0;

const updatePortfolio = () => {
    imgSlide.style.transform = `translateX(-${index * 100}%)`;

    portfolioDetails.forEach(d => d.classList.remove('active'));
    portfolioDetails[index].classList.add('active');

    arrowLeft.classList.toggle('disabled', index === 0);
    arrowRight.classList.toggle('disabled', index === portfolioDetails.length - 1);
};

arrowRight.onclick = () => {
    if (index < portfolioDetails.length - 1) {
        index++;
        updatePortfolio();
    }
};

arrowLeft.onclick = () => {
    if (index > 0) {
        index--;
        updatePortfolio();
    }
};

// 8. INITIAL LOAD (ONLY ONCE)
window.onload = () => {
    document.querySelector("header").classList.add("active");
    document.querySelector(".bars-box").classList.add("active");
};