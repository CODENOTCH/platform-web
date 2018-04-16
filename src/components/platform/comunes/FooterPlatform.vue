<template>
    <footer id="footer-platform" :class="{approachless:editModeActive}">
        <div class="container-btn-session" :class="{centered:noBreadcrumbs}">
            <router-link class="link-special-codenotch" :to="{ name: 'login'}">
                <img :src="getPathIconSession" alt="icono sesión"/>
                <span>Cerrar sesión</span>
            </router-link>  
        </div>
        <div v-if="!noBreadcrumbs" class="container-breadcrumbs">
            <ul class="list-links">
                <li v-for="(link,index) of breadcrumbs" v-bind:key="index">
                    <router-link class="link-codenotch" v-if="link.visible" :class="{disabled:link.disabled}" :to="{ name: link.route}">
                        <span>{{link.text}}</span>
                    </router-link>  
                </li>
            </ul>
        </div>
    </footer>  
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name:'footerPlatform',
        
        data () {
            return {
                breadcrumbs: [],
                noBreadcrumbs: false
            }
        }, 

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                profile: 'getProfile',
                editModeActive: 'getEditModeActive'
            }),

            getPathIconSession() {
                return process.env.NODE_ENV === 'production'
                    ? this.config.imgPathProduction.iconSesion
                    : this.config.imgPathDevelopment.iconSesion;
            },
        },

        created(){
            this.setBreadcrumbs();
        },

        updated(){
            /*console.log('editModeActive From FooterPlatform updated',this.editModeActive)*/
        },

        watch: {
            '$route': 'setBreadcrumbs'
        },

        methods: {
            setBreadcrumbs(){
                let breadcrumbs = null; 

                switch(this.$route.name){
                    case 'alumnoIntro':
                        breadcrumbs = [
                            {text:'Intro', visible:false, disabled: true, route:'alumnoIntro'}
                        ],
                        this.noBreadcrumbs = true;
                    break;
                    
                    case 'alumnoPrograma':
                        breadcrumbs = [
                            {text:'Intro', visible:true, disabled: false, route:'alumnoIntro'},
                            {text:'Programa', visible:true, disabled: true, route:'alumnoPrograma'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'profesorIntro':
                        breadcrumbs = [
                            {text:'Intro', visible:false, disabled: true, route:'profesorIntro'}
                        ],
                        this.noBreadcrumbs = true;
                    break;

                    case 'profesorPrograma':
                        breadcrumbs = [
                            {text:'Intro', visible:true, disabled: false, route:'profesorIntro'},
                            {text:'Programa', visible:true, disabled: true, route:'profesorPrograma'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoBootcamps':
                        breadcrumbs = [
                            {text:'Intro', visible:true, disabled: false, route:'profesorIntro'},
                            {text:'Bootcamps', visible:true, disabled: true, route:'listadoBootcamps'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoAlumnos':
                        breadcrumbs = [
                            {text:'Intro', visible:true, disabled: false, route:'profesorIntro'},
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcamps'},
                            {text:'Alumnos', visible:true, disabled: true, route:'listadoAlumnos'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'alumnoSeguimiento':
                        breadcrumbs = [
                            {text:'Intro', visible:true, disabled: false, route:'profesorIntro'},
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcamps'},
                            {text:'Alumnos', visible:true, disabled: false, route:'listadoAlumnos'},
                            {text:'Seguimiento', visible:true, disabled: true, route:'alumnoSeguimiento'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoBootcampsAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:false, disabled: true, route:'listadoBootcampsAdmisiones'}
                        ],
                        this.noBreadcrumbs = true;
                    break;

                    case 'participantesAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsAdmisiones'},
                            {text:'Participantes', visible:true, disabled: true, route:'participantesAdmisiones'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoAlumnosAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsAdmisiones'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesAdmisiones'},
                            {text:'Alumnos', visible:true, disabled: true, route:'listadoAlumnosAdmisiones'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoProfesoresAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsAdmisiones'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesAdmisiones'},
                            {text:'Profesores', visible:true, disabled: true, route:'listadoProfesoresAdmisiones'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'alumnoDatosAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsAdmisiones'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesAdmisiones'},
                            {text:'Alumnos', visible:true, disabled: false, route:'listadoAlumnosAdmisiones'},
                            {text:'Alumno', visible:true, disabled: true, route:'alumnoDatosAdmisiones'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'profesorDatosAdmisiones':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsAdmisiones'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesAdmisiones'},
                            {text:'Profesores', visible:true, disabled: false, route:'listadoProfesoresAdmisiones'},
                            {text:'Profesor', visible:true, disabled: true, route:'profesorDatosAdmisiones'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoBootcampsContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:false, disabled: true, route:'listadoBootcampsContabilidad'}
                        ],
                        this.noBreadcrumbs = true;
                    break;

                    case 'participantesContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsContabilidad'},
                            {text:'Participantes', visible:true, disabled: true, route:'participantesContabilidad'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoAlumnosContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsContabilidad'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesContabilidad'},
                            {text:'Alumnos', visible:true, disabled: true, route:'listadoAlumnosContabilidad'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'listadoProfesoresContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsContabilidad'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesContabilidad'},
                            {text:'Profesores', visible:true, disabled: true, route:'listadoProfesoresContabilidad'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'alumnoDatosContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsContabilidad'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesContabilidad'},
                            {text:'Alumnos', visible:true, disabled: false, route:'listadoAlumnosContabilidad'},
                            {text:'Alumno', visible:true, disabled: true, route:'alumnoDatosContabilidad'}
                        ],
                        this.noBreadcrumbs = false;
                    break;

                    case 'profesorDatosContabilidad':
                        breadcrumbs = [
                            {text:'Bootcamps', visible:true, disabled: false, route:'listadoBootcampsContabilidad'},
                            {text:'Participantes', visible:true, disabled: false, route:'participantesContabilidad'},
                            {text:'Profesores', visible:true, disabled: false, route:'listadoProfesoresContabilidad'},
                            {text:'Profesor', visible:true, disabled: true, route:'alumnoDatosContabilidad'}
                        ],
                        this.noBreadcrumbs = false;
                    break;
                }

                this.breadcrumbs = breadcrumbs;
            }
        }
    }
</script>

<style lang='stylus'>
  @import '../../../stylus/main'

  .application--wrap {
    display: block !important
    min-height: inherit !important
  }

  .container {
    padding: 0 
  }

  .application.theme--light {
    background: transparent;
    }

  .theme--light .switch .input-group--selection-controls__ripple--active:after, .application .theme--light.switch .input-group--selection-controls__ripple--active:after {
    background-color: $purple 
  }

  .input-group.input-group--selection-controls.switch .input-group--selection-controls__toggle {
    background-color: $purple 
  }

  .input-group.input-group--selection-controls.switch label {
    padding-left: 16px 
    color: $purple
    font-weight: 600
  }
</style>

