import Vue from "vue";

//Plugins
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import "./plugins/vuetify";
import "./plugins/vue-notification"
import "./plugins/vue-snotify"
import "./plugins/vue-cookies"
import "./plugins/vue-window"
import "./plugins/vue-html-to-paper"

import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import ApiService from './services/api.service'
import { TokenService, VOIPUserService } from './services/storage.service'
import VOIPService from './services/VoIP.service'


Vue.config.productionTip = false;

//Set Token when open website and token exist
if (TokenService.getToken()) {
  ApiService.setHeader()
  ApiService.mountInterceptor()
}

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//If user and password VOIP exist in cookie, connect to VOIP Backend
if (VOIPUserService.isExist() && VOIPService.getTelephone() == null) {

  const username = VOIPUserService.getUsername()
  const password =  VOIPUserService.getPassword()
 
  VOIPService.setTelephone({user: username, password: password})
  
}