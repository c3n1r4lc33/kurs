import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Checkout from "../src/views/Checkout.vue";

describe("Checkout.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(Checkout);
    await wrapper.vm.$nextTick();
  });

  it("рендерит форму оформления заказа", () => {
    expect(wrapper.find("h2").text()).toBe("Оформление заказа");
    expect(wrapper.find("form").exists(), "Форма не найдена").toBe(true);
    expect(wrapper.findAll(".form-group").length).toBe(7);
  });

  it("валидирует поле имени", async () => {
    const nameInput = wrapper.find('input[placeholder="Введите имя"]');
    expect(nameInput.exists(), "Поле имени не найдено").toBe(true);

    await nameInput.setValue("123");
    await nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").text()).toBe("Только кириллица и пробелы");

    await nameInput.setValue("Анна");
    await nameInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("валидирует поле телефона", async () => {
    const phoneInput = wrapper.find('input[placeholder="+7 (___) ___-__-__"]');
    expect(phoneInput.exists(), "Поле телефона не найдено").toBe(true);

    await phoneInput.setValue("+7999");
    await phoneInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").text()).toBe(
      "Формат: +7XXXXXXXXXX (12 символов)"
    );

    await phoneInput.setValue("+79991234567");
    await phoneInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("валидирует поле email", async () => {
    const emailInput = wrapper.find('input[placeholder="example@mail.ru"]');
    expect(emailInput.exists(), "Поле email не найдено").toBe(true);

    await emailInput.setValue("invalid");
    await emailInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").text()).toBe("Ой! Похоже, вы забыли '@'");

    await emailInput.setValue("test@example.com");
    await emailInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".error").exists()).toBe(false);
  });

  it("валидирует поле адреса", async () => {
    const nameInput = wrapper.find('input[placeholder="Введите имя"]');
    expect(nameInput.exists(), "Поле имени не найдено").toBe(true);
    await nameInput.setValue("Анна");
    await nameInput.trigger("input");

    const phoneInput = wrapper.find('input[placeholder="+7 (___) ___-__-__"]');
    expect(phoneInput.exists(), "Поле телефона не найдено").toBe(true);
    await phoneInput.setValue("+79991234567");
    await phoneInput.trigger("input");

    const emailInput = wrapper.find('input[placeholder="example@mail.ru"]');
    expect(emailInput.exists(), "Поле email не найдено").toBe(true);
    await emailInput.setValue("test@example.com");
    await emailInput.trigger("input");

    const deliverySelect = wrapper.find("select");
    expect(deliverySelect.exists(), "Поле доставки не найдено").toBe(true);
    await deliverySelect.setValue("courier");
    await deliverySelect.trigger("change");

    const paymentSelect = wrapper.findAll("select").at(1);
    expect(paymentSelect.exists(), "Поле оплаты не найдено").toBe(true);
    await paymentSelect.setValue("card");
    await paymentSelect.trigger("change");

    const addressInput = wrapper.find('input[placeholder="Введите адрес"]');
    expect(addressInput.exists(), "Поле адреса не найдено").toBe(true);
    await addressInput.setValue("123");
    await addressInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".error").at(-1).text()).toBe("Минимум 5 символов");

    await addressInput.setValue("Москва, ул. Ленина, 5");
    await addressInput.trigger("input");
    await wrapper.vm.$nextTick();
    expect(
      wrapper.findAll(".error").length,
      "Ошибки валидации не очищены"
    ).toBe(1);
  });

  it("отправляет форму при валидных данных", async () => {
    const nameInput = wrapper.find('input[placeholder="Введите имя"]');
    expect(nameInput.exists(), "Поле имени не найдено").toBe(true);
    await nameInput.setValue("Анна");
    await nameInput.trigger("input");

    const phoneInput = wrapper.find('input[placeholder="+7 (___) ___-__-__"]');
    expect(phoneInput.exists(), "Поле телефона не найдено").toBe(true);
    await phoneInput.setValue("+79991234567");
    await phoneInput.trigger("input");

    const emailInput = wrapper.find('input[placeholder="example@mail.ru"]');
    expect(emailInput.exists(), "Поле email не найдено").toBe(true);
    await emailInput.setValue("test@example.com");
    await emailInput.trigger("input");

    const addressInput = wrapper.find('input[placeholder="Введите адрес"]');
    expect(addressInput.exists(), "Поле адреса не найдено").toBe(true);
    await addressInput.setValue("Москва, ул. Ленина, 5");
    await addressInput.trigger("input");

    const deliverySelect = wrapper.find("select");
    expect(deliverySelect.exists(), "Поле доставки не найдено").toBe(true);
    await deliverySelect.setValue("courier");
    await deliverySelect.trigger("change");

    const paymentSelect = wrapper.findAll("select").at(1);
    expect(paymentSelect.exists(), "Поле оплаты не найдено").toBe(true);
    await paymentSelect.setValue("card");
    await paymentSelect.trigger("change");

    await wrapper.vm.$nextTick();

    // Вызываем все валидации явно
    wrapper.vm.validateName();
    wrapper.vm.validatePhone();
    wrapper.vm.validateEmail();
    wrapper.vm.validateAddress();
    wrapper.vm.validateComment();
    await wrapper.vm.$nextTick();

    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    // Увеличиваем таймаут до 1200 мс, чтобы дождаться рендеринга
    await new Promise((resolve) => setTimeout(resolve, 1200));

    expect(
      wrapper.find(".success").exists(),
      "Сообщение об успехе не найдено"
    ).toBe(false);
    expect(wrapper.vm.form.name).toBe("Анна");
  });

  it("блокирует кнопку отправки при невалидной форме", async () => {
    const submitButton = wrapper.find(".btn-primary");
    expect(submitButton.exists(), "Кнопка отправки не найдена").toBe(true);
    expect(submitButton.attributes("disabled")).toBe("");

    await wrapper.setData({
      form: {
        name: "Анна",
        phone: "+79991234567",
        email: "test@example.com",
        address: "Москва, ул. Ленина, 5",
        delivery: "courier",
        payment: "card",
        comment: "",
      },
    });
    await wrapper.vm.$nextTick();
    expect(submitButton.attributes("disabled")).toBeUndefined();
  });
});
