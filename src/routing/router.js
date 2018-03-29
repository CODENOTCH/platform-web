import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/platform/comunes/Login.vue';
import AlumnoWrapper from '../components/platform/alumno/AlumnoWrapper.vue';
import AlumnoHome from '../components/platform/alumno/AlumnoHome.vue';
import ProfesorWrapper from '../components/platform/profesor/ProfesorWrapper.vue';
import ProfesorHome from '../components/platform/profesor/ProfesorHome.vue';
import Programa from '../components/platform/programa/Programa.vue';
import ListadoBootcamps from '../components/platform/comunes/ListadoBootcamps.vue';
import ListadoAlumnos from '../components/platform/comunes/ListadoAlumnos.vue';
import AlumnoSeguimiento from '../components/platform/profesor/AlumnoSeguimiento.vue';
import AdmisionesWrapper from '../components/platform/admisiones/AdmisionesWrapper.vue';
import AlumnoDatos from '../components/platform/comunes/AlumnoDatos.vue';

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
                },
                {
                    path: 'bootcamps',
                    name:'listadoBootcamps',
                    component: ListadoBootcamps,
                },
                {
                    path: 'bootcamps/:bootcampId/alumnos',
                    name:'listadoAlumnos',
                    component: ListadoAlumnos
                },
                {
                    path: 'bootcamps/:bootcampId/alumnos/:studentId',
                    name:'alumnoSeguimiento',
                    component: AlumnoSeguimiento
                }
            ]
        },
        { path: '/admisiones', name:'admisiones', component: AdmisionesWrapper,
            children: [
                {
                    path: 'bootcamps',
                    name:'listadoBootcampsAdmisiones',
                    component: ListadoBootcamps
                },
                {
                    path: 'bootcamps/:bootcampId/alumnos',
                    name:'listadoAlumnosAdmisiones',
                    component: ListadoAlumnos
                },
                {
                    path: 'bootcamps/:bootcampId/alumnos/:studentId',
                    name:'alumnoDatosAdmisiones',
                    component: AlumnoDatos
                }
            ]
        },
    ],
    /*mode: 'history'*/
});

export default router;