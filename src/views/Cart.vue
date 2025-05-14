<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="cart.length">
      <cart-item v-for="item in cart" :key="item.product.id" :item="item" />
      <p class="total">Итого: {{ total }} ₽</p>
      <button class="btn btn-primary" @click="$router.push('/checkout')">Оформить заказ</button>
    </div>
    <p v-else>Корзина пуста</p>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue';

export default {
  components: { CartItem },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.cartTotal;
    }
  }
};
</script>

<style scoped>
.cart {
  padding-bottom: 40px;
}

.cart-item {
  background: var(--cart-bg-color);
  color: var(--cart-text-color);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  color: var(--text-color);
}

.total {
  font-size: 20px;
  text-align: right;
  margin: 20px 0;
  color: var(--text-color);
}

.btn-primary {
  display: block;
  width: 200px;
  margin: 0 auto;
  background: var(--btn-bg-color);
  color: var(--btn-text-color);
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--btn-hover-bg-color);
  box-shadow: 0 4px 8px rgba(47, 47, 47, 0.2);
}

p {
  text-align: center;
  font-size: 18px;
  color: var(--text-color);
}

/* Темная тема */
.dark-theme .cart {
  background-color: #333333;
}

.dark-theme .cart-item {
  background: #444444;
  color: #d1d1d1;
}

.dark-theme h2,
.dark-theme .total,
.dark-theme p {
  color: #f1f1f1;
}

.dark-theme .btn-primary {
  background: #b5a694;
  color: #f1f1f1;
}

.dark-theme .btn-primary:hover {
  background: #d8c8b3;
}
</style>
