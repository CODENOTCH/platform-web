<template>
    <div id="alumno-seguimiento" class="interior-ficha">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="currentStudentData.photoPath" alt="foto alumno" />
                </div> 
            </div>
            <div class="row">
                <div class="col-12 container-name">
                    <h2>{{currentStudentData.name}}</h2>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data">
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
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-comments">
                    <comentario v-for="(item,index) of currentStudentData.weekComments"
                                        :key="index" 
                                        :weekTitle="item.WeekName"
                                        :weekComment="item.comment"
                                        :idComment="item._id"
                                        :indexSelected="index"
                                        @onConfirmComment="confirmComment"
                                        >
                    </comentario>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";
import Comentario from './Comentario.vue';

export default {
  name: "alumnoSeguimiento",

  components: {
        comentario: Comentario
  },

  props: ["dataAlumno"],

  data() {
    return {
      currentBootcampData: [],
      currentStudentData: {},
      bootcampId: "",
      studentId: "",
      userId: 'getUserId'
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData",
      bootcampData: "getBootcampData"
    })
  },

  beforeCreate(){
    this.$store.commit('setIsBootcamp',true);
  },

  created() {
    window.scrollTo(0, 0);

    this.bootcampId = this.$route.params.bootcampId;
    this.studentId = this.$route.params.studentId;

    let arrBootcampsData = [...this.bootcampData.bootcamps];
    let indexBootcampMatched = arrBootcampsData.findIndex(
      item => item._id === this.bootcampId
    );

    this.currentBootcampData = arrBootcampsData[indexBootcampMatched];

    let studentList = arrBootcampsData[indexBootcampMatched].studentList;
    let indexStudentMatched = studentList.findIndex(
      item => item._id === this.studentId
    );

    this.currentStudentData = studentList[indexStudentMatched];
  },

  methods: {
    confirmComment(newComment,index){
        this.currentStudentData.weekComments[index].comment = newComment;
    }
  }
};
</script>


