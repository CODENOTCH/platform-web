<template>
    <div id="alumno-datos-admisiones" class="interior-ficha">
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
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data-student">
                    <dato-alumno v-for="(data,index) of currentStudentData.data" :key="index" :data="currentStudentData.data[index]"></dato-alumno>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from "axios";
import { mapGetters } from "vuex";
import DatoAlumno from '../comunes/DatoAlumno.vue';

export default {
  name: "alumnoDatosAdmisiones",

  components: {
      datoAlumno: DatoAlumno
  },

  props: ["dataAlumno"],

  data() {
    return {
      currentBootcampData: [],
      currentStudentData: {},
      bootcampId: "",
      studentId: ""
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
      item => item.bootcampId === this.bootcampId
    );

    this.currentBootcampData = arrBootcampsData[indexBootcampMatched];

    let studentList = arrBootcampsData[indexBootcampMatched].studentList;
    let indexStudentMatched = studentList.findIndex(
      item => item.studentId === this.studentId
    );

    this.currentStudentData = studentList[indexStudentMatched];
  },

  methods: {
  }
};
</script>


