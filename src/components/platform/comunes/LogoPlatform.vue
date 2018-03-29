<template>
    <div class="container-fluid logo-platform">
        <div class="row">
            <div class="col-12 col-xl-4 offset-xl-4">
                <div class="logo-container">
                    <h1>
                        <router-link :to="{ name: getRoute}">
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
                profile: 'getProfile'
            }),   

            getRoute(){
                let route = '';

                switch (this.profile) {
                    case 'profesor':
                        route = 'profesorHome';
                    break;
                    case 'admisiones':
                        route = 'listadoBootcampsAdmisiones';
                    break;
                    case 'contabilidad':
                        route = 'listadoBootcampsContabilidad';
                    break;
                }

                console.log(route);

                return route;
            },

            getPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },

         beforeCreate(){
             /* TEMPORAL */ 
            //this.$store.commit('setProfile', 'alumno');
            this.$store.commit('setProfile', 'profesor');
            //this.$store.commit('setProfile', 'admisiones');
            //this.$store.commit('setProfile', 'contabilidad');
        },

        created(){
            //console.log(this.profile)
        }
    }    
</script>
