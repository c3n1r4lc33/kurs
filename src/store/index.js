import { createStore } from 'vuex';

const savedCart = localStorage.getItem('cart');
const parsedCart = savedCart ? JSON.parse(savedCart) : [];

export default createStore({
  state: {
    products: [
      // Букеты
      { id: 1, name: 'Букет "Нежные розы"', category: 'Букеты', price: 2500, description: 'Изящный букет из свежих роз для самых нежных чувств.', images: ["/images/Roses.jpg", "/images/flow.jpg"], composition: 'Розы, эвкалипт' },
      { id: 2, name: 'Букет "Летний бриз"', category: 'Букеты', price: 2800, description: 'Легкость лета в каждом лепестке.', images: ["/images/pin1.jpg", "/images/pin2.jpg"], composition: 'Пионы, ромашки' },
      { id: 3, name: 'Букет "Закат"', category: 'Букеты', price: 3000, description: 'Теплые оттенки для теплых моментов.', images: ["/images/pin3.jpg", "/images/pin4.jpg"], composition: 'Герберы, хризантемы' },
      { id: 4, name: 'Букет "Северное сияние"', category: 'Букеты', price: 3200, description: 'Холодные тона для ярких эмоций.', images: ["/images/pin5-1.jpg", "/images/pin5-2.jpg"], composition: 'Ирисы, эустома' },
      { id: 5, name: 'Букет "Весенний рассвет"', category: 'Букеты', price: 2700, description: 'Пробуждение природы в каждом цветке.', images: ["/images/pin6.jpg", "/images/pin7.jpg"], composition: 'Тюльпаны, нарциссы' },
      // Композиции
      { id: 6, name: 'Композиция "Утро в саду"', category: 'Композиции', price: 3500, description: 'Аромат утра в изысканной композиции.', images: ["/images/pin8.jpg", "/images/pin9.jpg"], composition: 'Розы, лаванда' },
      { id: 7, name: 'Композиция "Золотая осень"', category: 'Композиции', price: 3800, description: 'Тепло осенних дней в цветах.', images: ["/images/pin10.jpg", "/images/pin11.jpg"], composition: 'Хризантемы, подсолнухи' },
      { id: 8, name: 'Композиция "Лунный свет"', category: 'Композиции', price: 4000, description: 'Таинственная красота ночи.', images: ["/images/pin12.jpg", "/images/pin13.jpg"], composition: 'Лилии, гипсофила' },
      { id: 9, name: 'Композиция "Прованс"', category: 'Композиции', price: 3600, description: 'Французский шарм в каждом лепестке.', images: ["/images/pin14.jpg", "/images/pin15.jpg"], composition: 'Лаванда, розы' },
      { id: 10, name: 'Композиция "Морской бриз"', category: 'Композиции', price: 3700, description: 'Свежий ветер моря в цветах.', images: ["/images/pin16.jpg", "/images/pin17.jpg"], composition: 'Эустома, дельфиниум' },
      // Подарки
      { id: 11, name: 'Корзина "Сладкий момент"', category: 'Подарки', price: 4500, description: 'Цветы и сладости для идеального подарка.', images: ["/images/kit1.jpg", "/images/kit2.jpg"], composition: 'Розы, конфеты' },
      { id: 12, name: 'Корзина "Романтика"', category: 'Подарки', price: 4800, description: 'Для самых романтичных моментов.', images: ["/images/kit3.jpg", "/images/kit4.jpg"], composition: 'Пионы, шоколад' },
      { id: 13, name: 'Набор "Уютный вечер"', category: 'Подарки', price: 4200, description: 'Тепло и уют в каждом элементе.', images: ["/images/extra1.jpg", "/images/extra2.jpg"], composition: 'Герберы, чай' },
      { id: 14, name: 'Корзина "Сюрприз"', category: 'Подарки', price: 4600, description: 'Неожиданная радость для близких.', images: ["/images/kit5.jpg", "/images/kit6.jpg"], composition: 'Тюльпаны, конфеты' },
      { id: 15, name: 'Набор "День радости"', category: 'Подарки', price: 4900, description: 'Яркий день начинается с этого набора.', images: ["/images/extra3.jpg", "/images/extra4.jpg"], composition: 'Хризантемы, сладости' },
      // Новинки
      { id: 16, name: 'Букет "Тропический закат"', category: 'Новинки', price: 3400, description: 'Экзотическая красота тропиков.', images: ["/images/new1.jpg", "/images/new2.jpg"], composition: 'Орхидеи, антуриум' },
      { id: 17, name: 'Композиция "Зимняя сказка"', category: 'Новинки', price: 3900, description: 'Магия зимы в цветах.', images: ["/images/baby.jpg", "/images/babyy.jpg"], composition: 'Эустома, хлопок' },
      { id: 18, name: 'Набор "Цветочная мечта"', category: 'Новинки', price: 4700, description: 'Мечты, воплощенные в цветах и сладостях.', images: ["/images/cench.jpg", "/images/cench2.jpg"], composition: 'Розы, макаруны' }
    ],
    cart: parsedCart
  },
  mutations: {
    addToCart(state, { product, quantity }) {
      const item = state.cart.find(i => i.product.id === product.id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartQuantity(state, { productId, quantity }) {
      const item = state.cart.find(i => i.product.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.product.id !== productId);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(i => i.product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  }
});
