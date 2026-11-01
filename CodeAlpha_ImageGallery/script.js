const images = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
images.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentIndex = index;

        lightboxImg.src = image.src;

        lightbox.style.display = "flex";

    });

});
closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});
nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    lightboxImg.src = images[currentIndex].src;

});
prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex].src;

});
function filterImages(category) {

    const items = document.querySelectorAll(".gallery-item");

    items.forEach(item => {

        if (
            category === "all" ||
            item.dataset.category === category
        ) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

}