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
const programDataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/programData.json';
var configData = null;
var programData = null;

const getConfigData = () => Axios.get(configPath);
const getProgramData = () => Axios.get(programDataPath);

const getData = () => {
    Axios.all([getConfigData(), getProgramData()])
        .then( Axios.spread( (...params) => {
            configData = params[0].data;
            programData = params[1].data;
            createAppVue();
            avoidContextMenu();
        })
    )
}

const createAppVue = ()=> {
    new Vue({
        el: '#app',
        store,
        router,
        created:function(){
            this.$store.commit('setConfigData',configData);
            this.$store.commit('setProgramData',programData);
        },
        render: h => h(App)
    });
}

const avoidContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault());
}

getData();



