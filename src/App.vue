<template>
  <div class="app" :class="{ 'dark-theme': isDarkTheme }">
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container">
        <router-link to="/" class="logo" @click="refreshPage">
          <img
            :src="isDarkTheme ? '/images/night-logo.svg' : '/images/logo.svg'"
            alt="Логотип"
          />
        </router-link>
        <button
          class="menu-toggle"
          @click="toggleMenu"
          :class="{ active: isMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav" :class="{ hidden: isScrolled, open: isMenuOpen }">
          <router-link to="/" @click="closeMenu">Главная</router-link>
          <router-link to="/catalog" @click="closeMenu">Каталог</router-link>
          <router-link to="/gallery" @click="closeMenu">Галерея</router-link>
          <router-link to="/about" @click="closeMenu">О нас</router-link>
          <router-link to="/contacts" @click="closeMenu">Контакты</router-link>
          <div class="search-bar">
            <input
              v-model="searchQuery"
              @input="filterProducts"
              placeholder="Поиск..."
            />
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div class="suggestions" v-if="suggestions.length">
              <p
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                @click="selectSuggestion(suggestion)"
              >
                {{ suggestion.name }}
              </p>
            </div>
          </div>
          <router-link to="/cart" class="cart-link" @click="closeMenu">
            <svg
              class="cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span v-if="cartCount" class="cart-count">{{ cartCount }}</span>
          </router-link>
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :title="isDarkTheme ? 'Светлая тема' : 'Тёмная тема'"
          >
            <svg
              v-if="isDarkTheme"
              class="theme-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              v-else
              class="theme-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer-vue />
  </div>
</template>

<script>
import FooterVue from "./components/Footer.vue";

export default {
  name: "App",
  components: { FooterVue },
  data() {
    return {
      searchQuery: "",
      suggestions: [],
      isScrolled: false,
      isDarkTheme: localStorage.getItem("theme") === "dark",
      isMenuOpen: false,
    };
  },
  computed: {
    cartCount() {
      return this.$store.state.cart.length;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.isDarkTheme) {
      document.body.classList.add("dark-theme");
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    filterProducts() {
      if (!this.$store.state.products) return;
      this.suggestions = this.searchQuery
        ? this.$store.state.products.filter((p) =>
            p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : [];
    },

    selectSuggestion(product) {
      this.$router.push(`/product/${product.id}`);
      this.searchQuery = "";
      this.suggestions = [];
      this.closeMenu();
    },
    refreshPage(event) {
      event.preventDefault();
      this.$router.push("/").then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      this.closeMenu();
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      if (this.isDarkTheme) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
      this.closeMenu();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--header-bg);
  padding: 15px 0;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 10;
  transition: padding 0.3s ease, background 0.3s ease;
}

.header.scrolled {
  padding: 10px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  z-index: 11;
}

.logo img {
  width: 120px;
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
}

.nav {
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.nav.hidden {
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
}

.nav a {
  margin-left: 30px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: var(--accent-color);
}

.search-bar {
  position: relative;
  margin-left: 30px;
}

.search-bar input {
  padding: 8px 35px 8px 12px;
  border: 2px solid var(--input-border);
  border-radius: 20px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-color);
  width: 180px;
  transition: width 0.3s ease, border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: var(--button-hover);
  outline: none;
  box-shadow: 0 0 8px var(--shadow-color);
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-color);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 10px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px var(--shadow-color);
  z-index: 20;
}

.suggestions p {
  padding: 8px;
  cursor: pointer;
  color: var(--text-color);
  transition: background 0.3s ease;
}

.suggestions p:hover {
  background: var(--accent-color);
  color: var(--bg-color);
}

.cart-link {
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
}

.cart-icon {
  width: 24px;
  height: 24px;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.cart-link:hover .cart-icon {
  color: var(--accent-color);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--accent-color);
  color: var(--bg-color);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
}

.theme-toggle {
  background: none;
  border: none;
  margin-left: 20px;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.theme-toggle:hover {
  background: var(--button-bg);
}

.theme-icon {
  width: 22px;
  height: 22px;
  color: var(--text-color);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 12;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 3px;
  background: var(--text-color);
  margin: 5px 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.main {
  flex: 1;
  padding-bottom: 30px;
  padding-top: 0px;
}

@media (max-width: 768px) {
  .container {
    flex-wrap: wrap;
    align-items: center;
    padding: 0 15px;
  }

  .logo img {
    width: 100px;
    height: 35px;
  }

  .menu-toggle {
    display: block;
  }

  .nav {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: var(--header-bg);
    position: absolute;
    top: 100%;
    left: 0;
    padding: 20px;
    box-shadow: 0 4px 8px var(--shadow-color);
    z-index: 10;
  }

  .nav.open {
    display: flex;
  }

  .nav a,
  .search-bar,
  .cart-link,
  .theme-toggle {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }

  .nav a {
    font-size: 18px;
  }

  .search-bar input {
    width: 100%;
    max-width: 100%;
    padding: 10px 40px 10px 15px;
  }

  .cart-link,
  .theme-toggle {
    display: inline-flex;
    justify-content: center;
  }

  .header.scrolled .nav {
    display: none;
  }

  .header.scrolled .nav.open {
    display: flex;
  }
}

@media (max-width: 360px) {
  .logo img {
    width: 80px;
    height: 30px;
  }

  .nav a {
    font-size: 16px;
  }

  .search-bar input {
    font-size: 13px;
  }
}
</style>
