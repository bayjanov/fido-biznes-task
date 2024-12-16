export class SimilarPropertyManger {
  constructor(config = {}) {
    this.config = {
      cardsPerView: 3,
      slideTransitionMs: 300,
      ...config,
    };

    this.currentSlide = 0;
    this.totalSlides = 0;

    this.track = null;
    this.cards = null;
    this.prevButton = null;
    this.nextButton = null;
  }

  init(
    trackSelector = ".carousel-track",
    navigationConfig = {
      prevSelector: ".carousel-nav.prev",
      nextSelector: ".carousel-nav.next",
    }
  ) {
    
    this.track = document.querySelector(trackSelector);
    if (!this.track) return;

    this.setupNavigation(navigationConfig);
    this.updateState();
    this.render();
    this.setupResizeHandler();

    return this;
  }

  updateState() {
    this.cards = this.track.querySelectorAll(".property-card");
    this.totalSlides = Math.max(
      0,
      this.cards.length - this.config.cardsPerView
    );
  }

  setupNavigation({ prevSelector, nextSelector }) {
    this.prevButton = document.querySelector(prevSelector);
    this.nextButton = document.querySelector(nextSelector);

    if (this.prevButton) {
      this.prevButton.addEventListener("click", () => this.move(-1));
    }

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => this.move(1));
    }
  }

  setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.render(), 100);
    });
  }

  move(direction) {
    const newPosition = this.currentSlide + direction;
    if (newPosition >= 0 && newPosition <= this.totalSlides) {
      this.currentSlide = newPosition;
      this.render();
    }
  }

  render() {
    if (!this.track || !this.cards.length) return;

    const cardWidth = this.cards[0].offsetWidth + 16;

    this.track.style.transform = `translateX(-${
      this.currentSlide * cardWidth
    }px)`;

    this.updateNavigationState();
  }

  updateNavigationState() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentSlide === 0;
    }
    if (this.nextButton) {
      this.nextButton.disabled = this.currentSlide === this.totalSlides;
    }
  }

  reset() {
    this.currentSlide = 0;
    if (this.track) {
      this.track.style.transform = "translateX(0)";
      this.updateState();
      this.render();
    }
  }
}
