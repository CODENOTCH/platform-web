<template>
    <div id="profesor-bootcamps" class="home bootcamps">  
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                     <img :src="setPathImgListadosBootcamp" alt="logo Codenotch" class="img-fluid"/>
                </div>
            </div>       
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="container-bootcamps">
                        <ul>
                            <li v-for='(item,i) of currentDataBootcamps' v-bind:key="i">
                                <!--router-link class="link-codenotch" :to="{ path: `bootcamps/${item.bootcampId}/alumnos`}">
                                    <span>{{item.name}}</span>
                                </router-link-->  
                                <router-link :to="{ path: `bootcamps/${item.bootcampId}/alumnos`}">
                                    <v-btn class="btn-codenotch">{{item.name}}</v-btn>
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
                bootcampId: 'getBootcampId'
            }),

            setPathImgListadosBootcamp() {
                return process.env.NODE_ENV === 'production' 
                    ? this.config.imgPathProduction.imgListadoBootcamp 
                    : this.config.imgPathDevelopment.imgListadoBootcamp
            }
        },

        beforeCreate(){
            this.$store.commit('setIsBootcamp',true);
        },

        created() {
            window.scrollTo(0, 0);

            this.currentDataBootcamps = [...this.bootcampData.bootcamps];
            /*let indexBootcampMatched = arrBootcampsData.findIndex( item => item.bootcampId == this.$route.bootcampId);
            let teacherList = arrBootcampsData[indexBootcampMatched].teacherList;*/
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
