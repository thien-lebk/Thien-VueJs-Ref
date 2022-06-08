import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
// Time Out: (1d - 3m)
VueCookies.config(60*60*24-60*3)