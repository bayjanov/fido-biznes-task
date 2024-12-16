import { CONFIG } from "./modules/config.js";
import { PropertyApi } from "./modules/api.js";
import { PropertyManager } from "./modules/propertyManager.js";
import { PropertyRenderer } from "./modules/renderers.js";
import { GalleryManager } from "./modules/galleryManager.js";
import { ModalManager } from "./modules/modalManager.js";

class PropertyApp {
  constructor() {
    this.propertyManager = new PropertyManager();
    this.renderer = new PropertyRenderer(this.propertyManager);
    this.galleryManager = new GalleryManager(this.propertyManager);
    this.modalManager = new ModalManager(this.propertyManager);

    this.initializeEventListeners();
  }

  async initialize() {
    try {
      const properties = await PropertyApi.fetchProperties();
      const propertyId =
        new URLSearchParams(window.location.search).get("id") ||
        properties[0].id;
      const currentProperty =
        properties.find((p) => p.id === propertyId) || properties[0];

      this.propertyManager.setCurrentProperty(currentProperty);
      this.renderer.renderPropertyDetails(currentProperty);
      this.galleryManager.initializeGallery(
        currentProperty.images[CONFIG.defaultRoomType]
      );
      this.renderer.renderSimilarProperties(
        properties.filter((p) => p.id !== propertyId)
      );

      this.setupSpecificRedirects();
    } catch (error) {
      console.error("Failed to initialize app:", error);
    }
  }

  setupSpecificRedirects() {
    const actionsDiv = document.querySelector(".actions");
    if (actionsDiv) {
      actionsDiv.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = "/404.html";
        });
      });
    }
  }

  initializeEventListeners() {
    window.addEventListener("load", () => this.initialize());

    // functions available globally
    window.openModal = () => this.modalManager.openModal();
    window.closeModal = () => this.modalManager.closeModal();
    window.changeRoomType = (type) => {
      this.propertyManager.changeRoomType(type);
      this.galleryManager.updateGallery();
    };
  }
}

const app = new PropertyApp();
