<template>
    <div id="listado-alumnos" class="home alumnos">  
        <div class="container-fluid">
            <div class="row" v-for="(item,index) of currentStudentData" v-bind:key="index">
                <div class="col-12 col-xl-2 offset-xl-1 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="item.photoPath" alt="foto alumno" />
                </div> 
                <div class="col-12 col-xl-8">
                    <h2>{{item.name}}</h2>
                    <p v-html="item.description"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'listadoAlumnos',

        data(){
            return{
                currentStudentData: {}
            }
        },
        
        computed: {
            ...mapGetters({
                config: 'getConfigData',
                bootcampData: 'getBootcampData',
                bootcampId: 'getBootcampId',
            }),

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        }, 

        beforeCreate(){
            this.$store.commit('setBootcampId', '1.1');
        },

        created() {
            window.scrollTo(0, 0);

            let arrBootcampsData = [...this.bootcampData.bootcamps];
            let indexBootcampMatched = arrBootcampsData.findIndex( item => item.bootcampId == this.bootcampId);
            let studentList = arrBootcampsData[indexBootcampMatched].studentList;
            this.currentStudentData = studentList;
        }
    }
</script>
