import Vue from 'vue';
import Spa from './Spa.vue';
import router from './router';

require('./bootstrap');


const app = new Vue({
    el: '#app',
    template: '<spa/>',
    components: {
        Spa
    },
    router
});
