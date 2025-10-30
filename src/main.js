import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// ✅ Import your router instance (not vue-router directly)
import router from "./router";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Set Axios base URL and token
axios.defaults.baseURL = "https://api.football-data.org";
axios.defaults.headers.common["X-Auth-Token"] =
  "1c72cda7ff054d8fbb6ad2aad0f72522";

const app = createApp(App);

// ✅ Make Axios globally available
app.config.globalProperties.$axios = axios;
app.provide("axios", axios);

// ✅ Register router
app.use(router);

// ✅ Mount app to the element with id="app"
app.mount("#app");
