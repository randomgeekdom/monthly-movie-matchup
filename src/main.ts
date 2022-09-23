import { createApp } from "vue";
import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(store)
  .use(router)
  .use(
    createAuth0({
      domain: "monthly-movie-matchup.us.auth0.com",
      client_id: "7tEQkftZEnSOFk72yRq3eCDNw7CgTpEs",
      redirect_uri: window.location.origin,
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    })
  )
  .mount("#app");
