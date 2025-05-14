import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from '../src/App.vue';
import FooterVue from '../src/components/Footer.vue';

// Мок маршрутов
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/catalog', component: { template: '<div>Catalog</div>' } },
  { path: '/cart', component: { template: '<div>Cart</div>' } },
  { path: '/about', component: { template: '<div>About</div>' } },
  { path: '/contacts', component: { template: '<div>Contacts</div>' } },
  { path: '/gallery', component: { template: '<div>Gallery</div>' } },
  { path: '/delivery', component: { template: '<div>Delivery</div>' } },
  { path: '/product/:id', component: { template: '<div>Product</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Мок Vuex
const store = createStore({
  state: {
    cart: [
      { product: { id: 1, price: 2500 }, quantity: 1 },
      { product: { id: 2, price: 2800 }, quantity: 1 },
    ],
    products: [
      { id: 1, name: 'Букет "Нежные розы"', price: 2500 },
      { id: 2, name: 'Букет "Летний бриз"', price: 2800 },
    ],
  },
  getters: {
    cartCount: (state) => state.cart.length,
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
  },
});

// Мок window.scrollTo
vi.stubGlobal('scrollTo', vi.fn());

describe('App.vue', () => {
  let wrapper;

  beforeEach(async () => {
    await router.push('/');
    await router.isReady();

    wrapper = mount(App, {
      global: {
        plugins: [router, store],
        components: { FooterVue },
        stubs: {
          'router-view': true,
          'router-link': { template: '<a><slot></slot></a>' }, // Стабим RouterLink как <a>
        },
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });
  });

  it('рендерит хедер, навигацию и футер', () => {
    expect(wrapper.find('header.header').exists(), 'Хедер не найден').toBe(true);
    expect(wrapper.find('nav.nav').exists(), 'Навигация не найдена').toBe(true);
    expect(wrapper.findComponent(FooterVue).exists(), 'Футер не найден').toBe(true);
    expect(wrapper.find('router-view-stub').exists(), 'Router-view не найден').toBe(true);
  });

  it('отображает логотип и переключает его в зависимости от темы', async () => {
    const logoImg = wrapper.find('.logo img');
    expect(logoImg.exists(), 'Логотип не найден').toBe(true);
    expect(logoImg.attributes('src')).toBe('/images/logo.svg');

    await wrapper.setData({ isDarkTheme: true });
    await wrapper.vm.$nextTick();
    expect(logoImg.attributes('src')).toBe('/images/night-logo.svg');
  });

  it('отображает количество товаров в корзине', () => {
    const cartCount = wrapper.find('.cart-count');
    expect(cartCount.exists(), 'Счётчик корзины не найден').toBe(true);
    expect(cartCount.text()).toBe('2');
  });

  it('переключает тёмную/светлую тему при клике на кнопку', async () => {
    const themeToggle = wrapper.find('.theme-toggle');
    expect(themeToggle.exists(), 'Кнопка переключения темы не найдена').toBe(true);
    expect(wrapper.vm.isDarkTheme).toBe(false);

    await themeToggle.trigger('click');
    expect(wrapper.vm.isDarkTheme).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);

    await themeToggle.trigger('click');
    expect(wrapper.vm.isDarkTheme).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('открывает и закрывает мобильное меню', async () => {
    const menuToggle = wrapper.find('.menu-toggle');
    expect(menuToggle.exists(), 'Кнопка меню не найдена').toBe(true);
    const nav = wrapper.find('.nav');
    expect(nav.exists(), 'Навигация не найдена').toBe(true);

    expect(nav.classes('open')).toBe(false);
    await menuToggle.trigger('click');
    expect(nav.classes('open')).toBe(true);

    await menuToggle.trigger('click');
    expect(nav.classes('open')).toBe(false);
  });

  it('выполняет поиск и отображает подсказки', async () => {
    const searchInput = wrapper.find('.search-bar input');
    expect(searchInput.exists(), 'Поле поиска не найдено').toBe(true);
    await searchInput.setValue('Нежные розы');
    await wrapper.vm.$nextTick();

    const suggestions = wrapper.findAll('.suggestions p');
    expect(suggestions.length, 'Подсказки не найдены').toBe(1);
    expect(suggestions[0].text()).toBe('Букет "Нежные розы"');
  });

  it('навигирует при выборе подсказки', async () => {
    const searchInput = wrapper.find('.search-bar input');
    expect(searchInput.exists(), 'Поле поиска не найдено').toBe(true);
    await searchInput.setValue('Нежные розы');
    await wrapper.vm.$nextTick();

    const suggestion = wrapper.find('.suggestions p');
    expect(suggestion.exists(), 'Подсказка не найдена').toBe(true);
    await suggestion.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/product/1');
    expect(wrapper.vm.searchQuery).toBe('');
    expect(wrapper.vm.suggestions).toEqual([]);
  });

  it('добавляет класс scrolled при прокрутке', async () => {
    await wrapper.setData({ isScrolled: true });
    expect(wrapper.find('header').classes('scrolled'), 'Класс scrolled не добавлен').toBe(true);

    await wrapper.setData({ isScrolled: false });
    expect(wrapper.find('header').classes('scrolled'), 'Класс scrolled не удалён').toBe(false);
  });

 
});
