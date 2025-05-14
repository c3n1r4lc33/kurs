import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Home from '../src/views/Home.vue';
import Banner from '../src/components/Banner.vue';
import CategoryCard from '../src/components/CategoryCard.vue';
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
        name: 'Композиция "Зимняя сказка"',
        category: 'Новинки',
        price: 3900,
        images: ['/images/baby.jpg', '/images/babyy.jpg'],
      },
      {
        id: 3,
        name: 'Букет "Летний бриз"',
        category: 'Букеты',
        price: 2800,
        images: ['/images/pin1.jpg', '/images/pin2.jpg'],
      },
    ],
  },
});

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        plugins: [store],
        components: { Banner, CategoryCard, ProductCard },
      },
    });
  });

  it('рендерит баннер, категории, рекомендации и новинки', () => {
    expect(wrapper.findComponent(Banner).exists()).toBe(true);
    expect(wrapper.find('.categories h2').text()).toBe('Популярные категории');
    expect(wrapper.find('.recommendations h2').text()).toBe('Рекомендуем');
    expect(wrapper.find('.new-arrivals h2').text()).toBe('Новинки');
  });

  it('отображает три карточки категорий', () => {
    const categoryCards = wrapper.findAllComponents(CategoryCard);
    expect(categoryCards.length).toBe(3);
    expect(categoryCards[0].props('title')).toBe('Букеты');
    expect(categoryCards[1].props('title')).toBe('Композиции');
    expect(categoryCards[2].props('title')).toBe('Подарки');
  });

  it('отображает до 5 рекомендуемых продуктов', () => {
    const productCards = wrapper.findAllComponents(ProductCard).filter(card =>
      wrapper.find('.recommendations').element.contains(card.element)
    );
    expect(productCards.length).toBe(3); // Всего 3 продукта
  });

  it('отображает продукты категории "Новинки"', () => {
    const productCards = wrapper.findAllComponents(ProductCard).filter(card =>
      wrapper.find('.new-arrivals').element.contains(card.element)
    );
    expect(productCards.length).toBe(1);
    expect(productCards[0].props('product').name).toBe('Композиция "Зимняя сказка"');
  });
});