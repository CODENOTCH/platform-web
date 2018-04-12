<template>
    <div class="home bootcamps">  
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                     <img :src="getPathImgListadosBootcamp" alt="img bootcamp" class="img-fluid"/>
                </div>
            </div>       
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="container-bootcamps">
                        <ul>
                            <li v-for='(item,i) of currentDataBootcamps' v-bind:key="i">
                                <router-link :to="{ path: `bootcamps/${item._id}/${getRoute}`}">
                                    <v-btn @click="setBootcampId(i)" class="btn-codenotch">{{item.name}}</v-btn>
                                </router-link>
                            </li>
                        </ul> 
                    </div>
                </div>    
            </div>
        </div>         
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'listadoBootcamps',

        data() {
            return {
                currentDataBootcamps: []
            };
        },
        

        computed: {
            ...mapGetters({
                config: 'getConfigData',
                bootcampData: 'getBootcampData',
                bootcampId: 'getBootcampId',
                profile: 'getProfile'
            }),

            getPathImgListadosBootcamp() {
                switch(this.profile){
                    case 'profesor':
                        return process.env.NODE_ENV === 'production' 
                            ? this.config.imgPathProduction.imgListadoBootcampProfesor 
                            : this.config.imgPathDevelopment.imgListadoBootcampProfesor
                    break;
                    case 'admisiones':
                        return process.env.NODE_ENV === 'production' 
                            ? this.config.imgPathProduction.imgListadoBootcampAdmisiones 
                            : this.config.imgPathDevelopment.imgListadoBootcampAdmisiones
                    break;
                    case 'contabilidad':
                        return process.env.NODE_ENV === 'production' 
                            ? this.config.imgPathProduction.imgListadoBootcampContabilidad 
                            : this.config.imgPathDevelopment.imgListadoBootcampContabilidad
                    break;
                }
            }, 

            getRoute() {
                let route ='';

                switch(this.profile){
                    case 'profesor':
                        route = 'alumnos';
                    break;
                    case 'admisiones':
                    case 'contabilidad':
                        route = 'participantes';
                    break;
                }

                return route;
            }
        },

        beforeCreate(){
            this.$store.commit('setIsBootcamp',true);
        },

        created() {
            window.scrollTo(0, 0);

            this.currentDataBootcamps = [...this.bootcampData.bootcamps];
        },

        methods:{
            setBootcampId(index){
                this.$store.commit('setBootcampId', this.currentDataBootcamps[index]._id);
            }
        }

    }    
</script>

<style lang="stylus">
    .container-bootcamps{
        .btn__content {
            white-space: pre-wrap !important;
            padding 2em 1.5em !important;
            @media (min-width: 768px){
                padding 1.3em 1em !important;
            }
        }
    }  
</style>
