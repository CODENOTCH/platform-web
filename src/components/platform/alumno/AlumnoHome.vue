<template>
    <transition name="contentTransition" appear>
        <div id="alumno-home" class="home">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-xl-2 offset-xl-1 container-img-codenotch">
                        <img class="img-fluid img-codenotch" :src="currentStudentData.photoPath" alt="foto alumno" />
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
                    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-2 offset-xl-5">
                        <router-link :to="{ name: 'alumnoPrograma'}">
                            <v-btn class="btn-codenotch">PROGRAMA</v-btn>
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
        name:'alumnoHome',

        props:['clickedBtnProgram'],

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
                studentId: 'getStudentId'
            }),

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        }, 

        beforeCreate(){
            /* TEMPORAL */
            this.$store.commit('setBootcampId', '1.1');
            this.$store.commit('setStudentId', '1.1'); 

            this.$store.commit('setIsProgram',false);
        },

        created() {
            window.scrollTo(0, 0);

            let arrBootcampsData = [...this.bootcampData.bootcamps];
            let indexBootcampMatched = arrBootcampsData.findIndex( item => item.bootcampId == this.bootcampId);
            let studentList = arrBootcampsData[indexBootcampMatched].studentList;
            let indexStudentMatched = studentList.findIndex( item => item.studentId == this.studentId);
            this.currentStudentData = studentList[indexStudentMatched];
        }
    }
</script>
