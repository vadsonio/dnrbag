import 'core-js/stable';
import 'regenerator-runtime/runtime';

import "babel-polyfill";

import Vue from 'vue'
import App from './App.vue'



import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUnlock, faLock, faExclamationTriangle, faSpinner, faCog, faCircleNotch, faSearch} from '@fortawesome/free-solid-svg-icons'
import { faUser, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faEnvelope, faEnvelopeOpen, faUnlock, faLock, faExclamationTriangle, faSpinner, faCog, faCircleNotch, faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import store from './store/index.js';

import router from './router/index';

Vue.config.productionTip = false;

require('dotenv').config()

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
