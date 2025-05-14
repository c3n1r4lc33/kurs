<template>
    <div class="product" v-if="product">
      <product-carousel :product="product" />
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price }} ₽</p>
        <p class="description">{{ product.description }}</p>
        <p><strong>Состав:</strong> {{ product.composition }}</p>
        <p><strong>Размеры:</strong> Средний</p>
        <div class="quantity">
          <button @click="quantity > 1 ? quantity-- : null">-</button>
          <span>{{ quantity }}</span>
          <button @click="quantity++">+</button>
        </div>
        <button class="btn btn-primary" @click="addToCart">Добавить в корзину</button>
        <button class="btn btn-secondary" @click="$router.push('/checkout')">Оформить заказ</button>
      </div>
    </div>
  </template>
  
  <script>
  import ProductCarousel from '../components/ProductCarousel.vue';
  
  export default {
    components: { ProductCarousel },
    data() {
      return {
        quantity: 1
      };
    },
    computed: {
      product() {
        return this.$store.state.products.find(p => p.id === +this.$route.params.id);
      }
    },
    methods: {
      addToCart() {
        this.$store.commit('addToCart', { product: this.product, quantity: this.quantity });
        this.quantity = 1;
      }
    }
  };
  </script>
  
  <style scoped>
  .product {
    display: flex;
    gap: 40px;
    padding-bottom: 40px;
  }
  
  .product-details {
    flex: 1;
  }
  
  h1 {
    font-size: 28px;
    color: #2F2F2F;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .price {
    font-size: 24px;
    color: #6D8299;
    margin-bottom: 20px;
  }
  
  .description {
    font-size: 16px;
    color: #6D8299;
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 15px;
    color: #6D8299;
  }
  
  .quantity {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .quantity button {
    background: #F4A7A9;
    color: #F8F5F2;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .quantity button:hover {
    background: #E8C6B5;
  }
  
  .btn {
    padding: 12px 30px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    margin-right: 10px;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background: #F4A7A9;
    color: #F8F5F2;
  }
  
  .btn-primary:hover {
    background: #E8C6B5;
    box-shadow: 0 4px 8px rgba(47, 47, 47, 0.2);
  }
  
  .btn-secondary {
    background: #E8C6B5;
    color: #2F2F2F;
  }
  
  .btn-secondary:hover {
    background: #F4A7A9;
    color: #F8F5F2;
    box-shadow: 0 4px 8px rgba(47, 47, 47, 0.2);
  }
  
  @media (max-width: 768px) {
    .product {
      flex-direction: column;
    }
  }
  </style>