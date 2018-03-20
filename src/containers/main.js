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
const studentDataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/alumnoData.json';
const teacherDataPath = 'https://raw.githubusercontent.com/CODENOTCH/bbdd_fake/master/profesorData.json';
var configData = null;
var programData = null;
var studentData = null;
var teacherData = null;

const getConfigData = () => Axios.get(configPath);
const getProgramData = () => Axios.get(programDataPath);
const getStudentData = () => Axios.get(studentDataPath);
const getTeacherData = () => Axios.get(teacherDataPath);

const getData = () => {
    Axios.all([getConfigData(), getProgramData(), getStudentData(), getTeacherData()])
        .then( Axios.spread( (...params) => {
            configData = params[0].data;
            programData = params[1].data;
            studentData = params[2].data;
            teacherData = params[3].data;
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
            this.$store.commit('setStudentData',studentData);
            this.$store.commit('setTeacherData',teacherData);
        },
        render: h => h(App)
    });
}

const avoidContextMenu = () => {
    document.addEventListener('contextmenu', event => event.preventDefault());
}

getData();



