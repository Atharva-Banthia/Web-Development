
/* =================================
   SAURABH & ROLI
   WEBSITE INTERACTIONS
================================= */


// =================================
// 1. ENVELOPE OPENING
// =================================

const envelopeScreen =
    document.getElementById("envelopeScreen");

const envelope =
    document.getElementById("envelope");

const openInvitation =
    document.getElementById("openInvitation");

const mainWebsite =
    document.getElementById("mainWebsite");


openInvitation.addEventListener("click", () => {

    envelope.classList.add("open");

    openInvitation.disabled = true;
    openInvitation.textContent = "Opening your story...";

    setTimeout(() => {

        envelopeScreen.classList.add("fade-out");

        mainWebsite.classList.remove("hidden");

        document.body.classList.remove("no-scroll");

        window.scrollTo(0, 0);

    }, 1100);

    setTimeout(() => {

        envelopeScreen.style.display = "none";

    }, 2200);

});


// =================================
// 2. DYNAMIC PHOTO GALLERY
// =================================

const photoGrid =
    document.getElementById("photoGrid");

const photos = [
    {
        src: "images/wedding.jpg",
        title: "The Beginning",
        category: "THE WEDDING DAY",
        layout: "large"
    },
    {
        src: "images/memory1.jpg",
        title: "Beautiful Together",
        category: "MEMORY 02"
    },
    {
        src: "images/memory2.jpg",
        title: "Pure Happiness",
        category: "MEMORY 03"
    },
    {
        src: "images/memory3.jpg",
        title: "Little Joys",
        category: "MEMORY 04"
    },
    {
        src: "images/memory4.jpg",
        title: "Always Us",
        category: "MEMORY 05"
    },
    {
        src: "images/memory5.jpg",
        title: "Timeless Love",
        category: "MEMORY 06",
        layout: "tall"
    },
    {
        src: "images/memory6.jpg",
        title: "Smiles Forever",
        category: "MEMORY 07"
    },
    {
        src: "images/memory7.jpg",
        title: "Special Days",
        category: "MEMORY 08"
    },
    {
        src: "images/memory8.jpg",
        title: "Our Happiness",
        category: "MEMORY 09"
    },
    {
        src: "images/memory9.jpg",
        title: "Forever Memories",
        category: "MEMORY 10"
    },
    {
        src: "images/memory10.jpg",
        title: "Together Always",
        category: "MEMORY 11"
    },
    {
        src: "images/memory11.jpg",
        title: "Beautiful Days",
        category: "MEMORY 12"
    },
    {
        src: "images/memory12.jpg",
        title: "Precious Moments",
        category: "MEMORY 13"
    },
    {
        src: "images/memory13.jpg",
        title: "Endless Smiles",
        category: "MEMORY 14"
    },
    {
        src: "images/memory14.jpg",
        title: "A Lifetime of Love",
        category: "MEMORY 15"
    },
    {
        src: "images/memory15.jpg",
        title: "Our Favourite Story",
        category: "MEMORY 16"
    },
    {
        src: "images/family.jpg",
        title: "Family Is Everything",
        category: "OUR LITTLE WORLD",
        layout: "large"
    }
];

let availablePhotos = [];


photos.forEach((photo) => {

    const card = document.createElement("div");

    card.className =
        "gallery-item " + (photo.layout || "");

    const image = document.createElement("img");

    image.src = photo.src;
    image.alt = photo.title;
    image.loading = "lazy";

    const caption = document.createElement("div");

    caption.className = "photo-caption";

    const category = document.createElement("span");
    category.textContent = photo.category;

    const title = document.createElement("h3");
    title.textContent = photo.title;

    caption.appendChild(category);
    caption.appendChild(title);

    card.appendChild(image);
    card.appendChild(caption);

    photoGrid.appendChild(card);

    image.addEventListener("error", () => {
        card.remove();
    });

    image.addEventListener("load", () => {
        if (!availablePhotos.includes(photo)) {
            availablePhotos.push(photo);
        }
    });

    card.addEventListener("click", () => {

        const index = availablePhotos.indexOf(photo);

        if (index !== -1) {
            showPhoto(index);
        }

    });

});


// =================================
// 3. FULL-SCREEN PHOTO VIEWER
// =================================

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousPhoto =
    document.getElementById("previousPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");

let currentPhoto = 0;


function showPhoto(index) {

    if (availablePhotos.length === 0) return;

    currentPhoto =
        (index + availablePhotos.length) %
        availablePhotos.length;

    const photo = availablePhotos[currentPhoto];

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.title;

    lightboxCaption.textContent =
        photo.title + " · " + photo.category;

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");

}


function closeViewer() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

}


closeLightbox.addEventListener("click", closeViewer);


previousPhoto.addEventListener("click", () => {

    showPhoto(currentPhoto - 1);

});


nextPhoto.addEventListener("click", () => {

    showPhoto(currentPhoto + 1);

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeViewer();
    }

});


document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeViewer();
    }

    if (event.key === "ArrowRight") {
        showPhoto(currentPhoto + 1);
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentPhoto - 1);
    }

});


// =================================
// 4. BACKGROUND MUSIC
// =================================

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicPlaying = false;


musicButton.addEventListener("click", async () => {

    try {

        if (!musicPlaying) {

            await backgroundMusic.play();

            musicPlaying = true;

            musicButton.textContent = "♫ Music On";

        } else {

            backgroundMusic.pause();

            musicPlaying = false;

            musicButton.textContent = "♫ Music Off";

        }

    } catch (error) {

        musicButton.textContent = "Music unavailable";

    }

});


// =================================
// 5. SURPRISE MESSAGE
// =================================

const surpriseButton =
    document.getElementById("surpriseButton");

const secretMessage =
    document.getElementById("secretMessage");


surpriseButton.addEventListener("click", () => {

    const isHidden =
        secretMessage.classList.toggle("hidden");

    if (isHidden) {

        surpriseButton.textContent =
            "Reveal Your Surprise ♥";

    } else {

        surpriseButton.textContent =
            "Close Surprise ♥";

        createHearts();

        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

});


// =================================
// 6. FLOATING HEARTS
// =================================

function createHearts() {

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement("div");

        heart.textContent = "♥";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-40px";

        heart.style.zIndex = "2500";

        heart.style.pointerEvents = "none";

        heart.style.color =
            Math.random() > 0.5 ? "#bd7890" : "#c49b62";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.transition =
            "transform 3.5s ease, opacity 3.5s ease";

        document.body.appendChild(heart);

        requestAnimationFrame(() => {

            heart.style.transform =
                `translateY(-${window.innerHeight + 100}px) rotate(360deg)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {

            heart.remove();

        }, 3600);

    }

}


// =================================
// 7. WELCOME MESSAGE
// =================================

console.log(
    "♥ Welcome to Saurabh & Roli's Anniversary Website ♥"
);

console.log(
    "24 November 2012 — Forever & Always"
);
