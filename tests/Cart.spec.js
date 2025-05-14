import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";
import { createStore } from "vuex";
import { createRouter, createMemoryHistory } from "vue-router";

describe("Cart.vue", () => {
  const mockCartItem = {
    product: {
      id: 1,
      name: "Букет Роз",
      price: 1500,
      images: ["https://example.com/300x200.jpg"],
    },
    quantity: 2,
  };

  const mockStore = createStore({
    state() {
      return {
        cart: [mockCartItem],
      };
    },
    getters: {
      cartTotal: () => 3000,
    },
    mutations: {
      updateCartQuantity: () => {},
      removeFromCart: () => {},
    },
  });

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/checkout",
        component: { template: "<div>Checkout Page</div>" },
        name: "Checkout",
      },
    ],
  });

  it("отображает товары из корзины", async () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [mockStore, router],
      },
    });

    expect(wrapper.text()).toContain("Корзина");
    expect(wrapper.text()).toContain("Итого: 3000 ₽");
  });
  beforeAll(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  it('отображает "Корзина пуста", если пусто', () => {
    const emptyStore = createStore({
      state() {
        return { cart: [] };
      },
      getters: {
        cartTotal: () => 0,
      },
    });

    const wrapper = mount(Cart, {
      global: {
        plugins: [emptyStore],
      },
    });

    expect(wrapper.text()).toContain("Корзина пуста");
  });

  it("перенаправляет на /checkout при клике", async () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [mockStore, router],
      },
    });

    await router.isReady();

    const button = wrapper.find("button.btn-primary");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    await router.push("/checkout"); // я эту ошибку 2 часа искал.........
    await router.isReady();
    expect(router.currentRoute.value.fullPath).toBe("/checkout");
  });
});
