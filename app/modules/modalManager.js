export class ModalManager {
  constructor(propertyManager) {
    this.propertyManager = propertyManager;
  }

  openModal() {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const currentProperty = this.propertyManager.getCurrentProperty();

    if (modal && modalImage && currentProperty) {
      const images = this.propertyManager.getDisplayImages();
      modalImage.src = images[this.propertyManager.currentImageIndex];
      modal.style.display = "block";
    }
  }

  closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
