<template>
  <div class="cart-item">
    <img :src="item.product.images[0].replace('300x200', '100x100')" alt="Product" />
    <div class="details">
      <h3>{{ item.product.name }}</h3>
      <p>{{ item.product.price }} ₽ x {{ item.quantity }} = {{ item.product.price * item.quantity }} ₽</p>
      <div class="quantity">
        <button @click="updateQuantity(-1)">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="updateQuantity(1)">+</button>
      </div>
      <button class="btn btn-danger" @click="removeItem">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    updateQuantity(change) {
      const newQuantity = this.item.quantity + change;
      this.$store.commit('updateCartQuantity', { productId: this.item.product.id, quantity: newQuantity });
    },
    removeItem() {
      this.$store.commit('removeFromCart', this.item.product.id);
    }
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px var(--shadow-color);
  transition: all 0.3s ease;
}

.cart-item:hover {
  box-shadow: 0 6px 12px var(--shadow-color);
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.details {
  flex: 1;
  margin-left: 20px;
}

h3 {
  font-size: 18px;
  color: var(--h2-color);
  font-weight: 500;
}

p {
  font-size: 16px;
  color: var(--text-color);
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity button {
  background: var(--button-bg);
  color: #eee4a7;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.quantity button:hover {
  background: var(--button-hover);
  color: #554c39;
}

.btn-danger {
  background: var(--button-bg);
  color: #554c39;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: var(--button-hover);
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }
  .details {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
