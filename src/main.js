import Vue from 'vue';
import {BootstrapVue} from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';

import App from '@/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2, {
    cancelButtonText: 'Ні',
    confirmButtonText: 'Так',
    customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-success',
    },
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
