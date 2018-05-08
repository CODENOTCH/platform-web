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
                    <participante-dato v-for="(item,index) of currentFilteredData" 
                                        :key="index" 
                                        :data="item" 
                                        :type="'noeditable'"
                                        :defaultType="item.type"
                                        >
                    </participante-dato>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from 'axios';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import ParticipanteDato from '../comunes/ParticipanteDato.vue';

export default {
  name: 'participanteDatos',

  components: {
      participanteDato: ParticipanteDato
  },

  data() {
    return {
      currentBootcampData: [],
      currentParticipantData: {},
      currentFilteredData: {},
      bootcampId: '',
      id: '',
      participantType: '',
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData',
      bootcampData: 'getBootcampData',
      profile:'getProfile'
    })
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

    switch (this.$route.name) {
      case "alumnoDatosAdmisiones":
      case "alumnoDatosContabilidad":
        participantsList = arrBootcampsData[indexBootcampMatched].studentList;
        this.participantType = 'student';
        break;
      case "profesorDatosAdmisiones":
      case "profesorDatosContabilidad":
        participantsList = arrBootcampsData[indexBootcampMatched].teacherList;
        this.participantType = 'teacher';
        break;
    }
    
    let indexParticipantsMatched = participantsList.findIndex(
      item => item._id === this.id
    );

    this.currentParticipantData = participantsList[indexParticipantsMatched];

     /* get filtered data by keys */ 

    if(this.participantType === 'student'){
        let studentData = participantsList[indexParticipantsMatched].data;
        let firstFilterKey = 'shared';
        let secondFilterKey = this.profile;
        let objFiltered = {};

        objFiltered = _.merge(_.pickBy(studentData, item => item.type === firstFilterKey),_.pickBy(studentData, item => item.type === secondFilterKey));

        this.currentFilteredData = objFiltered;
    } 

    else this.currentFilteredData = this.currentParticipantData.data;
  },

  methods:{
    isContabilityProfile(){
        return this.profile === 'contabilidad' ? true : false;
    }
  }
};
</script>


