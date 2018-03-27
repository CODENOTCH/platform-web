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
const programDataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdk_fake_jaime/master/programData.json';
const bootcampDataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdk_fake_jaime/master/bootcampData.json';

var configData = null;
var programData = null;
var bootcampData = null;

const getConfigData = () => Axios.get(configPath);
const getProgramData = () => Axios.get(programDataPath);
const getBootcampData = () => Axios.get(bootcampDataPath);

const getData = () => {
    Axios.all([getConfigData(), getProgramData(), getBootcampData()])
        .then( Axios.spread( (...params) => {
            configData = params[0].data;
            programData = params[1].data;
            bootcampData = params[2].data;
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
            this.$store.commit('setBootcampData',bootcampData);
        },
        render: h => h(App)
    });
}

const avoidContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault());
}

getData();



