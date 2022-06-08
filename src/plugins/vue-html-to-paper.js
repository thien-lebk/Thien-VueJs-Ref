import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'status=yes',
    'location=yes',
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css',
    'http://staging.camdonhanh.vn/css/vuetify.css',
  ]
}

Vue.use(VueHtmlToPaper, options);