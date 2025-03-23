document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-banner-container");
    const leftArrow = document.querySelector(".scroll-left");
    const rightArrow = document.querySelector(".scroll-right");
    const dots = document.querySelectorAll(".dot");
    const scrollStep = 400;
    let autoScroll;

    function scrollLeft() {
        const isAtStart = scrollContainer.scrollLeft <= 10;
        if (isAtStart) {
            scrollContainer.scrollTo({ left: scrollContainer.scrollWidth - scrollContainer.clientWidth, behavior: "smooth" });
        } else {
            scrollContainer.scrollBy({ left: -scrollStep, behavior: "smooth" });
        }
    }

    function scrollRight() {
        const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
        if (isAtEnd) {
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
    }

    function updateDots() {
        let index = Math.round(scrollContainer.scrollLeft / scrollStep);
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index % dots.length].classList.add("active");
    }

    function autoScrollStart() {
        autoScroll = setInterval(scrollRight, 3000);
    }

    function autoScrollStop() {
        clearInterval(autoScroll);
    }

    leftArrow.addEventListener("click", scrollLeft);
    rightArrow.addEventListener("click", scrollRight);
    scrollContainer.addEventListener("scroll", updateDots);
    scrollContainer.addEventListener("mouseenter", autoScrollStop);
    scrollContainer.addEventListener("mouseleave", autoScrollStart);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            scrollContainer.scrollTo({ left: index * scrollStep, behavior: "smooth" });
        });
    });

    autoScrollStart();
});
