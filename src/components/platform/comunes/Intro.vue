<template>
    <div id="profesor-home" class="home">  
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-xl-2 offset-xl-1 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="currentUserData.photoPath" alt="foto profesor" />
                </div> 
                <div class="col-12 col-xl-8">
                    <h2>{{currentUserData.name}}</h2>
                    <p v-html="currentUserData.description"></p>
                    <div class="alumnos-links">
                        <ul class="list-links">
                            <li v-for="(link,index) of currentUserData.links" v-bind:key="index">
                                <a class="link-codenotch" :href="link.url" target="_blank">{{link.content}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div :class="getClassesColBtnContainer">
                    <router-link :to="{ name: getProfileProgram}">
                        <v-btn class="btn-codenotch">PROGRAMA</v-btn>
                    </router-link>
                </div>
                <div v-if="isTeacherProfile" class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-3 offset-lg-0 col-xl-3 offset-xl-0 last-btn-container">
                    <router-link :to="{ name: 'listadoBootcamps'}">
                        <v-btn class="btn-codenotch">BOOTCAMPS</v-btn>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name:'Intro',

        props:['clickedBtnProgram'],

        data(){
            return{
                currentUserData: {}
            }
        },
        
        computed: {
            ...mapGetters({
                config: 'getConfigData',
                profile: 'getProfile',
                bootcampData: 'getBootcampData',
                bootcampId: 'getBootcampId',
                userId: 'getUserId'
            }),

            isTeacherProfile(){
                if(this.profile === 'profesor') return true;
            },

            getProfileProgram(){
                let profileProgram = this.profile === 'profesor' ? 'profesorPrograma' : 'alumnoPrograma';
                return profileProgram;
            }, 

            getClassesColBtnContainer(){
                let classes = this.profile === 'profesor'
                        ? 'col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-3 offset-lg-3 col-xl-3 offset-xl-3'
                        : 'col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-2 offset-xl-5'

                return classes;
            }
        }, 

        beforeCreate(){
            this.$store.commit('setIsProgram',false);
            this.$store.commit('setIsBootcamp',false);
        },

        created() {
            window.scrollTo(0, 0);


            let arrBootcampsData = [...this.bootcampData.bootcamps];
            let indexBootcampMatched = arrBootcampsData.findIndex( item => item._id === this.bootcampId);

            //console.log('this.bootcampId',this.bootcampId)
           // console.log('indexBootcampMatched',indexBootcampMatched)


            if(this.profile === 'profesor'){
                let teacherList = arrBootcampsData[indexBootcampMatched].teacherList;
                let indexTeacherMatched = teacherList.findIndex( item => item._id === this.userId);
                console.log('this.userId',this.userId)
                this.currentUserData = teacherList[indexTeacherMatched];
            } else {
                let studentList = arrBootcampsData[indexBootcampMatched].studentList;
                //console.log('studentList',studentList)
                let indexStudentMatched = studentList.findIndex( item => item._id == this.userId);
                //console.log('indexStudentMatched',indexStudentMatched)
                this.currentUserData = studentList[indexStudentMatched];
            }
        }
    }
</script>
