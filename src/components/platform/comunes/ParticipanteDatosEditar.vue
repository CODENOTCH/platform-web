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
                    <label class="btn-codenotch">
                        SUBIR FOTO <input type="file" hidden accept="image/*" @change="handleFile">
                    </label>
                </div> 
            </div>
            <div class="row">
                <div class="col-12 container-name">
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
                            <div class="container-links" v-for="(item,index) of currentParticipantData.links" :key="index">
                                <participante-dato-link-editar 
                                                    :data="item"
                                                    :index="index"
                                                    :indexSelected="indexSelectedLink"
                                                    :mode="modeLink"
                                                    @onClickBtnConfirmLink="confirmLink"
                                                    >
                                </participante-dato-link-editar>
                                <participante-dato-link :data="item"
                                                        :index="index"
                                                        :mode="modeLink"
                                                        @onClickBtnEditLink="editLink"
                                                        @onClickBtnDeleteLink="deleteLink"
                                                        >
                                </participante-dato-link>
                            </div>
                        </div>
                    </div>
                    <participante-dato v-for="(item,index) of currentFilteredData" 
                                        :key="index" 
                                        :data="item" 
                                        :type="'editable'">
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
import ParticipanteDatoLink from '../comunes/ParticipanteDatoLink.vue';
import ParticipanteDatoLinkEditar from '../comunes/ParticipanteDatoLinkEditar.vue';

export default {
  name: 'participanteDatosEditar',

  components: {
      participanteDato: ParticipanteDato,
      participanteDatoLink: ParticipanteDatoLink,
      participanteDatoLinkEditar: ParticipanteDatoLinkEditar
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
      modeLink: 'normal',
      indexSelectedLink: 0
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

       /* AÑADIR ENVIO POST DE IMÁGEN  */
        
      },

      confirmLink(){
        this.modeLink = 'normal';
      },

      editLink(index){
        this.indexSelectedLink = index;  
        this.modeLink = 'edit';
      },

      deleteLink(index){
        this.currentParticipantData.links.splice(index,1);
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


