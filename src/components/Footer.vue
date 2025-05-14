<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-links">
        <router-link to="/about">О нас</router-link>
        <router-link to="/contacts">Контакты</router-link>
        <router-link to="/delivery">Условия доставки</router-link>
      </div>
      <div class="socials">
        <a href="https://t.me/" target="_blank" class="social-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </a>
        <a href="https://wa.me/79528125252" target="_blank" class="social-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            />
          </svg>
        </a>
        <a href="https://vk.com/" target="_blank" class="social-link">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.68707 2.68707C1 4.37413 1 7.0894 1 12.52V13.48C1 18.9106 1 21.6259 2.68707 23.313C4.37413 25 7.0894 25 12.52 25H13.48C18.9106 25 21.6259 25 23.313 23.313C25 21.6259 25 18.9106 25 13.48V12.52C25 7.0894 25 4.37413 23.313 2.68707C21.6259 1 18.9106 1 13.48 1H12.52C7.0894 1 4.37413 1 2.68707 2.68707ZM5.05006 8.30005C5.18006 14.54 8.30005 18.2901 13.7701 18.2901H14.0801V14.72C16.0901 14.92 17.61 16.3901 18.22 18.2901H21.06C20.28 15.4501 18.23 13.8801 16.95 13.2801C18.23 12.5401 20.0299 10.74 20.4599 8.30005H17.8799C17.3199 10.28 15.6601 12.08 14.0801 12.25V8.30005H11.5V15.22C9.9 14.82 7.88005 12.88 7.79005 8.30005H5.05006Z"
              stroke="currentColor"
            />
          </svg>
        </a>
      </div>
      <p>© 2025 Астра. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--footer-bg);
  padding: 40px 0;
  text-align: center;
  box-shadow: 0 -2px 8px var(--shadow-color);
}

.footer-links a {
  margin: 0 20px;
  color: var(--footer-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--footer-link-hover);
}


.socials {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-link {
  color: var(--footer-text);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--footer-link-hover);
}

.social-link svg {
  width: 24px;
  height: 24px;
}

p {
  margin-top: 20px;
  color: var(--footer-text);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-links a {
    display: block;
    margin: 10px 0;
  }
}
</style>
