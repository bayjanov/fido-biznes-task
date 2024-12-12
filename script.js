// Gallery functionality
let currentImageIndex = 0;
const images = [
  "./assets/images/room-6.jpg",
  "./assets/images/room-7.jpg",
  "./assets/images/room-8.jpg",
  "./assets/images/room-5.jpg",
];

function changeImage(index) {
  currentImageIndex = index;
  const mainImage = document.getElementById("mainImage");
  mainImage.src = images[index];

  // Update thumbnails
  document.querySelectorAll(".thumbnail").forEach((thumb, idx) => {
    if (idx === index) {
      thumb.classList.add("selected");
    } else {
      thumb.classList.remove("selected");
    }
  });
}

function navigateImages(direction) {
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  const mainImage = document.getElementById("mainImage");
  mainImage.src = images[currentImageIndex];

  // Update thumbnail selection
  document.querySelectorAll(".thumbnail").forEach((thumb, idx) => {
    if (idx === currentImageIndex) {
      thumb.classList.add("selected");
    } else {
      thumb.classList.remove("selected");
    }
  });
}

function openModal() {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = images[currentImageIndex];
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Room type changes
function changeRoomType(type) {
  // Implementation for changing room type
  console.log("Changing room type to:", type);
}

// Request and feedback functionality
function submitRequest() {
  // Implementation for submitting request
  console.log("Submitting request");
}

function recommendToFriend() {
  // Implementation for recommending to friend
  console.log("Recommending to friend");
}

function showReviews(type) {
  // Implementation for showing reviews
  console.log("Showing reviews:", type);
}

function showSimilarProperties() {
  // Implementation for showing similar properties
  console.log("Showing similar properties");
}

let currentSlide = 0;
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".property-card");
const cardsPerView = 3;
const totalSlides = Math.max(0, cards.length - cardsPerView);

function moveCarousel(direction) {
  currentSlide = Math.max(0, Math.min(currentSlide + direction, totalSlides));
  updateCarousel();
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 16; // Width + gap
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

  // Update button states
  document.querySelector(".prev").disabled = currentSlide === 0;
  document.querySelector(".next").disabled = currentSlide === totalSlides;
}

// Initialize carousel
window.addEventListener("load", () => {
  updateCarousel();
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateCarousel, 100);
});
