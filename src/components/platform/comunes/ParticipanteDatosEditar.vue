<template>
    <div class="interior-ficha edit">
        <div class="container-btn-confirm">
            <v-btn
                dark
                small
                fab
                @click="clickConfirmHandler"
                class="btn"
                >
                <v-icon>done</v-icon>
            </v-btn>
        </div>  
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-2 offset-xl-5 container-img-codenotch">
                    <img class="img-fluid img-codenotch" :src="getUserPhoto" alt="foto alumno" />
                    <!--v-btn @click="uploadPhoto" class="btn-codenotch"> SUBIR FOTO </v-btn-->

                    <label class="btn-codenotch">
                        SUBIR FOTO <input type="file" hidden accept="image/*" @change="handleFile">
                    </label>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 container-name">
                    <!--h2 ref="userName" contenteditable="true" spellcheck="false">{{currentParticipantData.name}}</h2-->
                    <input type="text" class="input-edit" v-model.trim="currentParticipantData.name">
                </div> 
            </div>
            <div class="row">
                <div class="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-6 offset-xl-3 container-data-participant">
                    <div class="card participant-data container-description">
                        <div class="card-header label-data">DESCRIPCIÓN</div>
                        <div class="card-body content-data">
                            <textarea class="textarea-edit" v-model.trim="currentParticipantData.description"></textarea>
                        </div>
                    </div>
                    <div class="card participant-data container-links">
                        <div class="card-header label-data">LINKS</div>
                        <div class="card-body content-data">
                            <v-chip v-for="(item,index) of currentParticipantData.links" :key="index">
                                {{item.content}}
                                <v-icon class="icon">edit</v-icon>
                                <v-icon class="icon">delete</v-icon>
                            </v-chip>
                        </div>
                    </div>
                    <dato-participante v-for="(data,index) of currentFilteredData" :key="index" :data="currentFilteredData[index]" :type="'editable'"></dato-participante>
                </div> 
            </div>
        </div>
    </div> 
</template>

<script>
import Axios from 'axios';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import DatoParticipante from '../comunes/DatoParticipante.vue';

export default {
  name: 'participanteDatosEditar',

  components: {
      datoParticipante: DatoParticipante
  },

  data() {
    return {
      currentBootcampData: [],
      currentParticipantData: {},
      currentFilteredData: {},
      bootcampId: '',
      id: '',
      participantType: '',
      isUploadedPhoto: false,
      uploadedPhotoPath: '',
      userName:''
    };
  },

  computed: {
    ...mapGetters({
      config: 'getConfigData',
      bootcampData: 'getBootcampData',
      profile:'getProfile',
      editModeActive: 'getEditModeActive'
    }),

    getUserPhoto(){
        /* PROVISIONAL */ 
        if(!this.isUploadedPhoto) return this.currentParticipantData.photoPath;
        else return 'https://raw.githubusercontent.com/CODENOTCH/bbdk_fake_jaime/master/img/alumno6.jpg';
    },

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

    switch (this.$route.name) {
      case "alumnoDatosEditarAdmisiones":
        participantsList = arrBootcampsData[indexBootcampMatched].studentList;
        this.participantType = 'student';
        break;
      case "profesorDatosEditarAdmisiones":
        participantsList = arrBootcampsData[indexBootcampMatched].teacherList;
        this.participantType = 'teacher';
        break;
    }
    
    let indexParticipantsMatched = participantsList.findIndex(
      item => item._id === this.id
    );

    this.currentParticipantData = participantsList[indexParticipantsMatched];

    console.log('this.currentParticipantData', this.currentParticipantData);

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
      clickConfirmHandler(){
           console.log('this.currentParticipantData after', this.currentParticipantData);

          //console.log(this.$refs.userName.innerHTML);
      },

      handleFile(e){
        let file = e.target.files[0];

        this.isUploadedPhoto = true;

        /*try {
            sessionStorage.setItem("userimage", file);
        } catch (e) {
            console.log("Storage failed: " + e);
        }

        this.uploadedPhoto = sessionStorage.getItem('userimage');
        this.uploadedPhotoName = file.name;

        console.log(this.uploadedPhoto);
        console.log(this.uploadedPhotoName);
        */


       /* AÑADIR ENVIO POST DE IMÁGEN  */
        

      }
  }
};
</script>

<style lang='stylus'>
  @import '../../../stylus/main'

    .chip {
        .chip__content{
            background: $softGrey
        }
    }
</style>


