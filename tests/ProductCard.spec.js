import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProductCard from '../src/components/ProductCard.vue';

// Мок Vuex хранилища
const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, { product, quantity }) {
      state.cart.push({ product, quantity });
    },
  },
});

describe('ProductCard.vue', () => {
  let wrapper;
  const product = {
    id: 1,
    name: 'Букет "Нежные розы"',
    price: 2500,
    images: ['/images/Roses.jpg', '/images/flow.jpg'],
  };

  beforeEach(() => {
    wrapper = mount(ProductCard, {
      props: { product },
      global: {
        plugins: [store],
        mocks: {
          $router: { push: vi.fn() },
        },
      },
    });
  });

  it('рендерит данные продукта', () => {
    expect(wrapper.find('h3').text()).toBe('Букет "Нежные розы"');
    expect(wrapper.find('p').text()).toBe('2500 ₽');
    expect(wrapper.find('.default-image').attributes('src')).toBe('/images/Roses.jpg');
    expect(wrapper.find('.hover-image').attributes('src')).toBe('/images/flow.jpg');
  });

  it('добавляет класс hovered при наведении мыши', async () => {
    await wrapper.trigger('mouseenter');
    expect(wrapper.classes('hovered')).toBe(true);

    await wrapper.trigger('mouseleave');
    await new Promise((resolve) => setTimeout(resolve, 150)); // Ждём таймер hover
    expect(wrapper.classes('hovered')).toBe(false);
  });

  it('добавляет товар в корзину при клике на кнопку', async () => {
    const button = wrapper.find('.btn');
    await button.trigger('click');
    expect(store.state.cart).toEqual([{ product, quantity: 1 }]);
  });

  it('навигирует на страницу продукта при клике на карточку', async () => {
    await wrapper.trigger('click');
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/product/1');
  });

  it('останавливает событие клика на кнопке "В корзину"', async () => {
    const button = wrapper.find('.btn');
    await button.trigger('click');
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled(); // Навигация не должна сработать
  });
});