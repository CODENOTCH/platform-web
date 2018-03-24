<template>
    <div id="profesor-bootcamps" class="home bootcamps">  
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="container-bootcamps">
                        <ul>
                            <li v-for='(item,i) of currentDataBootcamps' v-bind:key="i">
                                <router-link class="link-codenotch" :to="{ path: `bootcamps/${item.bootcampId}/alumnos`}">
                                    <span>{{item.name}}</span>
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

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        },

        created() {
            window.scrollTo(0, 0);

            this.currentDataBootcamps = [...this.bootcampData.bootcamps];
            /*let indexBootcampMatched = arrBootcampsData.findIndex( item => item.bootcampId == this.$route.bootcampId);
            let teacherList = arrBootcampsData[indexBootcampMatched].teacherList;*/
        }

    }    
</script>
