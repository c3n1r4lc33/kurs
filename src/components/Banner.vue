<template>
  <div class="banner" @mouseenter="pauseAutoSwipe" @mouseleave="resumeAutoSwipe">
    <div class="slides-container" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div class="slide" v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" alt="Banner" loading="lazy" />
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.text }}</p>
          <button class="btn" @click="$router.push('/catalog')">Подробнее</button>
        </div>
      </div>
    </div>
    <button class="arrow prev" @click="prevSlide"><</button>
    <button class="arrow next" @click="nextSlide">></button>
    <div class="indicators">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        { image: '/public/images/slide1.jpg', title: 'Скидка 20% на розы', text: 'Только до конца недели — дарите красоту!' },
        { image: "/public/images/slide2.webp", title: 'Новые весенние композиции', text: 'Порадуйте близких свежими идеями!' },
        { image: "/public/images/slide3.webp", title: 'Любовь в каждом лепестке', text: 'Букеты, созданные с душой.' }
      ],
      autoSwipeInterval: null,
      isAnimating: false
    };
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
        this.nextSlide();
      }, 5000);
    },
    pauseAutoSwipe() {
      clearInterval(this.autoSwipeInterval);
    },
    resumeAutoSwipe() {
      this.startAutoSwipe();
    },
    nextSlide() {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        setTimeout(() => {
          this.isAnimating = false;
        }, 800);
      }
    },
    prevSlide() {
      if (!this.isAnimating) {
        this.isAnimating = true;
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        setTimeout(() => {
          this.isAnimating = false;
        }, 800);
      }
    },
    goToSlide(index) {
      if (!this.isAnimating && index !== this.currentSlide) {
        this.isAnimating = true;
        this.currentSlide = index;
        setTimeout(() => {
          this.isAnimating = false;
        }, 800);
      }
    },
    addSwipeSupport() {
      let touchStartX = 0;
      let touchEndX = 0;
      this.$el.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      });
      this.$el.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) this.nextSlide();
        if (touchEndX - touchStartX > 50) this.prevSlide();
      });
    }
  }
};
</script>

<style scoped>
.banner {
  position: relative;
  height: 400px;
  overflow: hidden;
  margin-bottom: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(42, 42, 42, 0.1);
}

.slides-container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}

.slide:hover img {
  filter: brightness(1);
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #2A2A2A;
  background: rgba(232, 217, 207, 0.9);
  padding: 30px;
  border-radius: 15px;
  transition: transform 0.5s ease;
}

.slide-content h2 {
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 600;
  animation: slideInLeft 0.8s ease;
}

.slide-content p {
  font-size: 18px;
  animation: slideInRight 0.8s ease;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.btn {
  background: #F28C8C;
  color: #E8D9CF;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease;
}

.btn:hover {
  background: #E8B5A4;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(42, 42, 42, 0.2);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  background: #F28C8C;
  color: #E8D9CF;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.indicators span {
  width: 12px;
  height: 12px;
  background: #E8B5A4;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicators span.active {
  background: #F28C8C;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .banner {
    height: 300px;
  }
  .slide-content h2 {
    font-size: 24px;
  }
  .slide-content p {
    font-size: 16px;
  }
  .btn {
    padding: 10px 20px;
  }
}
</style>