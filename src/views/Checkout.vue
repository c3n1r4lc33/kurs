<template>
  <div class="checkout">
    <h2>Оформление заказа</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label>Имя</label>
        <input
          v-model="form.name"
          @input="validateName"
          required
          placeholder="Введите имя"
        />
        <span class="error" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label>Телефон</label>
        <input
          v-model="form.phone"
          @input="validatePhone"
          type="tel"
          required
          placeholder="+7 (___) ___-__-__"
        />
        <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          v-model="form.email"
          @input="validateEmail"
          type="email"
          required
          placeholder="example@mail.ru"
        />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Адрес доставки</label>
        <input
          v-model="form.address"
          @input="validateAddress"
          required
          placeholder="Введите адрес"
        />
        <span class="error" v-if="errors.address">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label>Способ доставки</label>
        <select v-model="form.delivery">
          <option value="courier">Курьером</option>
          <option value="pickup">Самовывоз</option>
        </select>
      </div>

      <div class="form-group">
        <label>Способ оплаты</label>
        <select v-model="form.payment">
          <option value="card">Картой (заглушка)</option>
          <option value="cash">Наличными</option>
        </select>
      </div>

      <div class="form-group">
        <label>Комментарий</label>
        <textarea
          v-model="form.comment"
          @input="validateComment"
          maxlength="500"
          placeholder="Ваши пожелания (до 500 символов)"
        ></textarea>
        <span class="error" v-if="errors.comment">{{ errors.comment }}</span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
        Подтвердить
      </button>
    </form>

    <!-- Модальное окно -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Данные успешно отправлены!</h3>
        <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
        address: "",
        delivery: "courier",
        payment: "card",
        comment: "",
      },
      errors: {
        name: "",
        phone: "",
        email: "",
        address: "",
        comment: "",
      },
      successMessage: "",
      isModalVisible: false, // Для отображения модального окна
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.name &&
        this.form.phone &&
        this.form.email &&
        this.form.address &&
        !this.errors.name &&
        !this.errors.phone &&
        !this.errors.email &&
        !this.errors.address &&
        !this.errors.comment
      );
    },
  },
  methods: {
    validateName() {
      const nameRegex = /^[А-Яа-яЁё\s]+$/;
      if (!this.form.name) {
        this.errors.name = "Имя обязательно";
      } else if (!nameRegex.test(this.form.name)) {
        this.errors.name = "Только кириллица и пробелы";
      } else if (this.form.name.length < 2) {
        this.errors.name = "Минимум 2 символа";
      } else {
        this.errors.name = "";
      }
    },
    validatePhone() {
      const phoneRegex = /^\+7\d{10}$/;
      let value = this.form.phone.replace(/[^\d+]/g, "");
      if (value && !value.startsWith("+7")) {
        value = "+7" + value.replace(/^\+/, "");
      }
      this.form.phone = value;
      if (!this.form.phone) {
        this.errors.phone = "Телефон обязателен";
      } else if (!phoneRegex.test(this.form.phone)) {
        this.errors.phone = "Формат: +7XXXXXXXXXX (12 символов)";
      } else {
        this.errors.phone = "";
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        this.errors.email = "Email обязателен ";
      } else if (!this.form.email.includes("@")) {
        this.errors.email = "Ой! Похоже, вы забыли '@' ";
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Неверный формат email";
      } else {
        this.errors.email = "";
      }
    },
    validateAddress() {
      const addressRegex = /^[А-Яа-яЁё0-9\s,-]+$/;
      if (!this.form.address) {
        this.errors.address = "Адрес обязателен";
      } else if (!addressRegex.test(this.form.address)) {
        this.errors.address =
          "Только кириллица, цифры, пробелы, дефисы и запятые";
      } else if (this.form.address.length < 5) {
        this.errors.address = "Минимум 5 символов";
      } else {
        this.errors.address = "";
      }
    },
    validateComment() {
      if (this.form.comment.length > 500) {
        this.errors.comment = "Максимум 500 символов";
        this.form.comment = this.form.comment.slice(0, 500);
      } else {
        this.errors.comment = "";
      }
    },
    submitOrder() {
      this.validateName();
      this.validatePhone();
      this.validateEmail();
      this.validateAddress();
      this.validateComment();

      if (this.isFormValid) {
        // Показать модальное окно после успешной отправки
        this.isModalVisible = true;

        // Очистить форму и ошибки
        this.form = {
          name: "",
          phone: "",
          email: "",
          address: "",
          delivery: "courier",
          payment: "card",
          comment: "",
        };
        this.errors = {
          name: "",
          phone: "",
          email: "",
          address: "",
          comment: "",
        };
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 40px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  color: var(--text-color);
}

/* Добавляем стили для модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content button {
  background: #f28c8c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.modal-content button:hover {
  background: #e8b5a4;
}

/* Существующие стили для формы */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--label-color);
  font-weight: 500;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #f28c8c;
  border-radius: 8px;
  font-size: 16px;
  background: #e8d9cf;
  color: #5a7a6f;
  transition: all 0.3s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #e8b5a4;
  outline: none;
  box-shadow: 0 0 8px rgba(232, 181, 164, 0.2);
}

textarea {
  height: 100px;
  resize: vertical;
}

.error {
  color: #f28c8c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.btn-primary {
  display: block;
  width: 200px;
  margin: 20px auto;
  background: #f28c8c;
  color: #e8d9cf;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.btn-primary:disabled {
  background: #e8b5a4;
  cursor: not-allowed;
  opacity: 0.7;
}

.success {
  text-align: center;
  color: #e8b5a4;
  font-size: 16px;
  background: #e8d9cf;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(42, 42, 42, 0.1);
}

/* Темная тема */
.dark-theme .checkout {
  background-color: #121212;
}

.dark-theme label,
.dark-theme .error {
  color: #d1d1d1;
}

.dark-theme input,
.dark-theme select,
.dark-theme textarea {
  background: #111111;
  color: #d1d1d1;
  border-color: #666666;
}

.dark-theme .btn-primary {
  background: #b5a694;
  color: #d1d1d1;
}

.dark-theme .btn-primary:hover {
  background: #d8c8b3;
}

.dark-theme .success {
  background: #444444;
  color: #b5a694;
}
</style>
