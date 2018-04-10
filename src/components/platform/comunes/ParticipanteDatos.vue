<template>
    <div class="interior-ficha">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="currentParticipantData.photoPath" alt="foto alumno" />
                </div> 
            </div>
            <div class="row">
                <div class="col-12 container-name">
                    <h2>{{currentParticipantData.name}}</h2>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data-participant">
                    <!--dato-participante v-if="isContabilityProfile" v-for="(data,index) of currentParticipantData.data" :key="index" :data="currentParticipantData.data[index]"></dato-participante>
                    <dato-participante v-else v-for="(data,index) of currentFilteredStudentData" :key="index" :data="currentFilteredStudentData[index]"></dato-participante-->
                    <dato-participante v-for="(data,index) of currentFilteredStudentData" :key="index" :data="currentFilteredStudentData[index]"></dato-participante>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from "axios";
import _ from "lodash";
import { mapGetters } from "vuex";
import DatoParticipante from '../comunes/DatoParticipante.vue';

export default {
  name: "participanteDatos",

  components: {
      datoParticipante: DatoParticipante
  },

  data() {
    return {
      currentBootcampData: [],
      currentParticipantData: {},
      currentFilteredStudentData: {},
      bootcampId: "",
      id: ""
    };
  },

  computed: {
    ...mapGetters({
      config: "getConfigData",
      bootcampData: "getBootcampData",
      profile:'getProfile'
    }),

    isContabilityProfile(){
        return this.profile === 'contabilidad' ? true : false;
    }
  },

  beforeCreate(){
    this.$store.commit('setIsBootcamp',true);
  },

  created() {
    window.scrollTo(0, 0);

    /* set current Bootcamp */ 

    this.bootcampId = this.$route.params.bootcampId;
    this.id = this.$route.params.id;

    let arrBootcampsData = [...this.bootcampData.bootcamps];
    let indexBootcampMatched = arrBootcampsData.findIndex(
      item => item._id === this.bootcampId
    );

    this.currentBootcampData = arrBootcampsData[indexBootcampMatched];

    /* set current Participant and type of Participant */ 

    let participantsList = null;
    let participantType = '';

    switch (this.$route.name) {
      case "alumnoDatosAdmisiones":
      case "alumnoDatosContabilidad":
        participantsList = arrBootcampsData[indexBootcampMatched].studentList;
        participantType = 'student';
        break;
      case "profesorDatosAdmisiones":
      case "profesorDatosContabilidad":
        participantsList = arrBootcampsData[indexBootcampMatched].teacherList;
        participantType = 'teacher';
        break;
    }
    
    let indexParticipantsMatched = participantsList.findIndex(
      item => item._id === this.id
    );

    this.currentParticipantData = participantsList[indexParticipantsMatched];

     /* get filtered data by keys */ 

    if(participantType === 'student'){
        let studentData = participantsList[indexParticipantsMatched].data;
        let firstFilterKey = 'shared';
        let secondFilterKey = this.profile;
        let objFiltered = {};

        objFiltered = _.merge(_.pickBy(studentData, item => item.type === firstFilterKey),_.pickBy(studentData, item => item.type === secondFilterKey));

        this.currentFilteredStudentData = objFiltered;
    }
  }
};
</script>


