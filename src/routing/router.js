import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/platform/comunes/Login.vue';
import AlumnoWrapper from '../components/platform/alumno/AlumnoWrapper.vue';
import AlumnoHome from '../components/platform/alumno/AlumnoHome.vue';
import ProfesorWrapper from '../components/platform/profesor/ProfesorWrapper.vue';
import ProfesorHome from '../components/platform/profesor/ProfesorHome.vue';
import Programa from '../components/platform/programa/Programa.vue';

const router = new VueRouter({
    routes : [
        { path: '', name: 'login', component: Login },
        { path: '/alumno', name:'alumno', component: AlumnoWrapper,
            children: [
                {
                    path: '',
                    name:'alumnoHome',
                    component: AlumnoHome
                },
                {
                    path: 'programa',
                    name:'alumnoPrograma',
                    component: Programa
                }
            ]
        },
        { path: '/profesor', name:'profesor', component: ProfesorWrapper,
            children: [
                {
                    path: '',
                    name:'profesorHome',
                    component: ProfesorHome
                },
                {
                    path: 'programa',
                    name:'profesorPrograma',
                    component: Programa
                }
            ]
        }
    ],
    /*mode: 'history'*/
});

export default router;