<template>
  <div
    class="product-card"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="$router.push(`/product/${product.id}`)"
    :class="{ hovered: isHovered }"
  >
    <div class="image-wrapper">
      <img
        :src="product.images[0]"
        alt="Product"
        class="default-image"
        loading="lazy"
      />
      <img
        :src="product.images[1]"
        alt="Product"
        class="hover-image"
        loading="lazy"
      />
    </div>
    <div class="content-wrapper">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} ₽</p>
      <button class="btn" @click.stop="addToCart">В корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: { product: Object },
  data() {
    return {
      isHovered: false,
      hoverTimer: null,
    };
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", { product: this.product, quantity: 1 });
    },
    onMouseEnter() {
      clearTimeout(this.hoverTimer);
      this.isHovered = true;
    },
    onMouseLeave() {
      this.hoverTimer = setTimeout(() => {
        this.isHovered = false;
      }, 100);
    },
  },
  beforeDestroy() {
    clearTimeout(this.hoverTimer);
  },
};
</script>

<style scoped>
.product-card {
  position: relative;
  width: 100%;
  height: 350px;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 4px 8px var(--shadow-color);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card.hovered {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--card-hover-shadow);
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
  transition: height 0.4s ease;
}

.product-card.hovered .image-wrapper {
  height: 100%;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.default-image {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}

.hover-image {
  opacity: 0;
  transform: scale(1.1);
  z-index: 1;
}

.product-card.hovered .default-image {
  opacity: 0;
  transform: scale(1.1);
}

.product-card.hovered .hover-image {
  opacity: 1;
  transform: scale(1);
}

.content-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background: var(--card-bg);
  transition: opacity 0.4s ease;
}

.product-card.hovered .content-wrapper {
  opacity: 0;
}

h3 {
  font-size: 18px;
  color: var(--card-text);
  font-weight: 500;
  margin: 0 0 5px;
}

p {
  font-size: 16px;
  color: var(--card-text);
  margin: 0 0 10px;
}

.btn {
  display: block;
  width: 80%;
  margin: 0 auto;
  background: var(--btn-bg-color);
  color: var(--btn-text-color);
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background: var(--btn-hover-bg-color);
  transform: scale(1.05);
}

.btn:active {
  background: var(--btn-active-bg-color);
}

@media (max-width: 768px) {
  .product-card {
    height: 300px;
  }

  .image-wrapper {
    height: 150px;
  }
}
</style>
