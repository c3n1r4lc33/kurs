<template>
  <div class="gallery">
    <div class="slider-container">
      <div class="slider" ref="slider">
        <div
          class="slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="['pb-col' + slide.column]"
          ref="slides"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeaveSlide(index)"
          @click="handleCta(index)"
        >
          <div
            class="slide-image"
            :style="{ backgroundImage: `url(${slide.image})` }"
            :class="{ loaded: slide.loaded }"
            ref="slideImages"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              loading="lazy"
              @load="slide.loaded = true"
              style="display: none"
            />
          </div>
        </div>
      </div>
      <div class="preview-dots">
        <span
          class="dot"
          v-for="(slide, index) in slides"
          :key="index"
          @click="handleCta(index)"
          @mouseenter="animateDotEnter(index)"
          @mouseleave="animateDotLeave(index)"
          :style="{ backgroundImage: `url(${slide.thumbnail})` }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "GalleryVue",
  data() {
    return {
      slides: [
        // Колонка 0
        {
          image: "/images/Roses.jpg",
          thumbnail: "/images/flow.jpg",
          title: "Нежные розы",
          ctaLink: "/catalog",
          loaded: false,
          column: 0,
        },
        {
          image: "/images/pin10.jpg",
          thumbnail: "/images/pin11.jpg",
          title: "Золотая осень",
          ctaLink: "/catalog",
          loaded: false,
          column: 0,
        },
        {
          image: "/images/kit3.jpg",
          thumbnail: "/images/kit4.jpg",
          title: "Романтика",
          ctaLink: "/catalog",
          loaded: false,
          column: 0,
        },
        {
          image: "/images/new1.jpg",
          thumbnail: "/images/new2.jpg",
          title: "Тропический закат",
          ctaLink: "/catalog",
          loaded: false,
          column: 0,
        },
        // Колонка 1
        {
          image: "/images/pin10.jpg",
          thumbnail: "/images/pin11.jpg",
          title: "Золотая осень 2",
          ctaLink: "/catalog",
          loaded: false,
          column: 1,
        },
        {
          image: "/images/kit3.jpg",
          thumbnail: "/images/kit4.jpg",
          title: "Романтика 2",
          ctaLink: "/catalog",
          loaded: false,
          column: 1,
        },
        {
          image: "/images/new1.jpg",
          thumbnail: "/images/new2.jpg",
          title: "Тропический закат 2",
          ctaLink: "/catalog",
          loaded: false,
          column: 1,
        },
        {
          image: "/images/Roses.jpg",
          thumbnail: "/images/flow.jpg",
          title: "Нежные розы 2",
          ctaLink: "/catalog",
          loaded: false,
          column: 1,
        },
        // Колонка 2
        {
          image: "/images/new1.jpg",
          thumbnail: "/images/new2.jpg",
          title: "Тропический закат 3",
          ctaLink: "/catalog",
          loaded: false,
          column: 2,
        },
        {
          image: "/images/Roses.jpg",
          thumbnail: "/images/flow.jpg",
          title: "Нежные розы 3",
          ctaLink: "/catalog",
          loaded: false,
          column: 2,
        },
        {
          image: "/images/pin10.jpg",
          thumbnail: "/images/pin11.jpg",
          title: "Золотая осень 3",
          ctaLink: "/catalog",
          loaded: false,
          column: 2,
        },
        {
          image: "/images/kit3.jpg",
          thumbnail: "/images/kit4.jpg",
          title: "Романтика 3",
          ctaLink: "/catalog",
          loaded: false,
          column: 2,
        },
      ],
      isZooming: false,
    };
  },
  mounted() {
    gsap.ticker.lagSmoothing(1000, 33); // Оптимизация для плавности
    this.initializeSlides();
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
    this.slides.forEach((slide) => {
      if (slide.tl) slide.tl.kill();
    });
  },
  methods: {
    initializeSlides() {
      gsap.set(".gallery", { perspective: 800 });
      gsap.set(".slider", {
        left: "75%",
        xPercent: -50,
        width: 1200,
        rotationX: 14,
        rotationY: -15,
        rotationZ: 10,
      });
      gsap.set(".slide", { opacity: 1, cursor: "pointer" });
      gsap.fromTo(
        ".gallery",
        { autoAlpha: 0 },
        { duration: 0.6, ease: "power2.inOut", autoAlpha: 1 }
      );

      this.slides.forEach((slide, i) => {
        const column = slide.column;
        const b = this.$refs.slides[i];
        gsap.set(b, {
          x: [60, 280, 500][column],
          width: 400,
          height: 640,
          borderRadius: 20,
          scale: 0.5,
          zIndex: 1,
        });

        slide.tl = gsap
          .timeline({ paused: true, repeat: -1 })
          .fromTo(
            b,
            { y: [-575, 800, 800][column], rotation: -0.05 },
            {
              duration: [40, 35, 26][column],
              y: [800, -575, -575][column],
              rotation: 0.05,
              ease: "none",
            }
          )
          .progress((i % 4) / 4);

        slide.tl.play();
      });
    },
    pauseColumn(column) {
      this.slides.forEach((slide, i) => {
        if (slide.column === column) {
          gsap.to(this.$refs.slides[i].tl, { timeScale: 0, ease: "sine" });
        }
      });
    },
    playColumns() {
      this.slides.forEach((slide, i) => {
        const tl = this.$refs.slides[i].tl;
        tl.play();
        gsap.to(tl, {
          duration: 0.4,
          timeScale: 1,
          ease: "sine.in",
          overwrite: true,
        });
      });
    },
    handleMouseEnter(index) {
      if (this.isZooming) return;
      const slide = this.$refs.slides[index];
      this.pauseColumn(this.slides[index].column);
      gsap.to(".slide", {
        duration: 0.2,
        overwrite: "auto",
        opacity: (i, t) => (t === slide ? 1 : 0.33),
      });
      gsap.fromTo(
        slide,
        { zIndex: 100 },
        { duration: 0.2, scale: 0.62, overwrite: "auto", ease: "power3" }
      );
    },
    handleMouseLeaveSlide(index) {
      if (this.isZooming) return;
      const slide = this.$refs.slides[index];
      this.playColumns();
      gsap
        .timeline()
        .set(slide, { zIndex: 1 })
        .to(
          slide,
          { duration: 0.3, scale: 0.5, overwrite: "auto", ease: "expo" },
          0
        )
        .to(".slide", { duration: 0.5, opacity: 1, ease: "power2.inOut" }, 0);
    },
    handleCta(index) {
      if (!this.isZooming) {
        this.isZooming = true;
        const slide = this.$refs.slides[index];
        gsap
          .timeline({
            defaults: { duration: 0.6, ease: "expo.inOut" },
            onComplete: () => {
              this.isZooming = false;
              this.$router.push(this.slides[index].ctaLink);
            },
          })
          .set(slide, { zIndex: 100 })
          .to(".slide", { opacity: 0 }, 0)
          .to(
            slide,
            {
              width: "100%",
              height: "100%",
              borderRadius: 0,
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            },
            0
          )
          .to(
            ".slider",
            {
              duration: 0.5,
              left: "50%",
              width: "100%",
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
            },
            0.15
          )
          .to(".slider", { duration: 1, scale: 1.06, ease: "none" }, 0.65);
      }
    },
    handleKeydown(event) {
      // Можно добавить управление клавиатурой, если нужно
    },
    animateDotEnter(index) {
      gsap.to(`.preview-dots .dot:nth-child(${index + 1})`, {
        scale: 1.25,
        boxShadow: `0 0 14px var(--accent-color)`,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    },
    animateDotLeave(index) {
      gsap.to(`.preview-dots .dot:nth-child(${index + 1})`, {
        scale: 1,
        boxShadow: `0 0 6px var(--shadow-color)`,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    },
  },
};
</script>

<style scoped>
.gallery {
  background: var(--bg-color);
  width: 90%;
  height:100%;
  max-height: 880px;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.slider {
  width: 1200px;
  height: 100%;
  position: relative;
  user-select: none;
}

.slide {
  position: absolute;
  width: 400px;
  height: 640px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 40px var(--shadow-color);
  opacity: 1;
  cursor: pointer;
  will-change: transform, opacity;
}

.slide-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  will-change: transform;
}

.slide-image.loaded {
  opacity: 1;
}

.preview-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.dot {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 6px var(--shadow-color);
  border: 2px solid rgba(255, 255, 255, 0.3);
  will-change: transform;
}

.dark-theme .slide {
  background: rgba(0, 0, 0, 0.3);
}

.dark-theme .dot {
  border-color: rgba(255, 255, 255, 0.4);
}

.dark-theme .dot.active {
  border-color: var(--accent-color);
}

@media (max-width: 768px) {
  .gallery,
  .slider-container,
  .preview-dots {
    display: none;
  }
}
</style>
