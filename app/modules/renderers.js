import { CONFIG } from "./config.js";

export class PropertyRenderer {
  constructor(propertyManager) {
    this.propertyManager = propertyManager;
    this.currentCarouselIndex = 0;
    this.itemsPerSlide = 4; 
  }

  renderPropertyDetails(property) {
    this.renderMainInfo(property);
    this.renderLocation(property);
    this.renderAgentInfo(property);
    this.renderApartmentDetails(property);
    this.renderPropertyTables(property);
  }

  renderMainInfo(property) {
    document.querySelector(".title").textContent = property.title;
    document.querySelector(".id").textContent = `№ ${property.id}`;
    document.querySelector(
      ".views"
    ).textContent = `Просмотров: ${property.views}`;
    document.querySelector(
      ".date"
    ).textContent = `Опубликовано: ${property.publishDate}`;
    document.querySelector(
      ".expiry"
    ).textContent = `Активно до: ${property.expiryDate}`;
    document.querySelector(
      ".price"
    ).textContent = `${property.price} ${property.currency}`;
  }

  renderLocation(property) {
    const addressList = document.querySelector(".address ul");
    if (addressList) {
      addressList.innerHTML = Object.values(property.location)
        .map((loc) => `<li><a href="#">${loc}</a></li>`)
        .join("");
    }
  }

  renderAgentInfo(property) {
    const agentPhoto = document.querySelector(".agent-photo");
    if (agentPhoto) {
      agentPhoto.src = property.agent.photo;
      agentPhoto.alt = property.agent.name;
    }

    document.querySelector(".agent-name span").textContent =
      property.agent.name;

    const [phone1, phone2] = property.agent.phones;
    document.querySelector(".phone1").textContent = phone1;
    document.querySelector(".phone2").textContent = phone2;

    const emailLink = document.querySelector(".agent-email");
    emailLink.textContent = property.agent.email;
    emailLink.href = `mailto:${property.agent.email}`;
  }

  renderApartmentDetails(property) {
    const { details } = property;
    document.querySelector(
      ".apartment-details"
    ).textContent = `${details.rooms} комн. / ${details.floor} этаж (${details.totalFloors}) / ${details.area} кв.м. / ${details.type}`;

    document.querySelector(".apartment-description").textContent =
      details.description;
  }

  renderPropertyTables(property) {
    this.renderMainInfoTable(property.buildingInfo);
    this.renderFinancialTable(property.financialInfo);
  }

  renderMainInfoTable(buildingInfo) {
    const mainTable = document.getElementById("main-info-table");
    if (mainTable) {
      mainTable.innerHTML = this.createInfoTable(
        buildingInfo,
        CONFIG.tableConfigs.main
      );
    }
  }

  renderFinancialTable(financialInfo) {
    const financialTable = document.getElementById("financial-info-table");
    if (financialTable) {
      financialTable.innerHTML = this.createInfoTable(
        financialInfo,
        CONFIG.tableConfigs.financial
      );
    }
  }

  createInfoTable(data, config) {
    return `
      <table>
        ${config
          .map(
            (item) => `
          <tr>
            <td>${item.label}</td>
            <td>${this.formatTableValue(data[item.key])}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;
  }

  formatTableValue(value) {
    if (value === undefined || value === null) return "-";
    if (typeof value === "boolean") return value ? "Да" : "Нет";
    return value.toString();
  }

  createPropertyCard(property) {
    return `
      <div class="property-card" data-id="${property.id}">
        <div class="property-image">
          <img src="${property.images.living[0]}" alt="${property.title}" />
          <span class="photo-count blue-arrow-bg">${
            Object.values(property.images).flat().length
          } фото</span>
        </div>
        <div class="property-info">
          <a href="?id=${property.id}" class="property-title">${
      property.title
    }</a>
          <p class="property-details">
            ${property.details.rooms} комн. / ${property.details.floor} этаж (${
      property.details.totalFloors
    }) / 
            ${property.details.area} кв.м. / ${property.details.type}
          </p>
          <p class="property-price">${property.price} ${property.currency}</p>
        </div>
      </div>
    `;
  }

  setupPropertyCardListeners() {
    document.querySelectorAll(".property-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const propertyId = card.dataset.id;
        window.location.href = `?id=${propertyId}`;
      });
    });
  }

  renderSimilarProperties(properties) {
    const track = document.querySelector(".carousel-track");
    if (!track) return;

    // Reset carousel position
    this.currentCarouselIndex = 0;
    track.style.transform = "translateX(0)";

    track.innerHTML = properties
      .slice(0, 5)
      .map((property) => this.createPropertyCard(property))
      .join("");

    this.setupCarouselControls();
    this.setupPropertyCardListeners();
  }

  setupCarouselControls() {
    const prevButton = document.querySelector(".carousel-nav.prev");
    const nextButton = document.querySelector(".carousel-nav.next");
    const track = document.querySelector(".carousel-track");
    const cards = track.querySelectorAll(".property-card");

    // update button states initially
    this.updateCarouselButtons(prevButton, nextButton, cards.length);

    prevButton.addEventListener("click", () => {
      this.moveCarousel(-1, cards.length, prevButton, nextButton);
    });

    nextButton.addEventListener("click", () => {
      this.moveCarousel(1, cards.length, prevButton, nextButton);
    });
  }

  moveCarousel(direction, totalCards, prevButton, nextButton) {
    const track = document.querySelector(".carousel-track");

    const newIndex = this.currentCarouselIndex + direction;

    if (newIndex >= 0 && newIndex <= totalCards - this.itemsPerSlide) {
      this.currentCarouselIndex = newIndex;

      // property card area - each card takes up (100 / itemsPerSlide)% of the visible area
      const movePercentage = -(
        this.currentCarouselIndex *
        (100 / this.itemsPerSlide)
      );

      track.style.transform = `translateX(${movePercentage}%)`;

      this.updateCarouselButtons(prevButton, nextButton, totalCards);
    }
  }

  updateCarouselButtons(prevButton, nextButton, totalCards) {
    prevButton.disabled = this.currentCarouselIndex === 0;

    // Disable next button if we're at the end
    nextButton.disabled =
      this.currentCarouselIndex >= totalCards - this.itemsPerSlide;
  }
}
