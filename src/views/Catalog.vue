<template>
  <div class="catalog">
    <h2>Каталог</h2>
    <div class="filters">
      <select v-model="categoryFilter" @change="applyFilters">
        <option value="">Все категории</option>
        <option value="Букеты">Букеты</option>
        <option value="Композиции">Композиции</option>
        <option value="Подарки">Подарки</option>
      </select>
      <input
        type="number"
        v-model="priceFilter"
        placeholder="Макс. цена"
        @input="applyFilters"
      />
      <select v-model="sortBy" @change="applySort">
        <option value="price-asc">По цене (возр.)</option>
        <option value="price-desc">По цене (убыв.)</option>
        <option value="name">По алфавиту</option>
      </select>
    </div>
    <div class="product-grid">
      <product-card
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      categoryFilter: "",
      priceFilter: "",
      sortBy: "price-asc"
    };
  },
  computed: {
    filteredProducts() {
      let products = [...this.$store.state.products];
      if (this.categoryFilter) {
        products = products.filter((p) => p.category === this.categoryFilter);
      }
      if (this.priceFilter) {
        products = products.filter((p) => p.price <= this.priceFilter);
      }
      if (this.sortBy === "price-asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "price-desc") {
        products.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
      }
      return products;
    }
  },
  created() {
    // При загрузке страницы проверяем параметр category из URL
    const category = this.$route.query.category;
    if (category) {
      this.categoryFilter = category;
    }
  },
  methods: {
    applyFilters() {
      // Обновляем URL при изменении фильтров
      this.$router.push({
        path: "/catalog",
        query: { category: this.categoryFilter || undefined }
      });
    },
    applySort() {
      this.$forceUpdate();
    }
  },
  watch: {
    // Синхронизируем categoryFilter с параметром URL
    "$route.query.category"(newCategory) {
      this.categoryFilter = newCategory || "";
    }
  }
};
</script>

<style scoped>
.catalog {
  padding: 40px 20px; /* Добавили горизонтальные отступы */
  padding-bottom: 60px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
}

.filters select,
.filters input {
  padding: 10px 15px;
  border: 2px solid #F4A7A9;
  border-radius: 8px;
  font-size: 16px;
  background: #F8F5F2;
  color: #6D8299;
  transition: all 0.3s ease;
}

.filters input {
  width: 150px;
}

.filters select:focus,
.filters input:focus {
  border-color: #E8C6B5;
  outline: none;
  box-shadow: 0 0 8px rgba(232, 198, 181, 0.2);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .catalog {
    padding: 30px 15px;
  }

  .filters {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .filters select,
  .filters input {
    width: 100%;
    max-width: 300px;
  }

  h2 {
    font-size: 24px;
  }
}

</style>