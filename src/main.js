import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAnalytics from 'vue-analytics';

import './services/api';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine, faInfoCircle, faSearch, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([ faChartLine, faExternalLinkAlt, faInfoCircle, faGithub, faSearch ]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const isProd = process.env.NODE_ENV === 'production';

// Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-30520690-2',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd,
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
