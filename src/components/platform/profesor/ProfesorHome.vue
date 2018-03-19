<template>
    <transition name="contentTransition" appear>
        <div id="profesor-home" class="home">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-xl-4 offset-xl-4">
                        <div class="logo-container">
                            <h1>
                                <img :src="setPathLogo" alt="logo Codenotch"/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>    
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-xl-2 offset-xl-1 container-img-codenotch">
                        <img class="img-fluid img-codenotch" :src="currentStudentData.imgPath" alt="foto profesor" />
                    </div> 
                    <div class="col-12 col-xl-8">
                        <h2>{{currentStudentData.name}}</h2>
                        <p v-html="currentStudentData.description"></p>
                        <div class="alumnos-links">
                            <ul class="list-links">
                                <li v-for="(link,index) of currentStudentData.links" v-bind:key="index">
                                    <a class="link-codenotch" :href="link.url" target="_blank">{{link.content}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-3 offset-lg-3 col-xl-3 offset-xl-3">
                        <router-link :to="{ name: 'profesorPrograma'}">
                            <v-btn class="btn-codenotch">PROGRAMA</v-btn>
                        </router-link>
                    </div>
                    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-3 offset-lg-0 col-xl-3 offset-xl-0">
                         <router-link :to="{ name: 'profesorPrograma'}">
                            <v-btn class="btn-codenotch">ALUMNOS</v-btn>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </transition>    
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'profesorHome',

        props:['clickedBtnProgram'],

        data(){
            return{
                currentStudentData: {},
                links: [
                        {text:'Github',disabled: false},
                        {text:'Linkedin',disabled: false},
                        {text:'Twitter',disabled: true}
                ]
            }
        },
        
        computed: {
            ...mapGetters({
                config: 'getConfigData',
                studentData: 'getStudentData',
                studentId: 'getStudentId'
            }),

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            },

            setPathFotoAlumno() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.fotoAlumno : this.config.imgPathDevelopment.fotoAlumno
            }
        }, 

        beforeCreate(){
            /* TEMPORAL */
            this.$store.commit('setStudentId', '1.1'); 
        },

        created() {
            window.scrollTo(0, 0);

            let arrStudentData = [...this.studentData.data];
            let indexMatched = arrStudentData.findIndex( item => item.studentId == this.studentId);
            let studentDataPath = arrStudentData[indexMatched].path;


            console.log('indexMatched',indexMatched);
            //console.log('studentDataPath',studentDataPath);

            Axios.get(studentDataPath)
                .then(response => {
                    this.currentStudentData = response.data.data;
                    console.log('currentStudentData',this.currentStudentData);

                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>
