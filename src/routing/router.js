import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/platform/comunes/Login.vue';
import AlumnoWrapper from '../components/platform/alumno/AlumnoWrapper.vue';
import ProfesorWrapper from '../components/platform/profesor/ProfesorWrapper.vue';
import Intro from '../components/platform/comunes/Intro.vue';
import Programa from '../components/platform/programa/Programa.vue';
import ListadoBootcamps from '../components/platform/comunes/ListadoBootcamps.vue';
import Participantes from '../components/platform/comunes/Participantes.vue';
import ListadoParticipantes from '../components/platform/comunes/ListadoParticipantes.vue';
import AlumnoSeguimiento from '../components/platform/profesor/AlumnoSeguimiento.vue';
import AdmisionesWrapper from '../components/platform/admisiones/AdmisionesWrapper.vue';
import ContabilidadWrapper from '../components/platform/contabilidad/ContabilidadWrapper.vue';
import ParticipanteDatos from '../components/platform/comunes/ParticipanteDatos.vue';
import ParticipanteDatosEditar from '../components/platform/comunes/ParticipanteDatosEditar.vue';

const router = new VueRouter({
    routes : [
        { path: '', name: 'login', component: Login },
        { path: '/alumno', name:'alumno', component: AlumnoWrapper,
            children: [
                {
                    path: '',
                    name:'alumnoIntro',
                    component: Intro
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
                    name:'profesorIntro',
                    component: Intro
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
                    component: ListadoParticipantes
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
                    path: 'bootcamps/:bootcampId/participantes',
                    name:'participantesAdmisiones',
                    component: Participantes
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/alumnos',
                    name:'listadoAlumnosAdmisiones',
                    component: ListadoParticipantes
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/profesores',
                    name:'listadoProfesoresAdmisiones',
                    component: ListadoParticipantes
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/alumnos/:id',
                    name:'alumnoDatosAdmisiones',
                    component: ParticipanteDatos
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/profesores/:id',
                    name:'profesorDatosAdmisiones',
                    component: ParticipanteDatos
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/alumnos/:id/edit',
                    name:'alumnoDatosEditarAdmisiones',
                    component: ParticipanteDatosEditar
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/profesores/:id/edit',
                    name:'profesorDatosEditarAdmisiones',
                    component: ParticipanteDatosEditar
                }
            ]
        },
        { path: '/contabilidad', name:'contabilidad', component: ContabilidadWrapper,
            children: [
                {
                    path: 'bootcamps',
                    name:'listadoBootcampsContabilidad',
                    component: ListadoBootcamps
                },
                {
                    path: 'bootcamps/:bootcampId/participantes',
                    name:'participantesContabilidad',
                    component: Participantes
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/alumnos',
                    name:'listadoAlumnosContabilidad',
                    component: ListadoParticipantes
                },
                ,
                {
                    path: 'bootcamps/:bootcampId/participantes/profesores',
                    name:'listadoProfesoresContabilidad',
                    component: ListadoParticipantes
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/alumnos/:id',
                    name:'alumnoDatosContabilidad',
                    component: ParticipanteDatos
                },
                {
                    path: 'bootcamps/:bootcampId/participantes/profesores/:id',
                    name:'profesorDatosContabilidad',
                    component: ParticipanteDatos
                }
            ]
        },
    ],
    /*mode: 'history'*/
});

export default router;