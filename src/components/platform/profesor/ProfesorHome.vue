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
                        <img class="img-fluid img-codenotch" :src="currentTeacherData.photoPath" alt="foto profesor" />
                    </div> 
                    <div class="col-12 col-xl-8">
                        <h2>{{currentTeacherData.name}}</h2>
                        <p v-html="currentTeacherData.description"></p>
                        <div class="alumnos-links">
                            <ul class="list-links">
                                <li v-for="(link,index) of currentTeacherData.links" v-bind:key="index">
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
                         <router-link :to="{ name: 'listadoBootcamps'}">
                            <v-btn class="btn-codenotch">BOOTCAMPS</v-btn>
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
                currentTeacherData: {}
            }
        },
        
        computed: {
            ...mapGetters({
                config: 'getConfigData',
                bootcampData: 'getBootcampData',
                bootcampId: 'getBootcampId',
                teacherId: 'getTeacherId'
            }),

            setPathLogo() {
                return process.env.NODE_ENV === 'production' ? this.config.imgPathProduction.logo : this.config.imgPathDevelopment.logo
            }
        }, 

        beforeCreate(){
            /* TEMPORAL */
            this.$store.commit('setBootcampId', '1.1');
            this.$store.commit('setTeacherId', '1.1'); 
        },

        created() {
            window.scrollTo(0, 0);

            let arrBootcampsData = [...this.bootcampData.bootcamps];
            let indexBootcampMatched = arrBootcampsData.findIndex( item => item.bootcampId == this.bootcampId);
            let teacherList = arrBootcampsData[indexBootcampMatched].teacherList;
            let indexTeacherMatched = teacherList.findIndex( item => item.teacherId == this.teacherId);
            this.currentTeacherData = teacherList[indexTeacherMatched];
        }
    }
</script>
