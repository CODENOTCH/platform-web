<template>
    <div id="listado-alumnos" class="home alumnos">  
        <div class="container-fluid">
            <div class="row" >
                <div class="col-12 col-sm-10 offset-sm-1 col-md-6 offset-md-0 col-xl-4 offset-xl-0 block-alumno" v-for="(item,index) of currentStudentData" v-bind:key="index">
                    <div class="container-img">
                        <img class="img-fluid img-codenotch" :src="item.photoPath" alt="foto alumno" />
                    </div> 
                    <div class="container-data">
                        <h2>{{item.name}}</h2>
                        <div class="block-data">
                            <span>DNI: {{item.data.dni}}</span>
                            <span>DOMICILIO: {{item.data.domicilio}}</span>
                            <span>EMAIL: {{item.data.email}}</span>
                            <span>TELÉFONO: {{item.data.telefono}}</span>
                        </div>
                    </div>
                    <div class="btn-container col-xl-8 offset-xl-2">
                        <router-link :to="{ path: `alumnos/${item.studentId}`}">
                            <v-btn @click="setDataStudentSelected(item)" class="btn-codenotch">SEGUIMIENTO</v-btn>
                        </router-link>
                    </div>
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
        },

        methods:{
            setDataStudentSelected(data){
                console.log('data',data);
            }
        }
    }
</script>
