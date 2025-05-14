import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../src/views/Catalog.vue';
import ProductCard from '../src/components/ProductCard.vue';

const store = createStore({
  state: {
    products: [
      {
        id: 1,
        name: 'Букет "Нежные розы"',
        category: 'Букеты',
        price: 2500,
        images: ['/images/Roses.jpg', '/images/flow.jpg'],
      },
      {
        id: 2,
        name: 'Композиция "Прованс"',
        category: 'Композиции',
        price: 3600,
        images: ['/images/pin14.jpg', '/images/pin15.jpg'],
      },
    ],
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/catalog', component: Catalog },
    { path: '/product/:id', component: { template: '<div>Product</div>' } },
  ],
});

describe('Catalog.vue', () => {
  let wrapper;

  beforeEach(async () => {
    await router.push('/catalog');
    await router.isReady();

    wrapper = mount(Catalog, {
      global: {
        plugins: [store, router],
        components: { ProductCard },
        mocks: {
          $router: { push: vi.fn() },
        },
      },
    });
    await wrapper.vm.$nextTick();
  });

  it('рендерит заголовок и фильтры', () => {
    expect(wrapper.find('h2').text()).toBe('Каталог');
    expect(wrapper.find('.filters select').exists()).toBe(true);
    expect(wrapper.find('.filters input').exists()).toBe(true);
  });

  it('отображает все продукты по умолчанию', () => {
    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards.length).toBe(2);
  });

  it('фильтрует продукты по категории', async () => {
    const categorySelect = wrapper.find('.filters select');
    await categorySelect.setValue('Букеты');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(ProductCard).length).toBe(1);
    expect(wrapper.findComponent(ProductCard).props('product').name).toBe('Букет "Нежные розы"');
  });

  it('фильтрует продукты по цене', async () => {
    const priceInput = wrapper.find('.filters input');
    await priceInput.setValue('3000');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAllComponents(ProductCard).length).toBe(1);
    expect(wrapper.findComponent(ProductCard).props('product').name).toBe('Букет "Нежные розы"');
  });

  it('сортирует продукты по цене (возрастание)', async () => {
    const sortSelect = wrapper.findAll('.filters select')[1];
    await sortSelect.setValue('price-asc');
    await wrapper.vm.$nextTick();
    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards[0].props('product').price).toBe(2500);
    expect(productCards[1].props('product').price).toBe(3600);
  });

  it('обновляет URL при фильтрации по категории', async () => {
    const categorySelect = wrapper.find('.filters select');
    await categorySelect.setValue('Букеты');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      path: '/catalog',
      query: { category: 'Букеты' },
    });
  });
});