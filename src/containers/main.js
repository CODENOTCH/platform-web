import Vue from 'vue';
import App from '../components/App.vue';

const appInstance = new Vue({
    el: '#app',
    render: h => h(App)
});