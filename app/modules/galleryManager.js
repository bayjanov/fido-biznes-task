import { CONFIG } from "./config.js";

export class GalleryManager {
  constructor(propertyManager) {
    this.propertyManager = propertyManager;
    this.setupNavigationListeners();
  }

  initializeGallery(images) {
    const mainImage = document.getElementById("mainImage");
    if (mainImage && images && images.length > 0) {
      mainImage.src = images[0];
      this.displayImageGroup(0, images);
    }

    this.setupRoomTypeListeners();
  }

  setupNavigationListeners() {
    const nextButton = document.querySelector(".nav-arrow.nav-next");
    const prevButton = document.querySelector(".nav-arrow.nav-prev");

    if (nextButton) {
      nextButton.addEventListener("click", () => this.moveGrid(1));
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => this.moveGrid(-1));
    }
  }

  setupRoomTypeListeners() {
    document.querySelectorAll(".type-links a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const type = e.target.getAttribute("onclick").match(/'(.+)'/)[1];
        this.propertyManager.changeRoomType(type);
        this.updateGallery();
      });
    });
  }

  moveGrid(direction) {
    const images = this.propertyManager.getDisplayImages();
    const totalGroups = Math.ceil(images.length / CONFIG.imagesPerGroup);
    let newGroupIndex = this.propertyManager.currentGroupIndex + direction;

    // Handle wrap-around
    if (newGroupIndex >= totalGroups) newGroupIndex = 0;
    if (newGroupIndex < 0) newGroupIndex = totalGroups - 1;

    this.propertyManager.setGroupIndex(newGroupIndex);
    this.displayImageGroup(newGroupIndex, images);
  }

  displayImageGroup(groupIndex, images) {
    const thumbnailGrid = document.querySelector(".thumbnail-grid");
    if (!thumbnailGrid || !images) return;

    thumbnailGrid.innerHTML = "";

    const startIndex = groupIndex * CONFIG.imagesPerGroup;
    const endIndex = Math.min(
      startIndex + CONFIG.imagesPerGroup,
      images.length
    );

    for (let i = startIndex; i < endIndex; i++) {
      const thumbnail = document.createElement("img");
      thumbnail.src = images[i];
      thumbnail.alt = `Image ${i + 1}`;
      thumbnail.className = "thumbnail";
      if (i === this.propertyManager.currentImageIndex) {
        thumbnail.classList.add("selected");
      }
      thumbnail.addEventListener("click", () => this.changeImage(i, images));
      thumbnailGrid.appendChild(thumbnail);
    }
  }

  changeImage(index, images) {
    if (!images) return;

    this.propertyManager.setImageIndex(index);
    const mainImage = document.getElementById("mainImage");
    if (mainImage) {
      mainImage.src = images[index];
    }

    this.updateThumbnailSelection();
  }

  updateThumbnailSelection() {
    document.querySelectorAll(".thumbnail").forEach((thumb, idx) => {
      const actualIndex =
        this.propertyManager.currentGroupIndex * CONFIG.imagesPerGroup + idx;
      thumb.classList.toggle(
        "selected",
        actualIndex === this.propertyManager.currentImageIndex
      );
    });
  }

  updateGallery() {
    const images = this.propertyManager.getDisplayImages();
    this.initializeGallery(images);

    const type = this.propertyManager.currentRoomType;
    const selectedLink = document.querySelector(
      `.type-links a[onclick*='${type}']`
    );
    if (selectedLink) {
      document.querySelector(".room-type").textContent =
        selectedLink.textContent;
    }
  }
}
