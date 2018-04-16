<template>
    <div class="home participants">  
        <div class="container-fluid">      
            <div class="row"> 
                 <div class="col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-2 col-xl-3 offset-xl-3 container-teacher">
                    <div class="block-sup">
                        <img :src="getPathImgTeacher" alt="img teacher" class="img-fluid"/>
                    </div>
                     <div class="block-inf">
                         <router-link :to="{ path: 'participantes/profesores'}">
                            <v-btn class="btn-codenotch">PROFESORES</v-btn>
                        </router-link>
                    </div>
                </div> 
                <div class="col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-0 col-xl-3 offset-xl-0 container-student">
                    <div class="block-sup">
                        <img :src="getPathImgStudent" alt="img student" class="img-fluid"/>
                    </div>
                     <div class="block-inf">
                         <router-link :to="{ path: 'participantes/alumnos'}">
                            <v-btn class="btn-codenotch">ALUMNOS</v-btn>
                        </router-link>
                    </div>
                </div>   
            </div>
        </div>         
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:'participants',

        data() {
            return {
                currentDataBootcamps: []
            };
        },
        

        computed: {
            ...mapGetters({
                config: 'getConfigData'
            }),

            getPathImgTeacher() {
                return process.env.NODE_ENV === 'production' 
                    ? this.config.imgPathProduction.imgProfesor
                    : this.config.imgPathDevelopment.imgProfesor
            },

            getPathImgStudent() {
                return process.env.NODE_ENV === 'production' 
                    ? this.config.imgPathProduction.imgEstudiante
                    : this.config.imgPathDevelopment.imgEstudiante
            }
        },

        beforeCreate(){
            //this.$store.commit('setIsBootcamp',true);
        },

        created() {
            window.scrollTo(0, 0);

            this.$store.commit('setEditModeActive',false);
        }

    }    
</script>
