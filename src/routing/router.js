import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/platform/Login.vue';
import AlumnoWrapper from '../components/platform/alumno/AlumnoWrapper.vue';
import AlumnoHome from '../components/platform/alumno/AlumnoHome.vue';
import Programa from '../components/platform/programa/Programa.vue';

const router = new VueRouter({
    routes : [
        { path: '', name: 'login', component: Login },
        { path: '/alumno', name:'alumno', component: AlumnoWrapper,
            children: [
                {
                    path: 'home',
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
    ],
    /*mode: 'history'*/
});

export default router;