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
                            <div class="data">
                                <span class="label">DNI:</span>
                                <span class="value">{{item.data.dni.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">DOMICILIO:</span>
                                <span class="value">{{item.data.domicilio.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">EMAIL:</span>
                                <span class="value">{{item.data.email.content}}</span>
                            </div>
                            <div class="data">
                                <span class="label">TELÉFONO:</span>
                                <span class="value">{{item.data.telefono.content}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="btn-container col-xl-8 offset-xl-2">
                        <router-link :to="{ path: `alumnos/${item._id}`}">
                            <v-btn class="btn-codenotch">{{getNameBtn}}</v-btn>
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
                profile: 'getProfile'
            }),

            getNameBtn(){
                let name = this.profile === 'profesor' ? 'SEGUIMIENTO' : 'FICHA';
                return name;
            }
        }, 

        beforeCreate(){
            /* TEMPORAL*/
            //this.$store.commit('setBootcampId', '1.1');
        },

        created() {
            window.scrollTo(0, 0);

            let arrBootcampsData = [...this.bootcampData.bootcamps];
            let indexBootcampMatched = arrBootcampsData.findIndex( item => item._id == this.bootcampId);
            let studentList = arrBootcampsData[indexBootcampMatched].studentList;
            this.currentStudentData = studentList;
        }
    }
</script>
