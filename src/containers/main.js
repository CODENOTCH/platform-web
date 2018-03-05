import Vue from 'vue';
import App from '../components/App.vue';
import Vuetify from 'vuetify';
import store from '../store/store';
import Axios from 'axios';

Vue.use(Vuetify);

const configPath = './public/assets/data/config.json';
var configData = null;

const getJsonData = ()=> {
    Axios.get(configPath)
        .then(function (response) {
            configData = response.data;
            createAppVue();
        })
        .catch(function (error) {
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



