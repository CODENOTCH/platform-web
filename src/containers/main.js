import Vue from 'vue';
import App from '../components/App.vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import router from '../routing/router';
import store from '../store/store';
import Axios from 'axios';

Vue.use(Vuetify);
Vue.use(VueRouter);

/*console.log('main');
console.log(process.env.NODE_ENV);*/


const configPath = process.env.NODE_ENV === 'production' ? './assets/data/config.json' : './public/assets/data/config.json';
var configData = null;

const getJsonData = ()=> {
    Axios.get(configPath)
        .then( (response) => {
            configData = response.data;
            createAppVue();
            avoidContextMenu();
        })
        .catch( (error) => {
            console.log(error);
        });
}

const createAppVue = ()=> {
    new Vue({
        el: '#app',
        store,
        router,
        created:function(){
            this.$store.commit('setConfigData',configData);
        },
        render: h => h(App)
    });
}

const avoidContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault());
}

getJsonData();



