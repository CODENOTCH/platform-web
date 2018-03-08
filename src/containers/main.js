import Vue from 'vue';
import App from '../components/App.vue';
import Vuetify from 'vuetify';
import store from '../store/store';
import Axios from 'axios';

Vue.use(Vuetify);

/*console.log('main');
console.log(process.env.NODE_ENV);*/


const configPath = process.env.NODE_ENV === 'production' ? './assets/data/config.json' : './public/assets/data/config.json';
var configData = null;

const getJsonData = ()=> {
    Axios.get(configPath)
        .then( (response) => {
            configData = response.data;
            createAppVue();
        })
        .catch( (error) => {
            console.log(error);
        });
}

const createAppVue = ()=> {
    new Vue({
        el: '#app',
        store,
        created:function(){
            this.$store.commit('setConfigData',configData);
        },
        render: h => h(App)
    });
}

getJsonData();



