<template>
  <div
    class="carousel"
    @mouseenter="pauseAutoSwipe"
    @mouseleave="resumeAutoSwipe"
  >
    <img :src="currentImage" alt="Product" loading="lazy" />
    <button class="arrow prev" @click="prevImage"><</button>
    <button class="arrow next" @click="nextImage">></button>
    <div class="thumbnails">
      <img
        v-for="(img, index) in product.images"
        :key="index"
        :src="img.replace('300x200', '80x80')"
        @click="currentIndex = index"
        :class="{ active: currentIndex === index }"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      currentIndex: 0,
      autoSwipeInterval: null,
    };
  },
  computed: {
    currentImage() {
      return this.product.images[this.currentIndex].replace(
        "300x200",
        "600x400"
      );
    },
  },
  mounted() {
    this.startAutoSwipe();
    this.addSwipeSupport();
  },
  beforeDestroy() {
    clearInterval(this.autoSwipeInterval);
  },
  methods: {
    startAutoSwipe() {
      this.autoSwipeInterval = setInterval(() => {
        this.nextImage();
      }, 4000);
    },
    pauseAutoSwipe() {
      clearInterval(this.autoSwipeInterval);
    },
    resumeAutoSwipe() {
      this.startAutoSwipe();
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.product.images.length;
    },
    prevImage() {
      this.currentIndex =
        (this.currentIndex - 1 + this.product.images.length) %
        this.product.images.length;
    },
    addSwipeSupport() {
      let touchStartX = 0;
      let touchEndX = 0;
      this.$el.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      this.$el.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) this.nextImage();
        if (touchEndX - touchStartX > 50) this.prevImage();
      });
    },
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  margin-bottom: 30px;
  overflow: hidden;
}

.carousel img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(42, 42, 42, 0.1);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(232, 217, 207, 0.7);
  border: none;
  font-size: 24px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.arrow:hover {
  background: rgba(242, 140, 140, 0.9);
  color: #e8d9cf;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
  animation-delay: calc(0.1s * var(--i));
}

.thumbnails img.active {
  border: 2px solid #f28c8c;
  opacity: 1;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.thumbnails img {
  --i: 0;
}

.thumbnails img:nth-child(1) {
  --i: 1;
}
.thumbnails img:nth-child(2) {
  --i: 2;
}

@media (max-width: 768px) {
  .carousel img {
    height: 300px;
  }
  .thumbnails img {
    width: 60px;
    height: 60px;
  }
}
</style>
