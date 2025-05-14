<template>
  <div class="home">
    <banner />
    <section class="categories">
      <h2>Популярные категории</h2>
      <p class="intro-text">Окунитесь в мир красоты и ароматов с нашими уникальными букетами и композициями, созданными с душой и вдохновением.</p>
      <div class="category-grid">
        <category-card title="Букеты" image="/public/images/flowers.jpg" />
        <category-card title="Композиции" image="/public/images/compos.jpg" />
        <category-card title="Подарки" image="/public/images/fines.svg" />
      </div>
    </section>
    <section class="recommendations">
      <h2>Рекомендуем</h2>
      <p class="intro-text">Выберите идеальный подарок или украшение для дома из наших самых популярных предложений.</p>
      <div class="product-grid">
        <product-card v-for="product in recommended" :key="product.id" :product="product" />
      </div>
    </section>
    <section class="new-arrivals">
      <h2>Новинки</h2>
      <p class="intro-text">Познакомьтесь с нашими свежими идеями — цветочные шедевры, которые только что появились в "Астре".</p>
      <div class="product-grid">
        <product-card v-for="product in newArrivals" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import CategoryCard from '../components/CategoryCard.vue';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: { Banner, CategoryCard, ProductCard },
  computed: {
    recommended() {
      return this.$store.state.products.slice(0, 5);
    },
    newArrivals() {
      return this.$store.state.products.filter(p => p.category === 'Новинки');
    }
  }
};
</script>

<style scoped>
:root {
  --section-text: #5A7A6F;
  --heading-color: #1d1d1f;
}

.dark-theme {
  --section-text: #C7DCD0;
  --heading-color: #ffffff;
}

.home {
  padding: 40px 20px;
}

section {
  margin-bottom: 60px;
  padding-top: 40px;
  padding-bottom: 40px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
  color: var(--heading-color);
}

.intro-text {
  text-align: center;
  font-size: 16px;
  color: var(--section-text);
  margin: 0 auto 30px;
  max-width: 800px;
  padding: 0 10px;
}

.category-grid,
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .home {
    padding: 30px 15px;
  }

  section {
    padding: 30px 0;
  }

  .category-grid,
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  h2 {
    font-size: 24px;
  }

  .intro-text {
    font-size: 14px;
    margin-bottom: 25px;
  }
}
</style>
