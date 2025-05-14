import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/styles.css";
const app = createApp(App).use(router).use(store);

app.mount("#app");


const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);
