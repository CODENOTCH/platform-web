<template>
    <div class="container-fluid logo-platform">
        <div class="row">
            <div class="col-12 col-xl-4 offset-xl-4">
                <div class="logo-container">
                    <h1>
                        <router-link :to="{ name: getRoute}" :class="{unlinked:editModeActive}">
                            <img :src="getPathLogo" alt="logo Codenotch"/>
                        </router-link> 
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import FooterPlatform from '../comunes/FooterPlatform.vue';

    export default {
        name:'logoPlatform',

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                isBootcamp: 'getIsBootcamp',
                profile: 'getProfile',
                editModeActive: 'getEditModeActive'
            }),   

            getRoute(){
                let route = '';

                switch (this.profile) {
                    case 'alumno':
                        route = 'alumnoIntro';
                    break;
                    case 'profesor':
                        route = 'profesorIntro';
                    break;
                    case 'admisiones':
                        route = 'listadoBootcampsAdmisiones';
                    break;
                    case 'contabilidad':
                        route = 'listadoBootcampsContabilidad';
                    break;
                }

                return route;
            },

            getPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        }
    }    
</script>
