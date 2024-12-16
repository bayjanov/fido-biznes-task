import { CONFIG } from "./config.js";

export class PropertyManager {
  constructor() {
    this.currentProperty = null;
    this.currentImageIndex = 0;
    this.currentGroupIndex = 0;
    this.currentRoomType = CONFIG.defaultRoomType;
  }

  setCurrentProperty(property) {
    this.currentProperty = property;
  }

  getCurrentProperty() {
    return this.currentProperty;
  }

  setImageIndex(index) {
    this.currentImageIndex = index;
  }

  setGroupIndex(index) {
    this.currentGroupIndex = index;
  }

  changeRoomType(type) {
    this.currentRoomType = type;
    this.currentImageIndex = 0;
    this.currentGroupIndex = 0;
  }

  getDisplayImages() {
    if (!this.currentProperty) return [];
    return !this.currentRoomType || this.currentRoomType === "all"
      ? Object.values(this.currentProperty.images).flat()
      : this.currentProperty.images[this.currentRoomType];
  }
}
