<template>
  <div class="category-card" @click="goToCatalog">
    <div class="image-wrapper">
      <img :src="image" alt="Category" class="default-image" loading="lazy" />
    </div>
    <div class="content-wrapper">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    image: String
  },
  methods: {
    goToCatalog() {
      this.$router.push({
        path: '/catalog',
        query: { category: this.title } // Передаем категорию как параметр
      });
    }
  }
};
</script>

<style scoped>
.category-card {
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 2px 6px var(--shadow-color);
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 250px;
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

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px var(--card-hover-shadow);
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  overflow: hidden;
  transition: height 0.4s ease;
}

.category-card:hover .image-wrapper {
  height: 100%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.4s ease;
}

.category-card:hover .image-wrapper img {
  transform: scale(1.1);
}

.content-wrapper {
  position: relative;
  padding-top: 160px;
  transition: opacity 0.4s ease;
}

.category-card:hover .content-wrapper {
  opacity: 0;
}

h3 {
  padding: 15px;
  font-size: 18px;
  color: var(--card-text);
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .category-card {
    height: 200px;
  }
  .image-wrapper {
    height: 120px;
  }
  .content-wrapper {
    padding-top: 130px;
  }
}
</style>
